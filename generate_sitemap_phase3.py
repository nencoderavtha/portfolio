import glob
import re

html_files = glob.glob('**/*.html', recursive=True)
sitemap_urls = []

for file in html_files:
    if 'dist' in file or 'node_modules' in file: continue
    
    file_unix = file.replace('\\', '/')
    url_path = file_unix
    if file_unix.endswith('index.html'):
        url_path = file_unix.replace('index.html', '')
        
    sitemap_urls.append(f"  <url>\n    <loc>https://exter-ai.com/{url_path}</loc>\n    <lastmod>2026-06-01</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>")

sitemap_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(sitemap_urls)}
</urlset>"""

with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap_xml)

# Update Vite config
import json

vite_config_path = 'vite.config.js'
with open(vite_config_path, 'r', encoding='utf-8') as f:
    vite_content = f.read()

inputs = {}
for file in html_files:
    if 'dist' in file or 'node_modules' in file: continue
    file_unix = file.replace('\\', '/')
    name = file_unix.replace('.html', '').replace('/', '_').replace('-', '_') # Safe keys
    if name == 'index': name = 'main'
    inputs[name] = f"resolve(__dirname, '{file_unix}')"

input_str = "        input: {\n"
for name, path in inputs.items():
    input_str += f"          '{name}': {path},\n" # Added quotes here to be safe
input_str += "        }"

vite_content = re.sub(r'input:\s*\{.*?\}', input_str, vite_content, flags=re.DOTALL)

with open(vite_config_path, 'w', encoding='utf-8') as f:
    f.write(vite_content)

print("Updated vite.config.js with all routes safely.")
