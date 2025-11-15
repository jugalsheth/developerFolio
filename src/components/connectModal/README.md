# Connect Modal - How It Works

## 📧 Contact Form Flow

When users fill out the contact form and click "Send Message":

1. **Form Validation**: Client-side validation ensures all fields are filled
2. **Processing**: Shows loading state (1.5 seconds)
3. **Email Client Opens**: Automatically opens the user's default email client (Gmail, Outlook, Apple Mail, etc.)
4. **Pre-filled Email**: The email is pre-filled with:
   - **To**: jugal.sheth63@gmail.com
   - **Subject**: "Contact from [Name] - Portfolio"
   - **Body**: Includes name, email, and message

## 📬 Where Messages Go

**Current Implementation**: Messages go directly to your email inbox at `jugal.sheth63@gmail.com`

The form uses a `mailto:` link which:
- Opens the user's email client
- Pre-fills the email with form data
- User clicks "Send" in their email client
- Message arrives in your Gmail inbox

## 🔄 Alternative: Backend Integration (Optional)

If you want messages to go directly to your inbox without users opening their email client, you can:

### Option 1: Email Service (Recommended)
- **SendGrid**: Free tier (100 emails/day)
- **Mailgun**: Free tier (5,000 emails/month)
- **EmailJS**: Free tier (200 emails/month) - No backend needed!

### Option 2: Serverless Function
- **Vercel Functions**: Easy integration
- **Netlify Functions**: Similar to Vercel
- **AWS Lambda**: More control

### Option 3: Form Service
- **Formspree**: Free tier (50 submissions/month)
- **Getform**: Free tier (50 submissions/month)
- **Typeform**: More advanced

## 💡 Quick Integration with EmailJS

```javascript
// Install: npm install @emailjs/browser

import emailjs from '@emailjs/browser';

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'jugal.sheth63@gmail.com'
      },
      'YOUR_PUBLIC_KEY'
    );
    
    setSubmitted(true);
  } catch (error) {
    console.error('Failed to send:', error);
    // Show error message
  } finally {
    setIsSubmitting(false);
  }
};
```

## 🔗 Connection Options

The modal provides multiple ways to connect:

1. **Email**: Opens mailto link → `jugal.sheth63@gmail.com`
2. **LinkedIn**: Opens your LinkedIn profile → `https://www.linkedin.com/in/jugal-sheth/`
3. **GitHub**: Opens your GitHub profile → `https://github.com/jugalsheth`
4. **Phone**: Opens phone dialer → `+1 (857) 869-8235`

## 📝 Current Setup

- ✅ LinkedIn URL updated to: `https://www.linkedin.com/in/jugal-sheth/`
- ✅ Email: `jugal.sheth63@gmail.com`
- ✅ Phone: `+1 (857) 869-8235`
- ✅ All social links working

## 🚀 Future Enhancements

1. Add backend endpoint for direct message submission
2. Add email notification when form is submitted
3. Add form submission tracking/analytics
4. Add auto-reply confirmation email
5. Add spam protection (reCAPTCHA)

