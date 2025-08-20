# My Now Page

A personal "now" page inspired by [Derek Sivers](https://sive.rs/now), built with Obsidian and GitHub Pages.

## What is a "Now" Page?

A now page tells you what I'm focused on at this point in my life. It's more dynamic than a static "about" page and gets updated regularly to reflect my current priorities and activities.

## How It Works

1. **Write in Obsidian**: I update my content in `obsidian/now.md` using Obsidian
2. **Automatic Building**: When I push changes to GitHub, a Python script converts the Markdown to HTML
3. **Auto-Deploy**: GitHub Actions automatically builds and deploys the site to GitHub Pages

## Local Development

To run this locally:

```bash
# Install dependencies
pip install -r requirements.txt

# Build the site
python build.py

# Open index.html in your browser
```

## Workflow

1. Edit `obsidian/now.md` in Obsidian (or any markdown editor)
2. Commit and push changes to GitHub
3. GitHub Actions will automatically build and deploy your site

## Setup Instructions

1. Fork this repository
2. Go to your repository Settings > Pages
3. Set Source to "GitHub Actions"
4. Edit `obsidian/now.md` with your content
5. Push changes and your site will be live at `https://yourusername.github.io/repository-name`

---

*This is a [now page](https://nownownow.com/about), and here's [why you should make one too](https://sive.rs/nowff).*