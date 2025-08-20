#!/usr/bin/env python3
"""
Build script to convert Obsidian markdown to HTML for the now page.
This script reads the now.md file from the obsidian folder and generates
the final index.html with the content properly formatted.
"""

import os
import re
from datetime import datetime
import markdown
from pathlib import Path

def read_obsidian_content():
    """Read the content from the Obsidian now.md file."""
    obsidian_file = Path("obsidian/now.md")
    
    if not obsidian_file.exists():
        print("Error: obsidian/now.md not found!")
        return None, None
    
    with open(obsidian_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the last updated date if it exists in the content
    date_match = re.search(r'\*Last updated: (.+?)\*', content)
    last_updated = date_match.group(1) if date_match else datetime.now().strftime("%B %d, %Y")
    
    return content, last_updated

def process_markdown(content):
    """Convert markdown to HTML and clean it up."""
    # Initialize markdown processor with extensions
    md = markdown.Markdown(extensions=['extra', 'codehilite'])
    
    # Convert to HTML
    html_content = md.convert(content)
    
    # Remove the first h1 (since we have it in our template)
    html_content = re.sub(r'^<h1>.*?</h1>\s*', '', html_content)
    
    # Remove the last updated line (since we handle it in template)
    html_content = re.sub(r'<p><em>Last updated:.*?</em></p>', '', html_content)
    
    return html_content

def build_html(content, last_updated):
    """Build the final HTML file from template and content."""
    # Read the template
    with open('index.html', 'r', encoding='utf-8') as f:
        template = f.read()
    
    # Replace placeholders
    final_html = template.replace('{{ content }}', content)
    final_html = final_html.replace('{{ last_updated }}', last_updated)
    
    # Write the final HTML
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(final_html)
    
    print(f"✅ Built index.html successfully (updated: {last_updated})")

def main():
    """Main build function."""
    print("🔄 Building now page from Obsidian content...")
    
    # Read Obsidian content
    md_content, last_updated = read_obsidian_content()
    if md_content is None:
        return 1
    
    # Process markdown to HTML
    html_content = process_markdown(md_content)
    
    # Build final HTML
    build_html(html_content, last_updated)
    
    print("🎉 Build complete!")
    return 0

if __name__ == "__main__":
    exit(main())