import glob

files = glob.glob('work/*.html') + glob.glob('blog/*.html') + glob.glob('tools/*.html') + glob.glob('locations/*.html') + glob.glob('team/*.html')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        
    content = content.replace('src="./script.js"', 'src="../script.js"')
    content = content.replace('href="./style.css"', 'href="../style.css"')
    content = content.replace('href="/style.css"', 'href="../style.css"')
    content = content.replace('src="/script.js"', 'src="../script.js"')

    # fix some image paths if they missed the root directory
    content = content.replace('src="/videos/', 'src="../videos/')
    content = content.replace('src="/images/', 'src="../images/')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
        
print("Fixed relative paths for deep pages.")
