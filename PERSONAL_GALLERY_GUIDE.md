# 📸 Personal Gallery Feature Guide

## Overview
The Personal Gallery component allows you to showcase your personal photos and Instagram reels in your hero section in fun, interactive ways! This adds a personal touch to your portfolio and helps visitors get to know the real you.

## 🎨 Display Modes

### 1. **Floating Mode** (Default)
Photos float around the hero section with parallax effects that respond to mouse movement. Perfect for creating a dynamic, playful atmosphere.

**Best for:** Personal photos, behind-the-scenes shots, casual moments

### 2. **Carousel Mode**
Instagram reels displayed in a swipeable carousel with navigation controls. Auto-rotates every 5 seconds.

**Best for:** Instagram reels, video content, showcasing your personality

### 3. **Grid Mode**
Compact 3x3 grid of photos with hover effects. Clean and organized.

**Best for:** Multiple photos, portfolio highlights, organized showcase

### 4. **Polaroid Mode**
Photos displayed as stacked polaroids with rotation effects. Vintage, nostalgic feel.

**Best for:** Personal photos, creative shots, artistic presentation

## 🚀 How to Use

### Step 1: Add Your Photos/Reels to `portfolio.js`

Open `src/portfolio.js` and find the `greeting` object. You'll see the `personalGallery` configuration:

```javascript
personalGallery: {
  display: true, // Set to false to hide
  displayMode: "floating", // Choose: "floating", "carousel", "grid", "polaroid"
  photos: [
    // Add your photos here
  ],
  reels: [
    // Add your Instagram reels here
  ]
}
```

### Step 2: Add Your Photos

#### Option A: Local Images (Recommended)
1. Create a folder: `src/assets/images/personal/`
2. Add your photos to this folder
3. Reference them in `portfolio.js`:

```javascript
photos: [
  {
    url: require("./assets/images/personal/photo1.jpg"),
    alt: "Working on a project",
    caption: "Building something awesome! 🚀"
  },
  {
    url: require("./assets/images/personal/photo2.jpg"),
    alt: "Team collaboration",
    caption: "Collaborating with the team 💪"
  },
  // Simple format (just URL):
  require("./assets/images/personal/photo3.jpg"),
]
```

#### Option B: External URLs
```javascript
photos: [
  {
    url: "https://example.com/my-photo.jpg",
    alt: "My photo",
    caption: "Check this out! 📸"
  }
]
```

### Step 3: Add Instagram Reels

#### Option A: Video Files
```javascript
reels: [
  {
    type: "video",
    url: require("./assets/videos/reel1.mp4"),
    caption: "Behind the scenes! 🎬"
  }
]
```

#### Option B: Instagram Embed URLs
1. Go to your Instagram reel
2. Click the three dots (⋯) → Embed
3. Copy the embed URL
4. Use it like this:

```javascript
reels: [
  {
    type: "embed",
    embedUrl: "https://www.instagram.com/reel/ABC123/embed/",
    url: "https://www.instagram.com/reel/ABC123/",
    caption: "Check out my latest project!"
  }
]
```

**Note:** Instagram embed URLs require the reel to be public. For private reels, use video files instead.

## 🎯 Display Mode Examples

### Floating Mode Example
```javascript
personalGallery: {
  display: true,
  displayMode: "floating",
  photos: [
    { url: require("./assets/images/personal/photo1.jpg"), caption: "Coding session! 💻" },
    { url: require("./assets/images/personal/photo2.jpg"), caption: "Team meeting 🎯" },
    { url: require("./assets/images/personal/photo3.jpg"), caption: "Project launch 🚀" },
  ],
  reels: []
}
```

### Carousel Mode Example
```javascript
personalGallery: {
  display: true,
  displayMode: "carousel",
  photos: [],
  reels: [
    {
      type: "embed",
      embedUrl: "https://www.instagram.com/reel/ABC123/embed/",
      caption: "My latest project showcase!"
    },
    {
      type: "video",
      url: require("./assets/videos/reel1.mp4"),
      caption: "Behind the scenes"
    }
  ]
}
```

### Grid Mode Example
```javascript
personalGallery: {
  display: true,
  displayMode: "grid",
  photos: [
    // Add 9 photos for a 3x3 grid
    { url: require("./assets/images/personal/photo1.jpg") },
    { url: require("./assets/images/personal/photo2.jpg") },
    // ... up to 9 photos
  ],
  reels: []
}
```

### Polaroid Mode Example
```javascript
personalGallery: {
  display: true,
  displayMode: "polaroid",
  photos: [
    { url: require("./assets/images/personal/photo1.jpg"), caption: "2024" },
    { url: require("./assets/images/personal/photo2.jpg"), caption: "Team" },
  ],
  reels: []
}
```

## 💡 Tips & Best Practices

1. **Photo Quality**: Use high-quality images (at least 800x800px for best results)

2. **File Size**: Optimize images before adding them to keep your site fast
   - Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)

3. **Photo Count**:
   - Floating mode: 3-6 photos work best
   - Grid mode: 6-9 photos for a complete grid
   - Polaroid mode: 3-5 photos for best visual effect
   - Carousel: As many reels as you want!

4. **Captions**: Add fun, personal captions to make it more engaging

5. **Mix It Up**: Try different display modes to see what fits your style!

6. **Responsive**: The component is fully responsive and will adapt to mobile devices

## 🎨 Customization

### Change Display Mode
Simply change the `displayMode` value in `portfolio.js`:
- `"floating"` - Photos float around
- `"carousel"` - Instagram reels carousel
- `"grid"` - Photo grid
- `"polaroid"` - Polaroid stack

### Hide the Gallery
Set `display: false` in the `personalGallery` configuration.

## 🐛 Troubleshooting

**Photos not showing?**
- Check that the file paths are correct
- Ensure images are in the correct folder
- Verify the `display` property is set to `true`

**Instagram reels not loading?**
- Make sure the reel is set to public
- Check that the embed URL is correct
- Try using a video file instead of embed

**Layout issues?**
- The component is responsive, but very small screens may hide floating photos
- Try a different display mode for mobile

## 📱 Mobile Considerations

- **Floating mode**: Hidden on screens smaller than 480px for better UX
- **Carousel mode**: Fully functional on all devices
- **Grid mode**: Adapts to 2 columns on mobile
- **Polaroid mode**: Scales down appropriately

## 🎉 Have Fun!

This feature is all about showing your personality! Don't be afraid to experiment with different photos, captions, and display modes. Make it uniquely you!

---

**Need help?** Check the component code in `src/components/personalGallery/PersonalGallery.js` for more customization options.

