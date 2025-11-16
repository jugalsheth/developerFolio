# 📹 Video Reels Folder

Add your video files here for the hero section background!

## How to Use:

1. **Add your video files** to this folder (e.g., `reel1.mp4`, `reel2.mp4`, etc.)

2. **Update `src/portfolio.js`** and reference them like this:

```javascript
reels: [
  {
    type: "video",
    url: require("./assets/videos/reel1.mp4"),
    caption: "My awesome reel! 🚀"
  },
  {
    type: "video",
    url: require("./assets/videos/reel2.mp4"),
    caption: "Another moment! 🎉"
  }
]
```

3. The videos will appear as full-screen transparent backgrounds behind your hero content!

## Supported Formats:
- `.mp4` (recommended)
- `.webm`
- `.mov`

## Tips:
- Keep file sizes reasonable (under 10MB per video for best performance)
- Recommended resolution: 1080x1920 (vertical/portrait) or 1920x1080 (horizontal)
- Videos will autoplay, loop, and be muted
- They'll appear transparent/blended behind your content

