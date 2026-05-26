#!/bin/bash
# GA4 Weekly Report via BigQuery
# Sends metrics to Telegram: top/bottom 3 blogs, week-over-week comparison

set -e
source /root/.env

BQ_SA="/root/.hermes/daybyday-bq-sa.json"
GA4_PROPERTY_ID="538162222"
DATASET="analytics_${GA4_PROPERTY_ID}"
TELEGRAM_CHAT_ID="${TELEGRAM_HOME_CHANNEL:-5472173497}"

# Date ranges (ISO format)
TODAY=$(date +%Y-%m-%d)
WEEK_START=$(date -d "8 days ago" +%Y-%m-%d)
WEEK_END=$(date -d "1 day ago" +%Y-%m-%d)
PREV_WEEK_START=$(date -d "15 days ago" +%Y-%m-%d)
PREV_WEEK_END=$(date -d "8 days ago" +%Y-%m-%d)

log() { echo "[$(date '+%Y-%m-%d %H:%M')] $1"; }

send_telegram() {
    local msg="$1"
    local token="${TELEGRAM_BOT_TOKEN:-}"
    local chat_id="${TELEGRAM_CHAT_ID:-}"
    
    if [ -z "$token" ] || [ -z "$chat_id" ]; then
        echo "Missing Telegram credentials"
        return 1
    fi
    
    # Escape HTML
    msg="${msg//&/&amp;}"
    msg="${msg//</&lt;}"
    msg="${msg//>/&gt;}"
    
    curl -s -X POST "https://api.telegram.org/bot${token}/sendMessage" \
        -d "chat_id=${chat_id}" \
        -d "text=${msg}" \
        -d "parse_mode=HTML" > /dev/null
}

# Check if dataset exists
check_dataset() {
    bq ls -projectId=daybyday-gsc 2>/dev/null | grep -q "${DATASET}"
}

# Get pageviews for a date range
get_pageviews() {
    local start_date="$1"
    local end_date="$2"
    local limit="${3:-10}"
    
    python3 << EOF
from google.oauth2 import service_account
from googleapiclient.discovery import build

creds = service_account.Credentials.from_service_account_file(
    '${BQ_SA}',
    scopes=['https://www.googleapis.com/auth/bigquery.readonly']
)

bigquery = build('bigquery', 'v2', credentials=creds)

query = f'''
SELECT
  page_path,
  SUM(pageviews) as total_pageviews,
  SUM(sessions) as total_sessions,
  COUNT(DISTINCT user_id) as users
FROM (
  SELECT
    REGEXP_EXTRACT(p.full_page_url, r"/blog/([^/?]+)") as page_path,
    IF(e.event_name = 'page_view', 1, 0) as pageviews,
    IF(e.event_name = 'session_start', 1, 0) as sessions,
    e.user_id
  FROM `${DATASET}.events_*` e,
       UNNEST(e.event_params) p
  WHERE p.key = "page_location"
    AND _TABLE_SUFFIX BETWEEN '${start_date//-/}' AND '${end_date//-/}'
    AND REGEXP_EXTRACT(p.full_page_url, r"/blog/([^/?]+)") IS NOT NULL
)
GROUP BY page_path
ORDER BY total_pageviews DESC
LIMIT ${limit}
'''

result = bigquery.jobs().query(
    projectId='daybyday-gsc',
    body={'query': query, 'useLegacySql': False}
).execute()

rows = result.get('rows', [])
print('PAGEVIEWS_START')
for row in rows:
    path = row['f'][0]['v']
    pv = row['f'][1]['v']
    sess = row['f'][2]['v']
    users = row['f'][3]['v']
    print(f"{path}|{pv}|{sess}|{users}")
print('PAGEVIEWS_END')
EOF
}

# Alternative simpler query
get_simple_stats() {
    local start_date="$1"
    local end_date="$2"
    
    python3 << EOF
from google.oauth2 import service_account
from googleapiclient.discovery import build

creds = service_account.Credentials.from_service_account_file(
    '${BQ_SA}',
    scopes=['https://www.googleapis.com/auth/bigquery.readonly']
)

bigquery = build('bigquery', 'v2', credentials=creds)

query = f'''
SELECT
  REGEXP_EXTRACT((SELECT value FROM UNNEST(event_params) WHERE key = 'page_location'), r"/blog/([^/?]+)") as blog_slug,
  COUNT(*) as pageviews,
  COUNT(DISTINCT user_pseudo_id) as users
FROM `${DATASET}.events_*`
WHERE _TABLE_SUFFIX BETWEEN '${start_date//-/}' AND '${end_date//-/}'
  AND (SELECT value FROM UNNEST(event_params) WHERE key = 'page_location') LIKE '%/blog/%'
GROUP BY blog_slug
HAVING blog_slug IS NOT NULL
ORDER BY pageviews DESC
'''

result = bigquery.jobs().query(
    projectId='daybyday-gsc',
    body={'query': query, 'useLegacySql': False}
).execute()

rows = result.get('rows', [])
print('RESULTS_START')
for row in rows:
    slug = row['f'][0]['v']
    pv = row['f'][1]['v']
    users = row['f'][2]['v']
    print(f"{slug}|{pv}|{users}")
print('RESULTS_END')
EOF
}

# Main execution
log "Starting GA4 Weekly Report"

if ! check_dataset; then
    log "Dataset ${DATASET} not found in BigQuery"
    send_telegram "⚠️ GA4 Report: Dataset not ready yet. First data export expected tomorrow."
    exit 0
fi

log "Dataset found, querying data..."

# Get this week's data
THIS_WEEK=$(get_simple_stats "$WEEK_START" "$WEEK_END")
PREV_WEEK=$(get_simple_stats "$PREV_WEEK_START" "$PREV_WEEK_END")

# Parse and build report
build_report() {
    local current_data="$1"
    local prev_data="$2"
    
    # Top 3
    local top3=""
    local count=0
    while IFS='|' read -r slug pv users; do
        [ -z "$slug" ] && continue
        [ $count -ge 3 ] && break
        top3="${top3}${count}. <b>${slug}</b>: ${pv} pvs, ${users} users\n"
        count=$((count + 1))
    done <<< "$current_data"
    
    # Bottom 3 (reverse order, lowest first)
    local bottom3=""
    local lines=$(echo "$current_data" | grep -c '.')
    local start=$((lines > 3 ? lines - 3 : 0))
    count=0
    while IFS='|' read -r slug pv users; do
        [ -z "$slug" ] && continue
        if [ $count -ge $start ]; then
            bottom3="${bottom3}${count}. <b>${slug}</b>: ${pv} pvs, ${users} users\n"
        fi
        count=$((count + 1))
    done <<< "$current_data"
    
    # Week comparison
    local total_pv_this=$(echo "$current_data" | awk -F'|' '{sum += $2} END {print sum}')
    local total_pv_prev=$(echo "$prev_data" | awk -F'|' '{sum += $2} END {print sum}')
    local change=""
    if [ -n "$total_pv_this" ] && [ -n "$total_pv_prev" ] && [ "$total_pv_prev" -gt 0 ]; then
        local pct=$(( (total_pv_this * 100) / total_pv_prev - 100 ))
        if [ $pct -gt 0 ]; then
            change="📈 +${pct}% vs prev week"
        elif [ $pct -lt 0 ]; then
            change="📉 ${pct}% vs prev week"
        else
            change="➡️ Same as prev week"
        fi
    fi
    
    # Build message
    cat << EOMSG
📊 <b>GA4 WEEKLY REPORT</b>
${TODAY}

<b>🏆 TOP 3 PERFORMERS</b>
${top3}

<b>📉 BOTTOM 3</b>
${bottom3}

<b>📈 TOTALS</b>
This week: ${total_pv_this} pageviews
${change}

<i>Week: ${WEEK_START} → ${WEEK_END}</i>
EOMSG
}

REPORT=$(build_report "$THIS_WEEK" "$PREV_WEEK")

log "Sending report to Telegram..."
send_telegram "$REPORT"

log "Report sent successfully"
