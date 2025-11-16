# 🔧 Iframe Not Loading - Troubleshooting Guide

## Current Issue
The Streamlit dashboard iframe is showing a broken/empty state in your portfolio.

## Quick Fixes

### 1. Push Streamlit Config Update (CRITICAL)

The Streamlit config needs to be updated to allow iframe embedding:

```bash
cd real-time-dashboard
git add .streamlit/config.toml
git commit -m "Enable iframe embedding - disable XSRF protection"
git push
```

Wait 1-2 minutes for Streamlit Cloud to redeploy.

### 2. Check Streamlit Cloud Settings

1. Go to: https://share.streamlit.io
2. Find your app: `real-time-dashboard`
3. Click **Settings** (⚙️ icon)
4. Go to **Advanced settings**
5. Under **Security**, check:
   - "Enable XSRF protection" should be **OFF**
   - Or add `localhost:3000` and your production domain to allowed origins

### 3. Test Streamlit URL Directly

Open this URL directly in your browser:
```
https://real-time-dashboard-vjf78bbxheqjjwefbgutyw.streamlit.app
```

If it works directly but not in iframe = Streamlit blocking iframes
If it doesn't work at all = Streamlit app issue

### 4. Browser Console Check

Open DevTools (F12) and check:
- **Console tab**: Look for iframe-related errors
- **Network tab**: Check if the iframe request is being blocked
- Look for errors like:
  - "Refused to display in a frame"
  - "X-Frame-Options" errors
  - CORS errors

### 5. Alternative: Use Streamlit's Embed Feature

Some Streamlit Cloud apps have a built-in embed option:
1. Check Streamlit app settings
2. Look for "Embed" or "Share" options
3. Use the embed URL if available

## Common Solutions

### Solution 1: Streamlit Config (Already Updated)
The `.streamlit/config.toml` has:
```toml
[server]
enableXsrfProtection = false
```

**Just needs to be pushed!**

### Solution 2: Streamlit Cloud UI Settings
1. Go to Streamlit Cloud dashboard
2. App settings → Advanced
3. Toggle off XSRF protection

### Solution 3: Use Direct Link (Temporary)
Until iframe works, users can click "Open in new tab" link

## Testing Steps

1. ✅ Push config update
2. ✅ Wait for redeploy (1-2 min)
3. ✅ Hard refresh portfolio (Cmd+Shift+R)
4. ✅ Check browser console for errors
5. ✅ Test iframe again

## If Still Not Working

1. **Check iframe src**: Verify URL is correct in portfolio.js
2. **Try different browser**: Test in Chrome, Firefox, Safari
3. **Disable extensions**: Ad blockers might block iframes
4. **Check network tab**: See if request is being made
5. **Contact Streamlit support**: If XSRF settings don't help

---

**Most likely fix: Push the config.toml update and wait for redeploy!** 🚀

