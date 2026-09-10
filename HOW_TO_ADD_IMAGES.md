# How to Add Photos to Your Portfolio

## 📁 Image Folder Structure

Your portfolio now has organized folders for images:

```
images/
├── event-design/          # SINET event materials
├── production/            # Brochures, guides, etc.
├── posters/              # Poster designs
├── interactive-pdfs/     # PDF screenshots
├── digital-marketing/    # Banners, emails, infographics
└── before-after/         # Before/after comparisons
```

---

## 🎯 **EASIEST METHOD: Export from Your PDF**

### **Step 1: Open Your PDF**
Open `Sherry_J_Portfolio.pdf` in:
- Adobe Acrobat (best option)
- Preview (Mac)
- Any PDF reader

### **Step 2: Take Screenshots**
For each page/design you want to showcase:

**On Mac:**
- Press `Cmd + Shift + 4`
- Click and drag to select the design
- Image saves to your Desktop

**On Windows:**
- Press `Windows Key + Shift + S`
- Click and drag to select the design
- Click notification to save image

**In Adobe Acrobat:**
- Right-click on the image
- Select "Save Image As..."
- Save as JPG or PNG

### **Step 3: Name Your Images**
Use descriptive names:
- `sinet-cover.jpg`
- `adobe-brochure.jpg`
- `cisco-poster.jpg`
- `webex-banner.jpg`

### **Step 4: Upload to GitHub**
1. Go to: https://github.com/TikiDog/DesignProjectforfun
2. Switch to branch: `claude/pdf-to-html-portfolio-Stm1i`
3. Click into the appropriate `images/` folder (e.g., `images/event-design/`)
4. Click **"Add file"** → **"Upload files"**
5. Drag your images or click to browse
6. Click **"Commit changes"**

---

## 📸 **Image Names Currently Used**

### Event Design (`images/event-design/`)
- `sinet-cover.jpg` - Event guide cover
- `sinet-schedule.jpg` - Program schedule pages
- `sinet-presenters.jpg` - Presenter profile pages
- `sinet-poster.jpg` - Event poster

### Production & Design (`images/production/`)
- `adobe-forms-cover.jpg`
- `adobe-forms-pages.jpg`
- `cisco-hyperflex-cover.jpg`
- `cisco-pages.jpg`
- `ixia-cover.jpg`
- `ixia-diagrams.jpg`

### Posters (`images/posters/`)
- `ey-video-conferencing.jpg`
- `mt-bank-webex.jpg`
- `idb-comunity.jpg`
- `visa-telepresence.jpg`
- `cisco-cybersecurity.jpg`

### Interactive PDFs (`images/interactive-pdfs/`)
- `juniper-matrix.jpg`
- `cisco-telepresence-guide.jpg`
- `sap-education.jpg`
- `cisco-spark.jpg`
- `dow-diamond-rooms.jpg`

### Digital Marketing (`images/digital-marketing/`)
- `nyu-webex-banner.jpg`
- `sap-successfactors.jpg`
- `adobe-acrobat-banner.jpg`
- `webex-infographic.jpg`
- `marketing-vs-sales-infographic.jpg`

### Before & After (`images/before-after/`)
- `cisco-white-paper-before.jpg`
- `cisco-white-paper-after.jpg`
- `high-performance-teams-before.jpg`
- `high-performance-teams-after.jpg`

---

## 🎨 **Image Requirements**

### **Recommended Sizes:**
- **Regular gallery images:** 800-1200px wide
- **Large showcase images:** 1200-1600px wide
- **Before/after images:** Same size for both

### **File Formats:**
- ✅ JPG (best for photos/screenshots)
- ✅ PNG (best for logos/graphics with transparency)
- ✅ WebP (smallest file size, modern browsers)

### **Optimization:**
- Keep files under 500KB each
- Use tools like [TinyPNG.com](https://tinypng.com) to compress
- Maintain good quality - portfolio images should look sharp!

---

## 🚀 **Quick Start: Add Your First Image**

1. **Screenshot** one design from your PDF
2. **Save** it as `sinet-cover.jpg`
3. **Go to GitHub**: https://github.com/TikiDog/DesignProjectforfun
4. **Navigate** to `images/event-design/`
5. **Upload** your file
6. **Refresh** your portfolio - the image appears automatically!

---

## 💡 **What Happens If No Images?**

Don't worry! The portfolio shows placeholder camera icons (📷) where images should be. As you upload images, they'll automatically replace the placeholders.

---

## 🔧 **Adding More Image Galleries**

Want to add images to other sections? Just copy this HTML structure:

```html
<div class="image-gallery">
    <div class="gallery-item">
        <img src="images/folder-name/your-image.jpg" alt="Description" class="portfolio-image" onerror="this.parentElement.classList.add('no-image')">
        <div class="image-caption">Your Caption</div>
    </div>
    <!-- Repeat for more images -->
</div>
```

---

## 📧 **Need Help?**

Questions? Contact: sherry.graphicdesign@gmail.com

---

**Pro Tip:** Start with 3-4 of your best pieces from each category. You can always add more later!
