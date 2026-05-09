# Visible Beauty Saloon - Rajahmundry

A modern, responsive React website for Visible Beauty Saloon in Rajahmundry with online booking and event management features.

## Features

- 🏠 **Home Page** - Hero section with service highlights and testimonials
- 💇 **Services** - Comprehensive service catalog with filtering
- 📅 **Online Booking** - Multi-step booking flow with mock calendar
- 🎉 **Events** - Event packages and inquiry forms
- 🖼️ **Gallery** - Photo gallery with lightbox view
- 📞 **Contact** - Contact form and location map
- 🌐 **Bilingual** - English and Telugu language support
- 📱 **Responsive** - Mobile-first design

## Tech Stack

- React 18
- React Router v6
- Tailwind CSS
- Parcel bundler

## Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn start

# Build for production
yarn build
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ServiceCard.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── Booking.jsx
│   ├── Events.jsx
│   ├── Gallery.jsx
│   └── Contact.jsx
├── data/            # Mock data (JSON)
│   ├── services.json
│   ├── staff.json
│   ├── testimonials.json
│   └── translations.json
├── context/         # React context
│   └── LanguageContext.js
├── App.jsx
├── index.js
└── index.css
```

## Current Status

This is a **prototype with stubbed data**. All features are functional with mock data:

- ✅ Booking flow works but doesn't save to database
- ✅ Forms submit but don't send emails
- ✅ Payment selection available but not integrated
- ✅ Language toggle works for UI text

## Next Steps for Production

1. **Backend Integration**
   - Set up Node.js/PHP backend
   - Connect to database (MySQL/MongoDB)
   - Implement real booking system

2. **Payment Gateway**
   - Integrate Razorpay/PayTM
   - Add UPI, card, netbanking options

3. **Notifications**
   - SMS reminders (Twilio/MSG91)
   - WhatsApp notifications
   - Email confirmations

4. **Admin Dashboard**
   - Staff login
   - Booking management
   - Calendar sync

5. **SEO & Performance**
   - Add meta tags
   - Optimize images
   - Implement lazy loading
   - Add schema markup

## Customization

### Update Business Details

Edit the footer in `src/components/Footer.jsx` and contact page in `src/pages/Contact.jsx`

### Add/Remove Services

Edit `src/data/services.json`

### Change Colors

Edit `tailwind.config.js` to customize the color scheme

### Add Staff Members

Edit `src/data/staff.json`

## License

MIT

## Contact

For questions or support, contact: info@visiblebeautysaloon.com
