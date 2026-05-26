#!/usr/bin/env python3
"""Quick fix adding route lines to blog-pipeline.py"""

def fix_file():
    with open('/root/scripts/blog-pipeline.py', 'r') as f:
        lines = f.readlines()
    
    # Find lines 233-247 and replace them
    new_content = []
    for i, line in enumerate(lines):
        if 232 <= i <= 246:  # 0-indexed: 233-247 = 232:246
            continue  # skip old broken lines
        new_content.append(line)
    
    # Insert corrected lines at position 233 (after line 232)
    insert_at = 233
    fixed_lines = [
        "    # Add route - fixed quoting\n",
        "    route_line = '<Route path=\"/blog/' + slug + '\" element={' + component_name + ' openCalendly={openCalendly} />} />'\n",
        "    if route_line not in app:\n",
        "        app = app.replace('<Route path=\"*\" element={<NotFoundPage />} />', route_line + '\\n        ' + '<Route path=\"*\" element={<NotFoundPage />} />')\n",
    ]
    
    new_lines = new_content[:insert_at] + fixed_lines + new_content[insert_at:]
    
    with open('/root/scripts/blog-pipeline.py', 'w') as f:
        f.writelines(new_lines)
    
    print("Fixed!")

fix_file()
