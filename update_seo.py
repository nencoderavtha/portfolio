import os
import glob
import re

html_files = glob.glob('**/*.html', recursive=True)

# 1. Canonical URLs
for file in html_files:
    if 'dist' in file or 'node_modules' in file:
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine canonical path
    file_unix = file.replace('\\', '/')
    if file_unix == 'index.html':
        canonical_path = ''
    else:
        canonical_path = file_unix

    canonical_tag = f'<link rel="canonical" href="https://exter-ai.com/{canonical_path}">'
    
    # Replace existing canonical or inject before </head>
    if '<link rel="canonical"' in content:
        content = re.sub(r'<link rel="canonical"[^>]*>', canonical_tag, content)
    else:
        content = content.replace('</head>', f'    {canonical_tag}\n</head>')
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

# 2. HowTo schemas for service pages
howto_base = """
    <!-- Schema: HowTo -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "TITLE",
      "description": "DESCRIPTION",
      "totalTime": "P4D",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Book a Discovery Call", "text": "Schedule a free 30-minute discovery call to discuss requirements and goals." },
        { "@type": "HowToStep", "position": 2, "name": "Receive Your Proposal", "text": "Within 24 hours, you receive a written plan with scope, timeline, and fixed price." },
        { "@type": "HowToStep", "position": 3, "name": "Build & Integrate", "text": "We build the solution, integrate it with your existing tools, and prepare for launch." },
        { "@type": "HowToStep", "position": 4, "name": "Testing & Launch", "text": "We run final tests, polish the experience, and deploy it to production." }
      ]
    }
    </script>
"""

services = {
    'services/ai-receptionist.html': {
        'title': 'How to Get an AI Receptionist for Your Business',
        'desc': 'Step-by-step process to deploy an AI receptionist with Exter.ai, from discovery call to live deployment.',
        'time': 'P4D'
    },
    'services/3d-web-design.html': {
        'title': 'How to Get a 3D Website Design',
        'desc': 'Step-by-step process to build a disruptive 3D website with Exter.ai.',
        'time': 'P21D'
    },
    'services/fullstack-development.html': {
        'title': 'How to Build a Fullstack App with Exter.ai',
        'desc': 'Step-by-step process to develop and deploy a fullstack application.',
        'time': 'P30D'
    },
    'services/ai-video-branding.html': {
        'title': 'How to Get AI Video Branding',
        'desc': 'Step-by-step process to create high-end AI brand videos.',
        'time': 'P10D'
    }
}

for svc_file, meta in services.items():
    svc_file = svc_file.replace('/', os.sep)
    if os.path.exists(svc_file):
        with open(svc_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if '"@type": "HowTo"' not in content:
            howto = howto_base.replace('TITLE', meta['title']).replace('DESCRIPTION', meta['desc'])
            howto = howto.replace('"P4D"', f'"{meta["time"]}"')
            content = content.replace('</head>', f'{howto}</head>')
            
            with open(svc_file, 'w', encoding='utf-8') as f:
                f.write(content)
