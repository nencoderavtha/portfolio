import glob
import re

html_files = glob.glob('**/*.html', recursive=True)

# NAV REPLACEMENT
new_nav = """<div class="nav-dropdown">
                    <a href="../services/" class="nav-link">Services <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left:3px;vertical-align:middle"><path d="M6 9l6 6 6-6"/></svg></a>
                    <div class="nav-dropdown-menu">
                        <a href="../services/ai-receptionist.html">AI Receptionist</a>
                        <a href="../services/3d-web-design.html">3D Web Design</a>
                        <a href="../services/fullstack-development.html">Fullstack Development</a>
                        <a href="../services/ai-video-branding.html">AI Video Branding</a>
                    </div>
                </div>
                <div class="nav-dropdown">
                    <a href="../tools/" class="nav-link">Tools <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left:3px;vertical-align:middle"><path d="M6 9l6 6 6-6"/></svg></a>
                    <div class="nav-dropdown-menu">
                        <a href="../tools/ai-receptionist-roi-calculator.html">ROI Calculator</a>
                        <a href="../tools/website-cost-estimator.html">Cost Estimator</a>
                        <a href="../tools/ai-readiness-quiz.html">AI Readiness Quiz</a>
                    </div>
                </div>
                <a href="../work.html" class="nav-link">Work</a>
                <a href="../blog/" class="nav-link">Blog</a>
                <a href="../about.html" class="nav-link">About</a>
                <a href="../book.html" class="nav-cta">Book a call</a>"""

# FOOTER REPLACEMENT
new_footer_links = """<div class="footer-links">
                <h4>SERVICES</h4>
                <ul>
                    <li><a href="../services/ai-receptionist.html">AI Receptionist</a></li>
                    <li><a href="../services/3d-web-design.html">3D Web Design</a></li>
                    <li><a href="../services/fullstack-development.html">Fullstack Dev</a></li>
                    <li><a href="../services/ai-video-branding.html">AI Video Branding</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>RESOURCES</h4>
                <ul>
                    <li><a href="../blog/">Blog</a></li>
                    <li><a href="../tools/ai-receptionist-roi-calculator.html">ROI Calculator</a></li>
                    <li><a href="../tools/website-cost-estimator.html">Cost Estimator</a></li>
                    <li><a href="../tools/ai-readiness-quiz.html">AI Readiness Quiz</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>COMPANY</h4>
                <ul>
                    <li><a href="../about.html">About</a></li>
                    <li><a href="../team/sathvik-yadala.html">Team</a></li>
                    <li><a href="../work.html">Work / Case Studies</a></li>
                    <li><a href="../book.html">Book a Call</a></li>
                </ul>
            </div>"""

for file in html_files:
    if 'dist' in file or 'node_modules' in file: continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine depth to fix relative links if needed
    # (Since most files use ../ we will just rely on the existing structure where possible.
    # The regex below will target the specific blocks and replace them, but we must handle index.html differently for links)
    
    depth = file.count('/') + file.count('\\')
    prefix = './' if depth == 0 else '../'
    
    # Nav replace
    nav_pattern = re.compile(r'<nav class="main-nav" aria-label="Primary">.*?</nav>', re.DOTALL)
    adjusted_nav = new_nav.replace('../', prefix)
    content = nav_pattern.sub(f'<nav class="main-nav" aria-label="Primary">\n{adjusted_nav}\n</nav>', content)
    
    # Footer replace
    # we need to find the <div class="footer-links">...</div> blocks and replace them.
    # since there might be one or more, we find the section between <div class="footer-brand">...</div> and <div class="footer-social">
    footer_pattern = re.compile(r'(<div class="footer-brand">.*?</div>)\s*<div class="footer-links">.*?</div>\s*(<div class="footer-social">)', re.DOTALL)
    adjusted_footer = new_footer_links.replace('../', prefix)
    content = footer_pattern.sub(r'\1\n' + adjusted_footer + r'\n\2', content)
    
    # Add Sitemap to legal footer if not there
    if 'sitemap.xml' not in content and 'legal-footer-links' in content:
        content = content.replace('<a href="../terms.html">Terms</a>', f'<a href="{prefix}terms.html">Terms</a>\n<a href="{prefix}sitemap.xml">Sitemap</a>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Applied C6 and C7 Nav/Footer updates across all files.")
