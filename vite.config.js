import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 8766,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
                      input: {
          '404': resolve(__dirname, '404.html'),
          'about': resolve(__dirname, 'about.html'),
          'book': resolve(__dirname, 'book.html'),
          'cookies': resolve(__dirname, 'cookies.html'),
          'main': resolve(__dirname, 'index.html'),
          'privacy': resolve(__dirname, 'privacy.html'),
          'terms': resolve(__dirname, 'terms.html'),
          'work_template': resolve(__dirname, 'work-template.html'),
          'work': resolve(__dirname, 'work.html'),
          'blog_ai_agency_vs_traditional_agency': resolve(__dirname, 'blog/ai-agency-vs-traditional-agency.html'),
          'blog_ai_automation_for_small_business': resolve(__dirname, 'blog/ai-automation-for-small-business.html'),
          'blog_blog_template': resolve(__dirname, 'blog/blog-template.html'),
          'blog_how_much_does_a_website_cost_in_2026': resolve(__dirname, 'blog/how-much-does-a-website-cost-in-2026.html'),
          'blog_index': resolve(__dirname, 'blog/index.html'),
          'blog_what_is_an_ai_receptionist': resolve(__dirname, 'blog/what-is-an-ai-receptionist.html'),
          'locations_ai_agency_australia': resolve(__dirname, 'locations/ai-agency-australia.html'),
          'locations_ai_agency_dubai': resolve(__dirname, 'locations/ai-agency-dubai.html'),
          'locations_ai_agency_india': resolve(__dirname, 'locations/ai-agency-india.html'),
          'locations_ai_agency_uk': resolve(__dirname, 'locations/ai-agency-uk.html'),
          'locations_ai_agency_usa': resolve(__dirname, 'locations/ai-agency-usa.html'),
          'services_3d_web_design': resolve(__dirname, 'services/3d-web-design.html'),
          'services_ai_receptionist': resolve(__dirname, 'services/ai-receptionist.html'),
          'services_ai_video_branding': resolve(__dirname, 'services/ai-video-branding.html'),
          'services_fullstack_development': resolve(__dirname, 'services/fullstack-development.html'),
          'services_index': resolve(__dirname, 'services/index.html'),
          'team_sathvik_yadala': resolve(__dirname, 'team/sathvik-yadala.html'),
          'tools_ai_readiness_quiz': resolve(__dirname, 'tools/ai-readiness-quiz.html'),
          'tools_ai_receptionist_roi_calculator': resolve(__dirname, 'tools/ai-receptionist-roi-calculator.html'),
          'tools_website_cost_estimator': resolve(__dirname, 'tools/website-cost-estimator.html'),
          'work_case_study_3d_website': resolve(__dirname, 'work/case-study-3d-website.html'),
          'work_case_study_ai_receptionist': resolve(__dirname, 'work/case-study-ai-receptionist.html'),
        }
    }
  }
});
