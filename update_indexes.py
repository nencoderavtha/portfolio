import os

# 1. Update Homepage (index.html)
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

crosslink_html = """
        <!-- Cross-Linking Sections -->
        <section class="section-wrap" style="padding: 100px 8%; background: #111;">
            <div style="max-width: 1200px; margin: 0 auto;">
                <h2 style="font-family: var(--font-heading); font-size: 3rem; margin-bottom: 2rem;">Explore More</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
                    <!-- Latest from the Blog -->
                    <div>
                        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--accent-cream); margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">Latest from the Blog</h3>
                        <div style="display:flex; flex-direction: column; gap: 1.5rem;">
                            <a href="./blog/what-is-an-ai-receptionist.html" style="text-decoration:none; color:inherit; display:block; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; transition: border-color 0.3s;">
                                <h4 style="margin: 0 0 0.5rem; font-family: var(--font-heading); font-size: 1.2rem;">What Is an AI Receptionist?</h4>
                                <p style="margin: 0 0 1rem; font-size: 0.9rem; opacity: 0.8;">An AI receptionist is an intelligent voice agent that handles 100% of your inbound calls...</p>
                                <span style="color: var(--brand-red); font-weight: 600; font-size: 0.9rem;">Read More →</span>
                            </a>
                            <a href="./blog/ai-agency-vs-traditional-agency.html" style="text-decoration:none; color:inherit; display:block; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; transition: border-color 0.3s;">
                                <h4 style="margin: 0 0 0.5rem; font-family: var(--font-heading); font-size: 1.2rem;">AI vs Traditional Agency</h4>
                                <p style="margin: 0 0 1rem; font-size: 0.9rem; opacity: 0.8;">Comparing AI agencies and traditional agencies across speed, cost, and tech stacks...</p>
                                <span style="color: var(--brand-red); font-weight: 600; font-size: 0.9rem;">Read More →</span>
                            </a>
                            <a href="./blog/how-much-does-a-website-cost-in-2026.html" style="text-decoration:none; color:inherit; display:block; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; transition: border-color 0.3s;">
                                <h4 style="margin: 0 0 0.5rem; font-family: var(--font-heading); font-size: 1.2rem;">Website Cost Guide 2026</h4>
                                <p style="margin: 0 0 1rem; font-size: 0.9rem; opacity: 0.8;">A complete pricing guide detailing how much websites and web apps cost in 2026...</p>
                                <span style="color: var(--brand-red); font-weight: 600; font-size: 0.9rem;">Read More →</span>
                            </a>
                        </div>
                    </div>

                    <!-- Free Tools -->
                    <div>
                        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--accent-cream); margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">Free AI Tools</h3>
                        <div style="display:flex; flex-direction: column; gap: 1.5rem;">
                            <div style="padding: 1.5rem; background: rgba(229,57,53,0.1); border: 1px solid rgba(229,57,53,0.3); border-radius: 12px;">
                                <h4 style="margin: 0 0 0.5rem; font-family: var(--font-heading); font-size: 1.2rem;">AI Receptionist ROI Calculator</h4>
                                <p style="margin: 0 0 1rem; font-size: 0.9rem; opacity: 0.8;">Calculate missed revenue and payback period.</p>
                                <a href="./tools/ai-receptionist-roi-calculator.html" style="color: var(--brand-red); font-weight: 600; font-size: 0.9rem; text-decoration: none;">Try it free →</a>
                            </div>
                            <div style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;">
                                <h4 style="margin: 0 0 0.5rem; font-family: var(--font-heading); font-size: 1.2rem;">Website Cost Estimator</h4>
                                <p style="margin: 0 0 1rem; font-size: 0.9rem; opacity: 0.8;">Get an instant price estimate for your next build.</p>
                                <a href="./tools/website-cost-estimator.html" style="color: var(--brand-red); font-weight: 600; font-size: 0.9rem; text-decoration: none;">Try it free →</a>
                            </div>
                            <div style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;">
                                <h4 style="margin: 0 0 0.5rem; font-family: var(--font-heading); font-size: 1.2rem;">AI Readiness Quiz</h4>
                                <p style="margin: 0 0 1rem; font-size: 0.9rem; opacity: 0.8;">Is your business ready to scale with AI? Take the quiz.</p>
                                <a href="./tools/ai-readiness-quiz.html" style="color: var(--brand-red); font-weight: 600; font-size: 0.9rem; text-decoration: none;">Try it free →</a>
                            </div>
                        </div>
                    </div>

                    <!-- Featured Case Studies -->
                    <div>
                        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--accent-cream); margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">Featured Work</h3>
                        <div style="display:flex; flex-direction: column; gap: 1.5rem;">
                            <a href="./work/case-study-ai-receptionist.html" style="text-decoration:none; color:inherit; display:block; padding: 1.5rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; transition: border-color 0.3s;">
                                <h4 style="margin: 0 0 0.5rem; font-family: var(--font-heading); font-size: 1.2rem;">Healthcare Practice</h4>
                                <p style="margin: 0 0 1rem; font-size: 0.9rem; opacity: 0.8;">AI Receptionist integration increasing bookings by 22%.</p>
                                <span style="color: var(--brand-red); font-weight: 600; font-size: 0.9rem;">View Case Study →</span>
                            </a>
                            <a href="./work/case-study-3d-website.html" style="text-decoration:none; color:inherit; display:block; padding: 1.5rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; transition: border-color 0.3s;">
                                <h4 style="margin: 0 0 0.5rem; font-family: var(--font-heading); font-size: 1.2rem;">Tech Startup</h4>
                                <p style="margin: 0 0 1rem; font-size: 0.9rem; opacity: 0.8;">3D Immersive Website leading to 3x Time on Site.</p>
                                <span style="color: var(--brand-red); font-weight: 600; font-size: 0.9rem;">View Case Study →</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
"""

if 'Explore More' not in content:
    content = content.replace('<!-- Footer: Separated Solid Block -->', crosslink_html + '\n        <!-- Footer: Separated Solid Block -->')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

# 2. Update Blog Index
with open('blog/index.html', 'r', encoding='utf-8') as f:
    blog_content = f.read()
    
blog_cards = """
        <div class="blog-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 4rem;">
            <a href="what-is-an-ai-receptionist.html" style="display:block; text-decoration:none; color:inherit; background:#111; padding:2rem; border-radius:12px; border:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:0.8rem; color:var(--brand-red); font-weight:600; margin-bottom:0.5rem;">June 1, 2026 • 7 min read</div>
                <h2 style="font-family:var(--font-heading); font-size:1.5rem; margin:0 0 1rem;">What Is an AI Receptionist? How It Works, Costs & Benefits (2026 Guide)</h2>
                <p style="opacity:0.8; line-height:1.6; font-size:0.95rem;">An AI receptionist is an intelligent voice agent that handles 100% of your inbound calls, 24/7, books appointments, and saves you thousands in staffing costs.</p>
            </a>
            
            <a href="ai-agency-vs-traditional-agency.html" style="display:block; text-decoration:none; color:inherit; background:#111; padding:2rem; border-radius:12px; border:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:0.8rem; color:var(--brand-red); font-weight:600; margin-bottom:0.5rem;">June 1, 2026 • 6 min read</div>
                <h2 style="font-family:var(--font-heading); font-size:1.5rem; margin:0 0 1rem;">AI Agency vs Traditional Agency: Which Should You Hire in 2026?</h2>
                <p style="opacity:0.8; line-height:1.6; font-size:0.95rem;">Comparing AI agencies and traditional agencies across speed, cost, and tech stacks to help you decide who to hire in 2026.</p>
            </a>
            
            <a href="how-much-does-a-website-cost-in-2026.html" style="display:block; text-decoration:none; color:inherit; background:#111; padding:2rem; border-radius:12px; border:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:0.8rem; color:var(--brand-red); font-weight:600; margin-bottom:0.5rem;">June 1, 2026 • 8 min read</div>
                <h2 style="font-family:var(--font-heading); font-size:1.5rem; margin:0 0 1rem;">How Much Does a Website Cost in 2026? Complete Pricing Guide</h2>
                <p style="opacity:0.8; line-height:1.6; font-size:0.95rem;">A complete pricing guide detailing how much websites, 3D sites, and fullstack applications cost in 2026.</p>
            </a>

            <a href="ai-automation-for-small-business.html" style="display:block; text-decoration:none; color:inherit; background:#111; padding:2rem; border-radius:12px; border:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:0.8rem; color:var(--brand-red); font-weight:600; margin-bottom:0.5rem;">June 1, 2026 • 6 min read</div>
                <h2 style="font-family:var(--font-heading); font-size:1.5rem; margin:0 0 1rem;">AI Automation for Small Business: 7 Ways to Save Time & Money</h2>
                <p style="opacity:0.8; line-height:1.6; font-size:0.95rem;">Learn 7 specific ways small businesses can leverage AI automation to cut costs and save time in 2026.</p>
            </a>
        </div>
"""

# inject into blog/index.html right after the hero paragraph
if 'what-is-an-ai-receptionist.html' not in blog_content:
    blog_content = blog_content.replace('<p>Read our latest thoughts on AI, automation, and design.</p>', '<p>Read our latest thoughts on AI, automation, and design.</p>\n' + blog_cards)
    with open('blog/index.html', 'w', encoding='utf-8') as f:
        f.write(blog_content)

print("Updated index.html and blog/index.html")
