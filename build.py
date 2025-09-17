#!/usr/bin/env python3
"""
Multi-page build script for personal website.
Converts Obsidian markdown files to styled HTML pages with navigation.
"""

import os
import re
from datetime import datetime
import markdown
from pathlib import Path

# Page configuration
PAGES = {
    'now.md': {
        'output': 'index.html',
        'title': 'Now - What I\'m Focused On',
        'page_title': 'Jaunius Kadunas',
        'nav_key': 'now',
        'roles': 'Growth engineer / Endurance athlete / AI tinkerer',
        'summary': 'Growth engineering at <a href="https://whitebridge.ai">WhiteBridge AI</a>, where I blend sales tech, AI tooling, and sustainability-minded strategies to help teams scale responsibly.'
    },
    'me.md': {
        'output': 'me.html', 
        'title': 'About Me',
        'page_title': 'About Jaunius Kadunas',
        'nav_key': 'me',
        'roles': 'Growth engineer / Endurance athlete / AI enthusiast',
        'summary': 'I help teams turn AI and sales technology into sustainable growth systems, currently as a Growth Engineer at <a href="https://whitebridge.ai">WhiteBridge AI</a>.'
    }
}

def read_markdown_file(filename):
    """Read and parse a markdown file from the obsidian folder."""
    file_path = Path("obsidian") / filename
    
    if not file_path.exists():
        print(f"⚠️  Warning: {filename} not found in obsidian folder!")
        return None, None
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract last updated date if it exists
    date_match = re.search(r'\*Last updated: (.+?)\*', content)
    last_updated = date_match.group(1) if date_match else datetime.now().strftime("%B %d, %Y")
    
    return content, last_updated

def process_markdown(content, page_key):
    """Convert markdown to HTML with page-specific processing."""
    # Initialize markdown processor with extensions
    md = markdown.Markdown(extensions=['extra', 'codehilite'])
    
    # Convert to HTML
    html_content = md.convert(content)
    
    # Remove the first h1 (since we have it in our template)
    html_content = re.sub(r'^<h1>.*?</h1>\s*', '', html_content)
    
    # For now page, remove the last updated line (handled in template)
    if page_key == 'now':
        html_content = re.sub(r'<p><em>Last updated:.*?</em></p>', '', html_content)
    
    return html_content

def build_page(filename, config):
    """Build a single HTML page from markdown source."""
    print(f"🔄 Building {config['output']} from {filename}...")
    
    # Read markdown content
    md_content, last_updated = read_markdown_file(filename)
    if md_content is None:
        return False
    
    # Process markdown to HTML
    html_content = process_markdown(md_content, config['nav_key'])
    
    # Read template
    with open('template.html', 'r', encoding='utf-8') as f:
        template = f.read()
    
    # Determine subtitle based on page type
    if config['nav_key'] == 'now':
        subtitle = f'Updated <span id="last-updated">{last_updated}</span>'
    else:
        subtitle = ''
    
    # Set navigation active states
    nav_states = {
        'now_active': 'active' if config['nav_key'] == 'now' else '',
        'me_active': 'active' if config['nav_key'] == 'me' else ''
    }
    
    # Replace template placeholders
    final_html = template.replace('{{ title }}', config['title'])
    final_html = final_html.replace('{{ page_title }}', config['page_title'])
    final_html = final_html.replace('{{ subtitle }}', subtitle)
    final_html = final_html.replace('{{ roles }}', config.get('roles', ''))
    final_html = final_html.replace('{{ summary }}', config.get('summary', ''))
    final_html = final_html.replace('{{ content }}', html_content)
    final_html = final_html.replace('{{ now_active }}', nav_states['now_active'])
    final_html = final_html.replace('{{ me_active }}', nav_states['me_active'])
    
    # Write the final HTML
    with open(config['output'], 'w', encoding='utf-8') as f:
        f.write(final_html)
    
    print(f"✅ Built {config['output']} successfully")
    return True

def main():
    """Main build function."""
    print("🔄 Building multi-page personal website...")
    print("="*50)
    
    # Check if template exists
    if not Path('template.html').exists():
        print("❌ Error: template.html not found!")
        return 1
    
    success_count = 0
    total_pages = len(PAGES)
    
    # Build each configured page
    for filename, config in PAGES.items():
        if build_page(filename, config):
            success_count += 1
        print()  # Add spacing between pages
    
    # Summary
    print("="*50)
    if success_count == total_pages:
        print(f"🎉 Successfully built all {total_pages} pages!")
        print("📁 Generated files:")
        for config in PAGES.values():
            print(f"   • {config['output']}")
    else:
        print(f"⚠️  Built {success_count}/{total_pages} pages successfully")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
