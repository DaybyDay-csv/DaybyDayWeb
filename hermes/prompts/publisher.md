# Publisher — shell only, no LLM

This phase has NO LLM. It is a sequence of deterministic shell commands. See `hermes/scripts/publisher.sh` for the implementation.

Steps:

1. **Kill leaked prerender ports**
   ```bash
   fuser -k 4173/tcp 4174/tcp 4175/tcp 4176/tcp 4177/tcp 2>/dev/null || true
   ```

2. **Run deterministic route updater**
   ```bash
   node hermes/scripts/update-routes.js \
     --slug "$SLUG" --title "$TITLE" --component "$COMPONENT" \
     --taskId "$TASK_ID" --keyword "$KEYWORD" \
     --excerpt "$EXCERPT" --category "$CATEGORY" --reading-time "$READING_TIME"
   ```

3. **JSX safety check on the new blog file**
   ```bash
   python3 hermes/scripts/jsx-safe-check.py src/pages/blog/${COMPONENT}.jsx || exit 11
   ```

4. **Build (Vite + Prerender)**
   ```bash
   npm run build || exit 10
   ```

5. **Stage exactly the allowed files**
   ```bash
   git add src/pages/blog/${COMPONENT}.jsx \
           src/App.jsx \
           src/pages/BlogPage.jsx \
           public/sitemap.xml \
           public/llms.txt \
           seo-plan/estado.json
   ```

6. **Conflict-marker guard**
   ```bash
   git diff --cached -U0 | grep -E '^\+[<>=]{7}' && exit 12
   ```

7. **Commit (idempotent message)**
   ```bash
   git commit -m "feat(blog): ${SLUG} — keyword: ${KEYWORD} [task=${TASK_ID}] [run=${RUN_ID}]"
   ```

8. **Push to preview branch**
   ```bash
   git push origin claude/epic-pasteur
   ```

9. **IndexNow ping (poll until URL is live)**
   ```bash
   URL="https://www.daybydayconsulting.com/blog/${SLUG}"
   for i in 1 2 3 4 5; do
     sleep 60
     if curl -fsI "$URL" >/dev/null 2>&1; then
       /root/scripts/indexnow-submit.sh "$URL" || true
       break
     fi
   done
   ```

Publisher never invokes an LLM. If any step fails, exit with the documented code (see `SCHEMAS.md` §12).
