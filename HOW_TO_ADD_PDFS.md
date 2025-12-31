# How to Add PDF Files to Your Portfolio

## 📁 PDF Folder Structure

Your portfolio has a `/pdfs` folder where you can upload full project PDFs.

## ✅ **Benefits of Adding PDFs:**

1. **Professional Presentation** - Shows your complete work in detail
2. **View in Browser** - Opens directly in browser for easy viewing
3. **High Quality** - Original resolution and layout preserved
4. **Portfolio Depth** - Images give overview, PDFs give full details

---

## 📤 **How to Upload PDFs to GitHub:**

### **Step 1: Go to the PDFs Folder**
```
https://github.com/TikiDog/DesignProjectforfun/tree/claude/pdf-to-html-portfolio-Stm1i/pdfs
```

### **Step 2: Upload Your PDF**
1. Click **"Add file"** → **"Upload files"**
2. Drag your PDF or click to browse
3. Click **"Commit changes"**

### **Step 3: Name Your PDFs**
Use descriptive, URL-friendly names:
- ✅ `sinet-showcase-2016.pdf`
- ✅ `adobe-forms-guide.pdf`
- ✅ `cisco-digital-transformation.pdf`
- ❌ `My Project (Final) v2.pdf` (avoid spaces and special characters)

---

## 📋 **Recommended PDF Files to Upload:**

Based on your portfolio content, here are suggested PDF names:

### Event Design
- `sinet-showcase-2016.pdf`

### Production & Design
- `adobe-forms-maturity-model.pdf`
- `cisco-hyperflex-guide.pdf`
- `cisco-digital-transformation.pdf`
- `adobe-acrobat-sales-guide.pdf`
- `ixia-inline-security-guide.pdf`

### Interactive PDFs
- `juniper-automation-matrix.pdf`
- `cisco-telepresence-user-guide.pdf`
- `sap-education-training.pdf`
- `cisco-spark-reference.pdf`
- `dow-diamond-rooms-guide.pdf`

### Before & After
- `cisco-white-paper-comparison.pdf`
- `high-performance-teams-comparison.pdf`
- `bmc-marketing-primer.pdf`
- `siaa-annual-report.pdf`

---

## 🎨 **How the Buttons Work:**

Each project section can have a beautiful gradient button:

**"View Full Project (PDF)"**

When clicked:
- **Opens PDF directly in your browser** (new tab)
- Works on desktop, tablet, and mobile
- Viewers can scroll through the full project
- No download required - just instant viewing!

---

## 💡 **Best Practices:**

### **File Size:**
- Keep PDFs under 10MB if possible
- Compress using Adobe Acrobat or online tools
- Balance quality vs. file size

### **File Quality:**
- Export at 150-300 DPI for screen viewing
- Include all pages (don't just upload page 1)
- Ensure text is searchable (not just images)

### **Organization:**
- One PDF per project (not combined)
- Match PDF name to project title
- Keep naming consistent

---

## 🔧 **Adding More PDF Buttons:**

Want to add PDF buttons to other projects? Copy this HTML:

```html
<div class="pdf-viewer">
    <a href="pdfs/your-project-name.pdf" target="_blank" class="btn-pdf">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
            <path d="M14 2v6h6" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="14" r="3" stroke="currentColor" stroke-width="2"/>
        </svg>
        View Full Project (PDF)
    </a>
</div>
```

Replace `your-project-name.pdf` with your actual PDF filename.

---

## 🎯 **Quick Start:**

1. **Export** one of your projects as a PDF (or use existing PDFs)
2. **Name it** descriptively (e.g., `sinet-showcase-2016.pdf`)
3. **Upload** to the `/pdfs` folder on GitHub
4. **Test** by clicking the "View Full Project" button in your portfolio!

---

## 📧 **Questions?**

Contact: sherry.graphicdesign@gmail.com

---

**Pro Tip:** You can upload PDFs of work that isn't even in your main portfolio PDF - add new projects anytime!
