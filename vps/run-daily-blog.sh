#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# DayByDay AUTO-BLOG v3.0 — NETLIFY + RESEARCH-FIRST + TRACKING
# Stage: Research → Angle → Write → Links → Deploy → Track → Optimize
# Success Target: 20-30% position on page 1 for long-tail
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

REPO_DIR="/root/projects/DaybyDay"
SEO_PLAN="$REPO_DIR/seo-plan"
LOG_FILE="/var/log/daybyday/blog-v3-$(date +%Y-%m-%d).log"
NETLIFY_SITE="daybydayconsulting"
PROD_URL="https://daybydayconsulting.netlify.app"

mkdir -p /var/log/daybyday

log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
fail() { log "[ERROR] $*"; exit 1; }

log "═══════════════════════════════════════════════════════════"
log "DayByDay BLOG v3.0 START — Research-first pipeline"
log "═══════════════════════════════════════════════════════════"

cd "$REPO_DIR" || fail "Repo not found"
git pull origin main --rebase

# ═══════════════════════════════════════════════════════════
# STAGE 1: RESEARCH — Find竞争对手 y gaps
# ═══════════════════════════════════════════════════════════
log "[STAGE 1] Research — Finding competitors & gaps"

# Get next pending topic from estado.json
PENDING_TASK=$(jq -r '.tasks[] | select(.status=="pending") | .id' "$SEO_PLAN/estado.json" 2>/dev/null | head -1)

if [ -z "$PENDING_TASK" ] || [ "$PENDING_TASK" = "null" ]; then
  PENDING_TASK=$(jq -r '.tasks[] | select(.status=="research") | .id' "$SEO_PLAN/estado.json" 2>/dev/null | head -1)
fi

if [ -z "$PENDING_TASK" ] || [ "$PENDING_TASK" = "null" ]; then
  # Fallback to priority keywords from keyword_priorities.json
  TOPIC=$(jq -r '.keywords[0].term // .top_keywords[0].keyword' "$SEO_PLAN/keyword_priorities.json" 2>/dev/null)
  [ -z "$TOPIC" ] || [ "$TOPIC" = "null" ] && TOPIC="google ads vs meta ads ecommerce españa"
  log "[TOPIC] $TOPIC (from keyword_priorities)"
elif [ -n "$PENDING_TASK" ]; then
  TOPIC=$(jq -r ".tasks[] | select(.id==\"$PENDING_TASK\") | .keyword" "$SEO_PLAN/estado.json" 2>/dev/null)

# Research: Find who ranks for this topic
RESEARCH_PROMPT="# RESEARCH: Competitor Analysis for \"$TOPIC\"

## OBJECTIVE: Find 3-5 pages already ranking on page 1 for this keyword
## METHOD: web_search for the keyword + analyze results

## YOUR TASK:
1. Search: "$TOPIC" ( España OR 2026 )
2. Identify top 3-ranking URLs (excluding big authoritative sites like wikipedia, hubspot)
3. For each competitor, note:
   - URL
   - Domain authority signal (estimated)
   - Content angle they use
   - Gaps/opportunities they miss

## OUTPUT FORMAT (return as structured findings):
```
Competitors
1) [URL] - [ANGLE they use] - [WHY they rank]
2) ...

Our Opportunity
- [UNIQUE ANGLE we can take that competitors miss]
- [SPECIFIC value we can add]
```

## CONSTRAINT: Focus on gaps, not copying. What can WE say differently?

Return ONLY the research findings. No fluff."

COMPETITOR_RESEARCH=$(hermes chat -q "$RESEARCH_PROMPT" --model minimax-m2.5 --provider minimax 2>&1)

log "[RESEARCH] Competitors found:"
echo "$COMPETITOR_RESEARCH" | head -20 >> "$LOG_FILE"

# Extract unique angle for later use
UNIQUE_ANGLE=$(echo "$COMPETITOR_RESEARCH" | grep -A5 "Our Opportunity" | head -6 || echo "")
log "[ANGLE] $UNIQUE_ANGLE"

# ═══════════════════════════════════════════════════════════
# STAGE 2: CONTENT GENERATION with DIFFERENTIATED ANGLE
# ═══════════════════════════════════════════════════════════
log "[STAGE 2] Content Generation — With unique angle"

WRITE_PROMPT="# WRITE: SEO Blog Post for \"$TOPIC\"

## CONTEXT FROM RESEARCH:
$UNIQUE_ANGLE

## YOUR TASK:
1. Write a complete SEO blog post (JSX) that:
   - Takes the UNIQUE ANGLE identified above
   - Addresses gaps competitors missed
   - Provides REAL value, not fluff

## TECHNICAL REQUIREMENTS:
- File location: src/pages/blog/[slug]Page.jsx
- Minimum 1200 words (substantial content)
- Title: Include keyword in first 30 chars
- Meta description: 140-160 chars, unique

## STRUCTURE REQUIRED:
```jsx
import ... from '../components/...

export default function XxxPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "[TITLE]",
    "author": {
      "@type": "Person",
      "name": "Pablo Santirsó"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DayByDay Consulting"
    }
  }

  return (
    <Layout>
      <Seo title="..." description="..." />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      
      <article>
        <h1>[TITLE with keyword]</h1>
        
        {/* INTRO: Hook + promise */}
        
        {/* BODY: Divide into 3-5 substantive sections */}
        
        {/* FAQ SECTION: 3-5 real questions from "People Also Ask" */}
        
        {/* CONCLUSION: Summary + CTA */}
      </article>
    </Layout>
  )
}
```

## LINKING REQUIREMENTS (CRITICAL):
- **Internal links**: 3+ links to other blog posts (find matching ones in seo-plan/estado.json)
- **External links**: At least 2-3 authoritative sources (scholar, official docs, benchmarks)
- Use verified URLs only (check with curl -I)

## SCHEMA REQUIREMENTS:
- Article + FAQPage + Author schema
- Structured data must be valid JSON

## QUality gates:
- No generic "in this article we'll..."
- No recycled tips everyone writes
- Real data, real benchmarks, real examples
- Minimum 3 distinct sections with substantive content

Output: Full JSX code ready to save. No explanation."

WRITE_RESULT=$(hermes chat -q "$WRITE_PROMPT" --model minimax-m2.5 --provider minimax 2>&1)

# Extract slug from result
BLOG_LINE=$(echo "$WRITE_RESULT" | grep '/blog/' | grep 'Page' | head -1)
SLUG=$(echo "$BLOG_LINE" | sed 's/.*\/blog\///; s/Page.*//' | head -c 50)
[ -z "$SLUG" ] && SLUG="new-post-$(date +%Y%m%d)"
log "[SLUG] $SLUG"


# ═══════════════════════════════════════════════════════════
# STAGE 3: LINK ACQUISITION — Passive/Directory
# ═══════════════════════════════════════════════════════════
log "[STAGE 3] Link Acquisition — Passive opportunities"

# List of directories to submit (free, good authority)
DIRECTORIES=(
  "https://www.alchemy.influencer"
  "https://businessandbox.com/submit"
)

# Log for linkbuilding (manual for now, can automate later)
log "[LINKS] Recording backlink opportunities:"
echo "$WRITE_RESULT" | grep -oP 'href="https?://[^"]+"' | head -5 >> "$LOG_FILE" || true

# Create/link update resource (for future outreach)
LINK_OPPS_FILE="$SEO_PLAN/backlink-opportunities.json"
BACKLINK_ENTRY="{\"post\":\"$SLUG\",\"topic\":\"$TOPIC\",\"date\":\"$(date +%Y-%m-%d)\",\"directories\":[]}"
[ -f "$LINK_OPPS_FILE" ] && echo "$BACKLINK_ENTRY" >> "$LINK_OPPS_FILE" || echo "[$BACKLINK_ENTRY]" > "$LINK_OPPS_FILE"


# ═══════════════════════════════════════════════════════════
# STAGE 4: DEPLOY TO NETLIFY
# ═══════════════════════════════════════════════════════════
log "[STAGE 4] Deploy — Building and pushing to Netlify"

# Save the generated content
echo "$WRITE_RESULT" > "/tmp/blog-post-$SLUG.jsx"

# Move to correct location if it's a valid JSX file
if grep -q "export default function" "/tmp/blog-post-$SLUG.jsx"; then
  TARGET_FILE="$REPO_DIR/src/pages/blog/${SLUG}Page.jsx"
  mv "/tmp/blog-post-$SLUG.jsx" "$TARGET_FILE"
  log "[SAVE] $TARGET_FILE"
  
  # Update App.jsx routes if needed
  if ! grep -q "${SLUG}Page" "$REPO_DIR/src/App.jsx"; then
    echo "import $SLUGPage from './pages/blog/${SLUG}Page'" >> "$REPO_DIR/src/App.jsx"
    # Route would need to be added - for now skip
    log "[WARN] Route not added (manual intervention needed)"
  fi
else
  log "[WARN] Invalid JSX generated, skipping save"
fi

# Update estado.json if we have a task
if [ -n "$PENDING_TASK" ]; then
  jq ".tasks[] | select(.id==\"$PENDING_TASK\") | .status = \"pending\"" "$SEO_PLAN/estado.json" > "/tmp/estado.tmp.json"
  mv "/tmp/estado.tmp.json" "$SEO_PLAN/estado.json"
fi

# Commit and push
cd "$REPO_DIR"
git add -A
git commit -m "blog: $SLUG $(date +%Y%m%d)" || log "[INFO] No changes to commit"
git push origin main 2>&1 | tail -3

log "[WAIT] Netlify build (45s)..."
sleep 45

# Verify
SIZE=$(curl -sI "$PROD_URL/blog/$SLUG" 2>/dev/null | grep content-length | awk '{print $2}' || echo "0")
log "[VERIFY] $PROD_URL/blog/$SLUG = $SIZE bytes"


# ═══════════════════════════════════════════════════════════
# STAGE 5: INDEXATION — Submit to indexnow/bing
# ═══════════════════════════════════════════════════════════
log "[STAGE 5] Indexation — Submitting to search engines"

# IndexNow submission (Bing accepts)
INDEXNOW_KEY="a1b2c3d4e5f6"  # Placeholder key

if [ -f "$REPO_DIR/public/indexnowkey.txt" ]; then
  INDEXNOW_KEY=$(cat "$REPO_DIR/public/indexnowkey.txt")
fi

# Submit to Bing
curl -s -w "%{http_code}" -o /dev/null \
  -d "url=$PROD_URL/blog/$SLUG" \
  "https://www.bing.com/indexnow?key=$INDEXNOW_KEY" &

# Also do Google discovery crawl prompt (simplified)
curl -s "https://www.google.com/ping?sitemap=$PROD_URL/sitemap.xml" &

log "[INDEX] Submitted for crawling"


# ═════════════════════════════��═��═══════════════════════════
# STAGE 6: POSITION CHECK — Manual ranking check
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
log "[STAGE 6] Position Check — Keyword rankings"

# Check our position for the topic keyword
POSITION_CHECK=$(hermes chat -q "# QUICK CHECK: What position does daybydayconsulting.com rank for \"$TOPIC\" in Google Spain?

Use web_search to check. Return ONLY: Position number (1-10) or \"Not found\"." \
  --model minimax-m2.5 --provider minimax 2>&1 | grep -oE '[0-9]+' | head -1 || echo "?")

log "[POSITION] Rank for '$TOPIC': #$POSITION_CHECK"


# ═══════════════════════════════════════════════════════════
# STAGE 7: OPTIMIZE BY ROUND — Feedback loop
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
log "[STAGE 7] Optimization — Recording for next iteration"

# Save run metadata
RUN_LOG="$SEO_PLAN/run-history.json"
RUN_ENTRY="{\"date\":\"$(date +%Y-%m-%d)\",\"topic\":\"$TOPIC\",\"slug\":\"$SLUG\",\"position\":\"$POSITION_CHECK\",\"angle_used\":\"$UNIQUE_ANGLE\",\"success\":false}"

echo "$RUN_ENTRY" >> "$RUN_LOG"

# Calculate success rate from history
TOTAL_RUNS=$(wc -l < "$RUN_LOG" 2>/dev/null || echo 0)
SUCCESSFUL=$(grep -c "\"success\":true" "$RUN_LOG" 2>/dev/null || echo 0)

if [ "$TOTAL_RUNS" -gt 0 ]; then
  SUCCESS_RATE=$((SUCCESSFUL * 100 / TOTAL_RUNS))
  log "[METRIC] Success rate: $SUCCESS_RATE% ($SUCCESSFUL/$TOTAL_RUNS)"
else
  log "[METRIC] First run - no history yet"
fi


# ═══════════════════════════════════════════════════════════
# SUMMARY
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
log "═══════════════════════════════════════════════════════════"
log "SUMMARY"
log "═══════════════════════════════════════════════════════════════════"
log "Topic:    $TOPIC"
log "Slug:     $SLUG"
log "Angle:    ${UNIQUE_ANGLE:0:100}..."
log "Position: #$POSITION_CHECK"
log "Deployed:  $PROD_URL/blog/$SLUG"
log "═══════════════════════════════════════════════════════════"
log "DayByDay BLOG v3.0 COMPLETE"
log "═══════════════════════════════════════════════════════════"