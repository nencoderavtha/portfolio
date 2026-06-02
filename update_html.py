import os
import glob
import re

html_files = glob.glob('**/*.html', recursive=True)

clarity_snippet = """    <!-- Microsoft Clarity (Placeholder) -->
    <script type="text/javascript">
        // TODO: Replace CLARITY_ID with actual ID when provided
        // (function(c,l,a,r,i,t,y){
        //     c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        //     t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+"CLARITY_ID";
        //     y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        // })(window, document, "clarity", "script");
    </script>

    <!-- Google Analytics 4 -->"""

org_schema_old = """      "founder": [
        {
          "@type": "Person",
          "name": "Sathvik Yadala",
          "jobTitle": "CEO & Founder",
          "sameAs": ["https://www.linkedin.com/in/sathvik-yadala-11b085231"]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@exter.ai",
        "contactType": "sales",
        "availableLanguage": ["English", "Hindi"]
      },
      "sameAs": [
        "https://www.linkedin.com/in/sathvik-yadala-11b085231"
      ],"""

org_schema_new = """      "founder": [
        {
          "@type": "Person",
          "name": "Sathvik Yadala",
          "jobTitle": "Founder & CEO",
          "url": "https://exter-ai.com/team/sathvik-yadala.html",
          "sameAs": [
            "https://www.linkedin.com/in/sathvik-yadala-11b085231",
            "https://www.instagram.com/directedbysathvik?igsh=d3NtYWswd2NyeXg3",
            "https://x.com/directdbysatvik"
          ]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@exter.ai",
        "contactType": "sales",
        "availableLanguage": ["English", "Hindi"]
      },
      "sameAs": [
        "https://www.linkedin.com/in/sathvik-yadala-11b085231",
        "https://www.instagram.com/directedbysathvik?igsh=d3NtYWswd2NyeXg3",
        "https://x.com/directdbysatvik"
      ],"""

social_old = """                        <li><a href="https://www.linkedin.com/in/sathvik-yadala-11b085231" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        <!-- Add more social links here as profiles are created -->
                        <!-- <li><a href="https://www.instagram.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer">Instagram</a></li> -->
                        <!-- <li><a href="https://x.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer">X / Twitter</a></li> -->
                        <!-- <li><a href="https://www.youtube.com/@YOUR_CHANNEL" target="_blank" rel="noopener noreferrer">YouTube</a></li> -->
                        <!-- <li><a href="https://github.com/YOUR_ORG" target="_blank" rel="noopener noreferrer">GitHub</a></li> -->"""

social_new = """                        <li><a href="https://www.linkedin.com/in/sathvik-yadala-11b085231" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        <li><a href="https://www.instagram.com/directedbysathvik?igsh=d3NtYWswd2NyeXg3" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://x.com/directdbysatvik" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
                        <!-- TODO: Add YouTube, GitHub profile URLs when provided -->"""

ga_script_old = """gtag('config', 'G-W4YBYGT5FN');
    </script>"""

ga_script_new = """gtag('config', 'G-W4YBYGT5FN');
      
      const aiReferrers = ['chatgpt.com','perplexity.ai','gemini.google.com','claude.ai','copilot.microsoft.com','you.com','phind.com'];
      const ref = document.referrer ? new URL(document.referrer).hostname : '';
      const aiSrc = aiReferrers.find(d => ref.includes(d)) || 'not_ai';
      gtag('set', 'user_properties', { ai_referral_source: aiSrc });
    </script>"""

for file in html_files:
    if 'dist' in file or 'node_modules' in file:
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Scripts defer
    content = content.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>', '<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>')
    content = content.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>', '<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>')
    content = content.replace('<script src="https://unpkg.com/@studio-freight/lenis@1.0.33/dist/lenis.min.js"></script>', '<script defer src="https://unpkg.com/@studio-freight/lenis@1.0.33/dist/lenis.min.js"></script>')
    content = content.replace('<script type="module" src="./script.js"></script>', '<script defer type="module" src="./script.js"></script>')
    content = content.replace('<script type="module" src="../script.js"></script>', '<script defer type="module" src="../script.js"></script>')
    content = content.replace('<script src="../script.js" type="module"></script>', '<script defer src="../script.js" type="module"></script>')
    
    # Organization schema
    content = content.replace(org_schema_old, org_schema_new)
    
    # Social links
    content = content.replace(social_old, social_new)
    
    # Clarity
    if 'Microsoft Clarity (Placeholder)' not in content:
        content = content.replace('<!-- Google Analytics 4 -->', clarity_snippet)
        
    # GA4
    if 'aiReferrers' not in content:
        content = content.replace(ga_script_old, ga_script_new)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
