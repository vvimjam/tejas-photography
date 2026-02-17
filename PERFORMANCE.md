# Performance Optimizations

## Hero Image Loading Strategy

The website implements several performance optimizations to handle large hero images gracefully:

### 1. **Progressive Loading**
- **First 3 images** preload immediately for instant display
- **Remaining images** lazy load after 2 seconds
- Prevents blocking the initial page render

### 2. **Gradient Fallback**
- Beautiful gradient background (`#667eea` to `#764ba2`) displays instantly
- No more white flash while images load
- Creates a professional loading experience

### 3. **Smart Transitions**
- Images only become visible after they're fully loaded
- 2.5-second fade-in for smooth appearance
- Ken Burns zoom effect only applies to loaded images

### 4. **Loading State Management**
- Tracks which images have finished loading
- Only displays background images that are ready
- Graceful degradation if images fail to load

## How It Works

```typescript
// Preload first 3 images immediately
heroImages.slice(0, 3).forEach((src, index) => {
  const img = new Image();
  img.onload = () => setImagesLoaded(prev => new Set(prev).add(index));
  img.src = src;
});

// Lazy load remaining images after 2 seconds
setTimeout(() => {
  heroImages.slice(3).forEach((src, index) => {
    const img = new Image();
    img.onload = () => setImagesLoaded(prev => new Set(prev).add(index + 3));
    img.src = src;
  });
}, 2000);
```

## CSS Strategy

```css
/* Fallback gradient - shows instantly */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Images only visible when loaded */
.hero-background-image.active.loaded {
  opacity: 1;
}
```

## Results

- ✅ **No white flash** - Gradient shows immediately
- ✅ **Fast initial render** - First image preloaded
- ✅ **Smooth transitions** - Images fade in beautifully
- ✅ **Better UX** - Professional loading experience
- ✅ **Reduced bandwidth** - Lazy loading for non-critical images

## Further Optimization Tips

1. **Convert to WebP** - Reduce file size by 30-50%
2. **Use 1920x1080** - Don't exceed this for web
3. **Target 200-400KB** per hero image
4. **Progressive JPEGs** - Shows blurred preview while loading
5. **Compress at 75-80%** quality - Imperceptible difference

See `IMAGES.md` for detailed optimization instructions.
