import os
from PIL import Image, ImageDraw, ImageFont

# 1. Convert Images
count = 0
for root, dirs, files in os.walk('public'):
    for file in files:
        if file.lower().endswith(('.jpg', '.jpeg', '.png')):
            if 'og-' in file: continue
            img_path = os.path.join(root, file)
            try:
                img = Image.open(img_path)
                webp_path = os.path.splitext(img_path)[0] + '.webp'
                img.save(webp_path, 'WEBP')
                count += 1
            except Exception as e:
                print(f'Error with {img_path}: {e}')
print(f'Converted {count} images to WebP.')

# 2. Generate OG Images
def create_og_image(filename, title, subtitle=None):
    img = Image.new('RGB', (1200, 630), color=(10, 10, 10))
    d = ImageDraw.Draw(img)
    
    # Simple Noise/Grain simulation (very basic)
    import random
    for _ in range(5000):
        x = random.randint(0, 1199)
        y = random.randint(0, 629)
        d.point((x, y), fill=(255, 255, 255, 10))
        
    try:
        # Try to use a standard font if available, else default
        font_large = ImageFont.truetype("arialbd.ttf", 60)
        font_small = ImageFont.truetype("arial.ttf", 36)
        font_logo = ImageFont.truetype("arialbd.ttf", 40)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
        font_logo = ImageFont.load_default()

    # Draw logo top left
    d.text((80, 80), "exter.ai", fill=(255, 255, 255), font=font_logo)
    
    # Draw Title
    d.text((80, 250), title, fill=(255, 255, 255), font=font_large)
    
    # Draw Subtitle
    if subtitle:
        d.text((80, 350), subtitle, fill=(229, 57, 53), font=font_small) # Brand Red
        
    img.save(os.path.join('public', filename), 'JPEG', quality=90)
    print(f'Created {filename}')

create_og_image('og-image.jpg', 'AI-Native Studio for Founders', 'Exter.ai')
create_og_image('og-services.jpg', 'Our Services', 'AI Receptionist • 3D Web Design • Fullstack Dev • AI Video')
create_og_image('og-blog.jpg', 'Exter.ai Blog', 'Insights on AI, Automation & Design')
create_og_image('og-tools.jpg', 'Free AI Tools', 'ROI Calculator • Cost Estimator • AI Readiness Quiz')

