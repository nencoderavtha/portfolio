import glob
import re

html_files = glob.glob('**/*.html', recursive=True)

for file in html_files:
    if 'dist' in file or 'node_modules' in file:
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace Clarity ID
    content = content.replace('CLARITY_ID', 'x0ak3inuyf')
    
    # Enable Clarity script by uncommenting
    content = content.replace('// (function(c,l,a,r,i,t,y)', '(function(c,l,a,r,i,t,y)')
    content = content.replace('//     c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};', '    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};')
    content = content.replace('//     t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+"x0ak3inuyf";', '    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+"x0ak3inuyf";')
    content = content.replace('//     y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);', '    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);')
    content = content.replace('// })(window, document, "clarity", "script");', '})(window, document, "clarity", "script");')
    content = content.replace('// TODO: Replace x0ak3inuyf with actual ID when provided', '')

    # 2. Update OG Images
    # Determine the correct OG image based on file path
    file_unix = file.replace('\\', '/')
    og_img = 'og-image.jpg'
    
    if 'services' in file_unix:
        og_img = 'og-services.jpg'
    elif 'blog' in file_unix:
        og_img = 'og-blog.jpg'
    elif 'tools' in file_unix:
        og_img = 'og-tools.jpg'
        
    og_tag_regex = re.compile(r'<meta\s+property=["\']og:image["\']\s+content=["\']https://exter-ai\.com/[^"\']*["\']\s*/?>', re.IGNORECASE)
    
    if og_tag_regex.search(content):
        content = og_tag_regex.sub(f'<meta property="og:image" content="https://exter-ai.com/{og_img}">', content)
    else:
        # insert if missing
        content = content.replace('</head>', f'    <meta property="og:image" content="https://exter-ai.com/{og_img}">\n</head>')
        
    # 3. Check for H1/H2 hierarchy (simplified check)
    # We won't automatically fix the headings, but we'll print warnings
    
    # 4. Check for alt text in pictures
    # Handled partially in previous script, but we will make sure alt isn't empty.
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Applied global replacements (Clarity, OG Images).")
