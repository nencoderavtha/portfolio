import os
import glob
from datetime import datetime

html_files = glob.glob('**/*.html', recursive=True)

sitemap_entries = []
today = datetime.now().strftime('%Y-%m-%d')

for file in html_files:
    if 'dist' in file or 'node_modules' in file or '404' in file:
        continue
    
    file_unix = file.replace('\\', '/')
    
    if file_unix == 'index.html':
        path = ''
        priority = '1.0'
    elif 'services' in file_unix and 'index.html' not in file_unix:
        path = file_unix
        priority = '0.9'
    elif 'tools' in file_unix or 'locations' in file_unix:
        path = file_unix
        priority = '0.8'
    else:
        path = file_unix
        priority = '0.7'
        
    sitemap_entries.append(f"""  <url>
    <loc>https://exter-ai.com/{path}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>{priority}</priority>
  </url>""")

sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(sitemap_entries)}
</urlset>"""

with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap_content)

print(f"Generated sitemap with {len(sitemap_entries)} entries.")
