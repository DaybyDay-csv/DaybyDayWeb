#!/usr/bin/env python3
"""
DayByDay BLOG v3.0 - PROPER FORMAT
Generates correctly structured blog posts
"""

import requests
import subprocess
import time
import sys
import re

API_KEY = "sk-cp-coe8mqQVc96sCuRUl3su_wFRaMr9lveb9hdg6D9ne4bJHRY-_l-HjYjU9mQwsr2eWVhYtlj86yC3f_m0XjfGGiiQGU4UZx17be_aoVnO7vpC-o3gWHXpL4w"
MODEL = "MiniMax-M2.5"
REPO_DIR = "/root/projects/DaybyDay"
PROD_URL = "https://daybydayconsulting.netlify.app"

def log(msg):
    print("[%s] %s" % (time.strftime("%H:%M:%S"), msg))

def run(cmd, cwd=REPO_DIR):
    r = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
    return r.stdout.strip(), r.stderr.strip(), r.returncode

def call_llm(prompt, max_tokens=8000):
    resp = requests.post(
        "https://api.minimax.io/v1/chat/completions",
        headers={"Authorization": "Bearer %s" % API_KEY, "Content-Type": "application/json"},
        json={
            "model": MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "temperature": 0.1
        }
    )
    if resp.status_code != 200:
        raise Exception("API error: %s" % resp.text[:200])
    result = resp.json()
    content = result.get("choices", [{}])[0].get("message", {}).get("content", "")
    content = re.sub(r"</think>", "", content)
    return content

def get_links():
    out, _, _ = run("ls %s/src/pages/blog/*.jsx 2>/dev/null | xargs -n1 basename | sed 's/Page.jsx//' | head -5" % REPO_DIR)
    if not out:
        return "que-es-roas-meta-ads"
    return ",".join([p.strip() for p in out.split("\n")[:5]])

def generate(topic, slug):
    log("[TOPIC] %s" % topic)
    links = get_links()
    
    out, _, _ = run("ls %s/src/pages/blog/*.jsx 2>/dev/null | xargs -n1 basename | sed 's/Page.jsx//' | head -3" % REPO_DIR)
    blog_slugs = [s.strip() for s in out.split("\n")[:3]] if out else []
    
    title = topic.title()
    today = time.strftime('%Y-%m-%d')
    
    prompt = """CREATE SEO blog post about: """ + topic + """

STRICT FORMAT - Use EXACT structure:

```jsx
import { Link } from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  { q: "Question 1?", a: "Answer 1..." },
  { q: "Question 2?", a: "Answer 2..." },
  { q: "Question 3?", a: "Answer 3..." }
];

const(PageName)Page = ({ openCalendly }) => (
  <BlogPostLayout
    title="(title)"
    description="(meta description)"
    path="/blog/""" + slug + """"
    publishDate="""" + today + """"
    author="Pablo Santirsó"
    faqs={faqs}
  >
    <section>
      <h2>Introduction</h2>
      <p>Content...</p>
    </section>
    
    <section>
      <h2>Section 1 Title</h2>
      <p>Content...</p>
    </section>
    
    <section>
      <h2>Conclusión</h2>
      <p>Summary + CTA...</p>
    </section>
  </BlogPostLayout>
);

export default(PageName)Page;
```

REQUIRED:
- Use BlogPostLayout component  
- Include 3 FAQ items
- Internal links to: """ + ', '.join(blog_slugs) + """
- Write in Spanish
- 800+ words

Output ONLY the code, no explanation."""

    content = call_llm(prompt, max_tokens=10000)
    
    # Extract
    match = re.search(r"```jsx?\s*(.*?)```", content, re.DOTALL)
    jsx = match.group(1) if match else content
    
    # Fix component name
    jsx = jsx.replace("(PageName)", slug.replace("-", "").title())
    jsx = jsx.replace("(title)", topic)
    jsx = jsx.replace("(meta description)", topic + " - Guía completa")
    
    if "export default" not in jsx:
        jsx += "\nexport default " + slug.replace("-", "").title() + "Page;"
    
    log("[CONTENT] %d chars" % len(jsx))
    return jsx

def deploy(slug):
    log("[DEPLOY]")
    run("cd %s && git add -A && git commit -m 'blog: %s' && git push origin main" % (REPO_DIR, slug))
    log("[WAIT] Netlify (50s)...")
    time.sleep(50)
    log("[URL] %s/blog/%s" % (PROD_URL, slug))

def main():
    topic = sys.argv[1] if len(sys.argv) > 1 else "estrategia meta ads"
    slug = sys.argv[2] if len(sys.argv) > 2 else "estrategia-meta-ads"
    
    log("="*50)
    log("DayByDay BLOG v3.0 - PROPER")
    log("="*50)
    
    try:
        run("git pull origin main --rebase")
        jsx = generate(topic, slug)
        
        filepath = "%s/src/pages/blog/%sPage.jsx" % (REPO_DIR, slug)
        with open(filepath, "w") as f:
            f.write(jsx)
        log("[SAVE] %s" % filepath)
        
        deploy(slug)
        
        log("="*50)
        log("OK: %s/blog/%s" % (PROD_URL, slug))
        log("="*50)
    except Exception as e:
        log("[ERROR] %s" % e)
        sys.exit(1)

if __name__ == "__main__":
    main()