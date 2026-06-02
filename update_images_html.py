import glob
import re

html_files = glob.glob('**/*.html', recursive=True)

# Regex to find <img ...>
img_regex = re.compile(r'<img\s+([^>]+)>', re.IGNORECASE)

critical_css = """
    <style>
        /* Critical Above-the-fold CSS */
        :root { --bg-dark: #050505; --accent-cream: #F5F5F0; --brand-red: #E53935; --font-heading: 'Syne', sans-serif; --font-body: 'Montserrat', sans-serif; }
        body { margin: 0; background: var(--bg-dark); color: var(--accent-cream); font-family: var(--font-body); font-weight: 300; -webkit-font-smoothing: antialiased; }
        .site-header { position: fixed; top: 0; width: 100%; z-index: 1000; transition: all 0.3s; }
        .header-container { max-width: 1400px; margin: 0 auto; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #fff; text-decoration: none; }
        .hero { min-height: 100vh; display: flex; align-items: center; padding: 0 8%; position: relative; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } .film-grain { display: none !important; } }
    </style>
"""

preload_tags = """
    <link rel="preload" href="/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="/style.css"></noscript>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
"""

def process_img_tag(match):
    attrs_str = match.group(1)
    attrs = {}
    
    # Simple attribute parser
    # Handles spaces, quotes around values
    attr_matches = re.finditer(r'([a-zA-Z\-]+)\s*=\s*(["\'])(.*?)\2', attrs_str)
    for am in attr_matches:
        attrs[am.group(1).lower()] = am.group(3)
        
    src = attrs.get('src', '')
    if not src or src.startswith('data:') or src.startswith('http'):
        return match.group(0) # don't touch
        
    if src.endswith('.svg'):
        return match.group(0) # SVG doesn't need webp
        
    alt = attrs.get('alt', 'Exter.ai')
    if alt == "": alt = "Exter.ai decorative element"
    
    width = attrs.get('width', '800')
    height = attrs.get('height', '600')
    loading = attrs.get('loading', 'lazy')
    
    cls = attrs.get('class', '')
    id_attr = attrs.get('id', '')
    
    # Assume WebP exists
    webp_src = src.rsplit('.', 1)[0] + '.webp'
    
    picture_html = f'''
    <picture>
        <source srcset="{webp_src}" type="image/webp">
        <img src="{src}" alt="{alt}" width="{width}" height="{height}" loading="{loading}" class="{cls}" id="{id_attr}">
    </picture>
    '''
    return picture_html.strip()

for file in html_files:
    if 'dist' in file or 'node_modules' in file:
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Images
    content = img_regex.sub(process_img_tag, content)
    
    # 2. Critical CSS & Preloads
    if 'Critical Above-the-fold CSS' not in content:
        content = content.replace('</head>', f'{critical_css}\n{preload_tags}\n</head>')
        
        # We need to change <link rel="stylesheet" href="../style.css"> to just use the preloads
        # Actually it's safer to just let the preload do its job, but maybe remove the blocking one
        content = re.sub(r'<link[^>]*rel=["\']stylesheet["\'][^>]*href=["\'][^>]*style\.css["\'][^>]*>', '', content)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
