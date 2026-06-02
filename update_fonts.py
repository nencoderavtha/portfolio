import glob

html_files = glob.glob('**/*.html', recursive=True)

for file in html_files:
    if 'dist' in file or 'node_modules' in file:
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace display=swap with display=block
    content = content.replace('family=Montserrat:wght@300;400;600&family=Syne:wght@800&display=swap', 'family=Montserrat:wght@300;400;600&family=Syne:wght@800&display=block')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
print('Updated fonts to display=block')
