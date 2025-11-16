# 📱 Instagram Reels Grid Guide

## ✨ What You Have Now

A **modern, full-screen hero section** with **three vertical columns** displaying your Instagram reels - just like a modern social media feed! The reels appear as a transparent, blended background behind your content.

## 🎯 Features

- **Three Vertical Columns** - Reels distributed across 3 columns
- **Auto-Rotating** - Reels automatically change every 4 seconds
- **Transparent/Blended** - Reels appear subtly in the background
- **Click to Focus** - Click any reel to make it active
- **Smooth Transitions** - Fade animations between reels
- **Responsive Design** - Adapts beautifully to all screen sizes
- **Future-Proof** - Easy to center content and remove Lottie art later

## 📝 How to Add Your Reels

### Step 1: Get Instagram Reel Embed URL

1. Go to your Instagram reel
2. Click the three dots (⋯) → **Embed**
3. Copy the embed URL (looks like: `https://www.instagram.com/reel/ABC123/embed/`)

### Step 2: Add to `portfolio.js`

Open `src/portfolio.js` and find the `personalGallery` section:

```javascript
personalGallery: {
  display: true,
  reels: [
    {
      embedUrl: "https://www.instagram.com/reel/YOUR_REEL_ID/embed/",
      url: "https://www.instagram.com/reel/YOUR_REEL_ID/",
      caption: "Check out my latest project! 🚀"
    },
    {
      embedUrl: "https://www.instagram.com/reel/ANOTHER_REEL_ID/embed/",
      url: "https://www.instagram.com/reel/ANOTHER_REEL_ID/",
      caption: "Behind the scenes! 🎬"
    },
    // Add as many as you want - they'll be distributed across 3 columns
  ],
  autoPlay: true
}
```

## 🎬 Alternative: Use Video Files

If you prefer to use video files instead of Instagram embeds:

```javascript
reels: [
  {
    type: "video",
    url: require("./assets/videos/reel1.mp4"),
    caption: "My awesome reel! 🎥"
  }
]
```

**Note:** Create a `src/assets/videos/` folder and add your MP4 files there.

## 🖼️ Alternative: Use Static Images

You can also use static images if you don't have reels yet:

```javascript
reels: [
  {
    url: require("./assets/images/personal/photo1.jpg"),
    caption: "Building something awesome! 💪"
  }
]
```

## ⚙️ Configuration Options

- **`display`**: `true`/`false` - Show/hide the reels grid
- **`autoPlay`**: `true`/`false` - Auto-rotate through reels (every 4 seconds)

## 🎨 How It Works

1. **Distribution**: Reels are automatically distributed across 3 columns
   - Column 1: Reels at index 0, 3, 6, 9...
   - Column 2: Reels at index 1, 4, 7, 10...
   - Column 3: Reels at index 2, 5, 8, 11...

2. **Auto-Rotation**: Each column independently rotates through its reels every 4 seconds

3. **Transparency**: Inactive reels are semi-transparent (40% opacity), active reels are fully visible

4. **Blending**: Gradient overlays on the sides ensure your text content is always readable

## 🔮 Future-Proof: Center Content Mode

When you're ready to remove the Lottie illustration and center your content, simply add the `centered-content` class to `.greeting-main` in `Greeting.scss`:

```scss
.greeting-main {
  &.centered-content {
    justify-content: center;
    
    .greeting-text-div {
      max-width: 800px;
      text-align: center;
    }

    .greeting-image-div {
      display: none;
    }
  }
}
```

Or conditionally in the component based on a config option.

## 💡 Best Practices

1. **Reel Count**: Add at least 3-6 reels for best visual effect
2. **Captions**: Keep captions short and engaging (max 2 lines)
3. **Quality**: Use high-quality reels/videos
4. **Mix Content**: Combine Instagram embeds, video files, and images
5. **Public Reels**: Instagram embeds only work with public reels

## 📱 Responsive Behavior

- **Desktop**: Full 3-column grid with all effects
- **Tablet**: 3 columns with adjusted spacing
- **Mobile (< 768px)**: Reels become more transparent
- **Very Small (< 480px)**: Grid hidden for better UX

## 🎯 Example Configuration

```javascript
personalGallery: {
  display: true,
  reels: [
    {
      embedUrl: "https://www.instagram.com/reel/ABC123/embed/",
      url: "https://www.instagram.com/reel/ABC123/",
      caption: "Building production systems 🚀"
    },
    {
      embedUrl: "https://www.instagram.com/reel/DEF456/embed/",
      url: "https://www.instagram.com/reel/DEF456/",
      caption: "Team collaboration 👥"
    },
    {
      embedUrl: "https://www.instagram.com/reel/GHI789/embed/",
      url: "https://www.instagram.com/reel/GHI789/",
      caption: "Project launch ⚡"
    },
    {
      type: "video",
      url: require("./assets/videos/custom-reel.mp4"),
      caption: "Custom content 🎬"
    }
  ],
  autoPlay: true
}
```

## 🚨 Troubleshooting

**Reels not showing?**
- Check that `display: true`
- Verify you have at least 1 reel in the array
- Ensure Instagram reels are set to **public**
- Check embed URLs are correct

**Text hard to read?**
- The component automatically adds gradient overlays
- Adjust opacity in `InstagramReelsGrid.scss` if needed

**Reels not auto-rotating?**
- Make sure `autoPlay: true`
- Each column needs at least 2 reels to rotate

**Layout issues?**
- The grid is fully responsive
- On very small screens, it automatically hides

## 🎉 That's It!

Your hero section now has a modern, Instagram-style reel grid that blends beautifully with your content. Add your reels and watch them come to life!

---

**Pro Tip:** Start with 3-6 reels to see how it looks, then add more as needed. The more reels you add, the more dynamic the background becomes!

