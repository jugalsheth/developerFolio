# Setup Guide: Calendly, Google Analytics 4, and Google Ads Integration

This comprehensive guide will walk you through setting up Calendly scheduling, Google Analytics 4, and Google Ads conversion tracking for your portfolio.

---

## Table of Contents

1. [Calendly Setup](#1-calendly-setup)
2. [Google Analytics 4 Setup](#2-google-analytics-4-setup)
3. [Google Ads Conversion Tracking Setup](#3-google-ads-conversion-tracking-setup)
4. [Configuring Your Portfolio](#4-configuring-your-portfolio)
5. [Deployment Instructions](#5-deployment-instructions)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Calendly Setup

### Step 1: Create a Calendly Account (Free)

1. Go to [calendly.com](https://calendly.com)
2. Click "Sign up for free"
3. Sign up with your email or Google account
4. Complete the onboarding process

### Step 2: Create an Event Type

1. In your Calendly dashboard, click **"Event Types"** in the left sidebar
2. Click **"+ New Event Type"**
3. Choose **"One-on-One"** (or your preferred type)
4. Configure your event:
   - **Name**: e.g., "30-minute Meeting" or "Coffee Chat"
   - **Duration**: Choose 15, 30, or 60 minutes
   - **Location**: Select "Google Meet" (this will automatically create Google Meet links)
   - **Description**: Add a brief description
5. Click **"Save"**

### Step 3: Connect Google Calendar

1. In Calendly, go to **Settings** → **Integrations**
2. Find **Google Calendar** and click **"Connect"**
3. Sign in with your Google account
4. Grant permissions for Calendly to access your calendar
5. This ensures Calendly can check your availability and prevent double-booking

### Step 4: Enable Google Meet Integration

1. In your event type settings, go to **"Location"**
2. Select **"Google Meet"**
3. Calendly will automatically add Google Meet links to all scheduled meetings
4. Save your changes

### Step 5: Get Your Calendly Event URL

1. Go to **Event Types** in your Calendly dashboard
2. Click on your event type
3. Click **"Share"** or **"Copy link"**
4. Your URL will look like: `https://calendly.com/yourname/event-name`
5. **Copy this URL** - you'll need it for the portfolio configuration

---

## 2. Google Analytics 4 Setup

### Step 1: Create a GA4 Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Sign in with your Google account
3. If you don't have an account, click **"Start measuring"**
4. Click **"Admin"** (gear icon) in the bottom left
5. In the **Property** column, click **"Create Property"**
6. Fill in:
   - **Property name**: e.g., "Portfolio Website"
   - **Reporting time zone**: Select your timezone
   - **Currency**: Select your currency
7. Click **"Next"** and fill in business information
8. Click **"Create"**

### Step 2: Get Your Measurement ID

1. In your GA4 property, go to **Admin** → **Data Streams**
2. Click **"Add stream"** → **"Web"**
3. Enter:
   - **Website URL**: `https://jugalsheth.github.io/developerFolio` (or your GitHub Pages URL)
   - **Stream name**: e.g., "Portfolio Website"
4. Click **"Create stream"**
5. You'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
6. **Copy this ID** - you'll need it for the portfolio configuration

### Step 3: Verify Tracking (Optional)

1. In the stream details, you'll see **"Tagging instructions"**
2. You can test the tracking using Google Tag Assistant browser extension
3. After deployment, check **Real-Time** reports in GA4 to verify tracking works

---

## 3. Google Ads Conversion Tracking Setup

**Note**: The tracking code is free, but running actual ads requires a budget. You can set up tracking without running ads.

### Step 1: Create a Google Ads Account

1. Go to [ads.google.com](https://ads.google.com)
2. Click **"Start now"** or sign in
3. Complete the account setup (you don't need to create a campaign yet)

### Step 2: Create a Conversion Action

1. In Google Ads, click **Tools & Settings** (wrench icon) → **Conversions**
2. Click **"+ New conversion action"**
3. Select **"Website"**
4. Fill in:
   - **Category**: Choose "Sign-up" or "Other"
   - **Conversion name**: e.g., "Schedule Meeting"
   - **Value**: Optional (set to "Don't use a value" if unsure)
   - **Count**: Choose "One" (each conversion counts once)
5. Click **"Create and continue"**

### Step 3: Get Your Conversion ID and Label

1. After creating the conversion, you'll see **"Tag setup"**
2. Select **"Use Google Tag Manager"** or **"Install the tag yourself"**
3. You'll see:
   - **Conversion ID**: Format `AW-XXXXXXXXX`
   - **Conversion Label**: A string like `AbC-dEfG-hIjK`
4. **Copy both values** - you'll need them for the portfolio configuration

### Step 4: (Optional) Set Up Google Tag Manager

If you prefer using Google Tag Manager instead of direct implementation:
1. Create a GTM container
2. Add GA4 and Google Ads tags
3. Publish the container
4. Add GTM script to your portfolio

---

## 4. Configuring Your Portfolio

### Step 1: Configure Calendly URL

1. Open `src/portfolio.js`
2. Find the `calendlyConfig` object (around line 506)
3. Replace the placeholder URL:
   ```javascript
   const calendlyConfig = {
     url: "https://calendly.com/yourname/event-name", // Your actual Calendly URL
     enabled: true
   };
   ```
4. Save the file

### Step 2: Configure Google Analytics 4

1. Open `public/index.html`
2. Find the GA4 script section (around line 52)
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX'); // Replace with your ID
   </script>
   ```
4. Save the file

### Step 3: Configure Google Ads

1. In the same `public/index.html` file
2. Find the Google Ads script section (around line 61)
3. Replace `AW-XXXXXXXXX` with your Conversion ID:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'AW-XXXXXXXXX'); // Replace with your ID
   </script>
   ```
4. Save the file

### Step 4: (Optional) Configure Conversion Label

If you want to track conversions programmatically:

1. Create a `.env` file in the root directory (copy from `env.example`)
2. Add:
   ```
   REACT_APP_GOOGLE_ADS_CONVERSION_LABEL=your-conversion-label
   ```
3. The conversion will be tracked automatically when users schedule meetings

---

## 5. Deployment Instructions

### Pre-Deployment Testing

**Before deploying, test everything locally:**

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Test the build locally:**
   ```bash
   npx serve -s build
   # Or install serve globally: npm install -g serve
   ```

3. **Visit `http://localhost:3000` and verify:**
   - ✅ Calendly widget loads when you click "Schedule Meeting"
   - ✅ GA4 tracking works (check browser console for gtag calls)
   - ✅ Google Ads script loads (check Network tab)
   - ✅ All features work in both light/dark modes
   - ✅ Mobile responsive design works

### Deployment Methods

#### Option A: Manual Deployment

1. **Build and deploy:**
   ```bash
   npm run deploy
   ```
   This automatically:
   - Runs `npm run build` (creates build folder)
   - Deploys `build/` folder to `gh-pages` branch

2. **Wait a few minutes** for GitHub Pages to update
3. **Visit your site**: `https://jugalsheth.github.io/developerFolio`

#### Option B: Automatic Deployment (GitHub Actions)

1. **Push your changes to the `master` branch:**
   ```bash
   git add .
   git commit -m "Add Calendly, GA4, and Google Ads integration"
   git push origin master
   ```

2. **GitHub Actions will automatically:**
   - Build your project
   - Deploy to GitHub Pages

3. **Check deployment status:**
   - Go to your GitHub repo
   - Click **"Actions"** tab
   - Monitor the deployment progress

### Post-Deployment Verification

1. **Visit your GitHub Pages URL:**
   `https://jugalsheth.github.io/developerFolio`

2. **Open browser DevTools** (F12) → **Network** tab

3. **Verify scripts load:**
   - ✅ Calendly script (from `assets.calendly.com`)
   - ✅ GA4 script (from `googletagmanager.com`)
   - ✅ Google Ads script (from `googletagmanager.com`)

4. **Test Calendly:**
   - Click "Let's Connect" button
   - Click "Schedule Meeting"
   - Verify Calendly widget appears
   - Try scheduling a test meeting

5. **Verify GA4 Tracking:**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Navigate to **Reports** → **Real-time**
   - You should see your visit

6. **Test in incognito mode** to verify tracking works for new visitors

---

## 6. Troubleshooting

### Calendly Issues

**Problem: Calendly widget doesn't appear**
- ✅ Check that `calendlyConfig.enabled` is `true` in `portfolio.js`
- ✅ Verify your Calendly URL is correct
- ✅ Check browser console for JavaScript errors
- ✅ Ensure Calendly script loads (check Network tab)

**Problem: Google Meet links not appearing**
- ✅ Verify Google Calendar is connected in Calendly settings
- ✅ Check that "Google Meet" is selected as location in event type settings
- ✅ Reconnect Google Calendar if needed

### Google Analytics 4 Issues

**Problem: GA4 not tracking visits**
- ✅ Verify Measurement ID is correct in `index.html`
- ✅ Check that script loads (Network tab in DevTools)
- ✅ Ensure no ad blockers are interfering
- ✅ Wait 24-48 hours for data to appear (Real-time reports show immediately)

**Problem: Events not showing**
- ✅ Check browser console for gtag errors
- ✅ Verify analytics.js utility is imported correctly
- ✅ Test with Google Tag Assistant extension

### Google Ads Issues

**Problem: Conversions not tracking**
- ✅ Verify Conversion ID is correct in `index.html`
- ✅ Check that conversion label matches (if using)
- ✅ Ensure conversion action is active in Google Ads
- ✅ Test conversion tracking with Google Tag Assistant

**Problem: Script conflicts**
- ✅ Ensure only one gtag.js script is loaded
- ✅ Check for JavaScript errors in console
- ✅ Verify scripts load in correct order

### General Issues

**Problem: Build fails**
- ✅ Check for syntax errors in modified files
- ✅ Run `npm install` to ensure dependencies are installed
- ✅ Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

**Problem: Changes not appearing after deployment**
- ✅ Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- ✅ Wait 5-10 minutes for GitHub Pages to update
- ✅ Check GitHub Actions logs for errors

**Problem: Mobile responsiveness issues**
- ✅ Test on actual mobile device, not just browser dev tools
- ✅ Check Calendly widget height on mobile
- ✅ Verify modal scrolls properly on small screens

---

## Additional Resources

- [Calendly Help Center](https://help.calendly.com/)
- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Google Ads Conversion Tracking Guide](https://support.google.com/google-ads/answer/1722054)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

## Support

If you encounter issues not covered in this guide:

1. Check browser console for error messages
2. Verify all IDs and URLs are correct
3. Test in incognito mode to rule out extension conflicts
4. Review the implementation files for typos

---

**Congratulations!** 🎉 You've successfully integrated Calendly, Google Analytics 4, and Google Ads conversion tracking into your portfolio. Your visitors can now easily schedule meetings, and you can track and analyze your portfolio's performance.


