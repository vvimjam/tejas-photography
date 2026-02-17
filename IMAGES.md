# Adding Your Own Images

## 📁 Image Organization

Place your images in the following folders:

### Portfolio Images
`public/images/portfolio/`
- Add your portfolio photos here (e.g., `photo1.jpg`, `photo2.jpg`, etc.)
- **Supports**: JPG, PNG, WebP, SVG
- **Any aspect ratio works** - vertical, horizontal, or square
- **Recommended size**: 1200-2000px on the longest side for quality
- The grid automatically adapts to different image sizes

### Hero Background Images
`public/images/hero/`
- Add background images for the hero carousel (changes every 6 seconds)
- These should be **landscape-oriented** for best results
- **Recommended size**: 1920x1080px or higher
- **Format**: JPG or WebP for photos, PNG for graphics

### About Section Image
`public/images/about/`
- Add a portrait or photo of the photographer
- **Any aspect ratio** supported
- **Recommended size**: 800-1200px on the longest side
- **Format**: JPG, PNG, or WebP

---

## 🚀 Quick Start Guide

### Step 1: Add Your Images

Simply drag and drop your images into the appropriate folders above.

### Step 2: Update the Component Files

#### Portfolio Images
Edit `src/components/Portfolio.tsx` around line 17:

```typescript
const portfolioItems: PortfolioItem[] = [
  { 
    id: 1, 
    title: 'Sunset at Golden Gate', 
    category: 'Landscape', 
    image: '/images/portfolio/sunset.jpg' 
  },
  { 
    id: 2, 
    title: 'City Streets', 
    category: 'Urban', 
    image: '/images/portfolio/city.jpg' 
  },
  // Add as many as you want!
];
```

#### Hero Backgrounds
Edit `src/components/Hero.tsx` around line 10:

```typescript
const heroImages = [
  '/images/hero/background1.jpg',
  '/images/hero/background2.jpg',
  '/images/hero/background3.jpg',
  '/images/hero/background4.jpg',
];
```

#### About Image
Edit `src/components/About.tsx` around line 52:

```typescript
<img 
  src="/images/about/photographer.jpg" 
  alt="Photographer at work"
/>
```

---

## 📐 Aspect Ratio Support

✅ **The portfolio grid now supports ANY aspect ratio!**

- **Vertical photos** (portrait): 2:3, 3:4, 9:16, etc.
- **Horizontal photos** (landscape): 16:9, 3:2, 4:3, etc.  
- **Square photos**: 1:1
- **Custom ratios**: Any ratio you want!

The layout automatically adapts - no cropping or distortion.

---

## 💡 Image Optimization Tips

### For Hero Backgrounds (Most Important!)

Hero images should be optimized aggressively since they're large and load first:

1. **Use WebP format** - 30-50% smaller than JPG with same quality
   - Convert with [Squoosh](https://squoosh.app) or [Cloudconvert](https://cloudconvert.com)
   - Target: 200-400KB per hero image

2. **Progressive/Interlaced encoding**:
   - JPG: Use progressive mode (shows blurred preview then refines)
   - Use tools like [ImageOptim](https://imageoptim.com) (Mac) or [FileOptimizer](https://nikkhokkho.sourceforge.io/static.php?page=FileOptimizer) (Windows)

3. **Resize to actual display size**:
   - Desktop hero: 1920x1080px is plenty
   - Don't use 4K images (3840x2160) - they're overkill for web
   - Mobile users see smaller images anyway

4. **Quality settings**:
   - JPG: 75-85% quality is the sweet spot
   - WebP: 75-80% quality
   - You won't notice the difference but file size drops dramatically

5. **Blur optimization** (advanced):
   - Slightly blur areas that will be covered by text
   - Reduces file size by 10-20%

### For Portfolio Images

1. **Compress before uploading**: Use [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)
   - Target: Under 300KB per image
   - Under 150KB for thumbnails if you add them

2. **Use modern formats**:
   - WebP for best quality/size ratio (create JPG fallback)
   - JPG for compatibility
   - PNG only for images with transparency

3. **Responsive images** (advanced):
   ```html
   <picture>
     <source srcset="image.webp" type="image/webp">
     <img src="image.jpg" alt="fallback">
   </picture>
   ```

### Quick Compression Guide

**Using Squoosh (Free, Web-based):**
1. Go to [squoosh.app](https://squoosh.app)
2. Upload your image
3. Select "MozJPEG" or "WebP" on the right
4. Adjust quality to 75-80
5. Compare before/after
6. Download optimized version

**Using ImageOptim (Mac, Free):**
1. Download from [imageoptim.com](https://imageoptim.com)
2. Drag and drop images
3. It automatically optimizes (lossless + lossy)
4. Done!

**Using Online Tools:**
- [Compressor.io](https://compressor.io) - Auto-optimizes
- [TinyPNG](https://tinypng.com) - Up to 20 images at once
- [Optimizilla](https://imagecompressor.com) - Visual comparison

### Advanced: Lazy Loading & Blur-up

The site now includes:
- ✅ **Image preloading** - First 3 hero images load immediately
- ✅ **Lazy loading** - Remaining images load in background
- ✅ **Gradient fallback** - No white flash during load
- ✅ **Smooth transitions** - Images fade in nicely

3. **Naming conventions**:
   - Use descriptive names: `sunset-mountains.jpg` not `IMG_1234.jpg`
   - Use lowercase and hyphens
   - Avoid spaces and special characters

4. **Backup originals**:
   - Keep high-resolution originals elsewhere
   - Only upload optimized versions to the site

---

## 🎨 Best Practices

- **Mix aspect ratios** for visual interest in the portfolio grid
- **Consistent quality** across all images
- **Tell a story** with your image selection
- **Update hero backgrounds** seasonally or for special events
- **Test mobile view** to ensure images look good on all devices

---

## ⚠️ Troubleshooting

**Image not showing?**
- Check the file path is correct (case-sensitive!)
- Ensure the image is in the `public/images/` folder
- Try refreshing the browser with Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)

**Images loading slowly / White flash on hero?**
- **Convert to WebP** - Can reduce size by 30-50%
- Compress more aggressively (75-80% quality is fine)
- Check file sizes - hero images should be under 400KB
- Make sure images are 1920px wide, not larger
- The site now preloads the first 3 hero images automatically
- Shows a gradient fallback to prevent white flash

**Image looks stretched or distorted?**
- This shouldn't happen anymore - all aspect ratios are supported!
- If you see issues, check that `object-fit: cover` is in the CSS

**Hero carousel not smooth?**
- Ensure hero images are all similar file sizes
- Images load in priority: first 3 immediately, rest after 2 seconds
- Consider using all WebP format for consistency
- Check Network tab in DevTools to see load times

---

## 🔧 Advanced: Dynamic Image Loading

For many images, consider creating a JSON file:

`public/images/portfolio/images.json`:
```json
[
  {"id": 1, "title": "Photo 1", "category": "Landscape", "image": "/images/portfolio/photo1.jpg"},
  {"id": 2, "title": "Photo 2", "category": "Portrait", "image": "/images/portfolio/photo2.jpg"}
]
```

Then fetch and render dynamically in your component!
