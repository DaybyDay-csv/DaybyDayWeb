#!/bin/bash
# Fix Claude CLI authentication
# Run this when agents start failing with 401/auth errors

echo '================================================'
echo 'DayByDay — Claude Auth Fix'
echo '================================================'
echo ''
echo 'The Claude OAuth token has expired.'
echo ''
echo 'OPTION 1 (Recommended) — API Key (never expires):'
echo '  1. Go to: https://console.anthropic.com/settings/keys'
echo '  2. Create a new API key'
echo '  3. Run: nano /root/projects/DaybyDay/.env'
echo '  4. Set: ANTHROPIC_API_KEY=sk-ant-api03-...'
echo '  5. The agents will automatically use it (with prompt caching)'
echo ''
echo 'OPTION 2 — Re-authenticate via Browser:'
echo '  1. Run: claude'
echo '  2. Follow the browser login instructions'
echo '  3. Press Ctrl+D when authenticated'
echo ''
echo 'Current token status:'
python3 -c "
import json, time
with open('/root/.claude/.credentials.json') as f:
    d = json.load(f)
c = d.get('claudeAiOauth', {})
exp = c.get('expiresAt', 0) / 1000
now = time.time()
diff_h = (exp - now) / 3600
if diff_h < 0:
    print(f'  EXPIRED {abs(diff_h):.1f}h ago')
else:
    print(f'  Valid for {diff_h:.1f}h')
print(f'  Access token: {c.get("accessToken","")[:20]}...')
"
echo ''
api_key=$(grep 'ANTHROPIC_API_KEY' /root/projects/DaybyDay/.env | cut -d= -f2 | tr -d ' ')
if [ -n "$api_key" ]; then
  echo 'ANTHROPIC_API_KEY is SET — testing...'
  python3 -c "
import anthropic, os
os.environ['ANTHROPIC_API_KEY'] = '$api_key'
c = anthropic.Anthropic()
try:
    r = c.messages.create(model='claude-haiku-4-5-20251001', max_tokens=10, messages=[{'role':'user','content':'hi'}])
    print('API key WORKS!')
except Exception as e:
    print(f'API key error: {e}')
"
else
  echo 'ANTHROPIC_API_KEY is NOT SET'
fi
