# 📍 WHERE TO ADD YOUR PHOTOS - Quick Guide

## 🎯 Where the Gallery Appears

The personal gallery will appear in your **hero section** (the main landing area):

- **Floating Mode**: Photos float around the entire hero section (behind/around the illustration)
- **Carousel/Grid/Polaroid Modes**: Appear on the right side where the illustration currently is

## 📁 Step 1: Create the Photos Folder

Create this folder structure:

```
src/
  assets/
    images/
      personal/          ← CREATE THIS FOLDER
        photo1.jpg      ← Add your photos here
        photo2.jpg
        photo3.jpg
        ...
```

**To create the folder:**
1. Navigate to: `src/assets/images/`
2. Create a new folder called `personal`
3. Add your photos to this folder

## ⚙️ Step 2: Configure in portfolio.js

Open this file: **`src/portfolio.js`**

Find the `greeting` object (around line 18) and look for `personalGallery`:

```javascript
const greeting = {
  // ... other config ...
  personalGallery: {
    display: true,  // ← Make sure this is true
    displayMode: "floating",  // ← Choose your mode
    photos: [
      // ← ADD YOUR PHOTOS HERE
    ],
    reels: []
  }
};
```

## 📝 Step 3: Add Your Photos

In the `photos` array, add your photos like this:

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
  // Add more photos...
]
```

## 🎬 Step 4: Add Instagram Reels (Optional)

For Instagram reels, add them to the `reels` array:

```javascript
reels: [
  {
    type: "embed",
    embedUrl: "https://www.instagram.com/reel/YOUR_REEL_ID/embed/",
    url: "https://www.instagram.com/reel/YOUR_REEL_ID/",
    caption: "Check out my latest project!"
  }
]
```

## 📍 Exact File Locations

### Configuration File:
```
/Users/jugalsheth/Desktop/developerFolio/src/portfolio.js
```
**Line:** ~26-56 (inside the `greeting` object)

### Photos Folder:
```
/Users/jugalsheth/Desktop/developerFolio/src/assets/images/personal/
```
**Note:** You need to create this folder first!

### Component Files (already created):
```
/Users/jugalsheth/Desktop/developerFolio/src/components/personalGallery/
  - PersonalGallery.js
  - PersonalGallery.scss
```

## 🚀 Quick Start Example

1. **Create folder:** `src/assets/images/personal/`

2. **Add 3-5 photos** to that folder (name them: `photo1.jpg`, `photo2.jpg`, etc.)

3. **Edit `src/portfolio.js`** and update the `photos` array:

```javascript
personalGallery: {
  display: true,
  displayMode: "floating",
  photos: [
    {
      url: require("./assets/images/personal/photo1.jpg"),
      caption: "My awesome moment! 🚀"
    },
    {
      url: require("./assets/images/personal/photo2.jpg"),
      caption: "Working hard! 💪"
    },
    {
      url: require("./assets/images/personal/photo3.jpg"),
      caption: "Team collaboration! 👥"
    }
  ],
  reels: []
}
```

4. **Save and refresh** your browser - the photos will appear!

## 🎨 Display Modes

Change `displayMode` to see different styles:

- `"floating"` - Photos float around hero section
- `"carousel"` - Instagram reels carousel (right side)
- `"grid"` - 3x3 photo grid (right side)
- `"polaroid"` - Polaroid stack (right side)

## ❓ Still Can't See It?

1. Make sure `display: true` in `personalGallery`
2. Make sure you have at least 1 photo in the `photos` array
3. Check that the file paths are correct
4. Make sure the `personal` folder exists
5. Restart your dev server: `npm start`

---

**That's it!** Once you add photos to the folder and update `portfolio.js`, they'll appear in your hero section! 🎉

