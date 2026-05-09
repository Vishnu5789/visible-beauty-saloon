import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import translations from '../data/translations.json';

function Events() {
  const { language } = useContext(LanguageContext);
  const t = translations[language].events;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const eventPackages = [
    {
      id: 1,
      name: { en: 'Bridal Party Package', te: 'బ్రైడల్ పార్టీ ప్యాకేజ్' },
      description: { en: 'Complete beauty services for bride and bridal party', te: 'వధువు మరియు పార్టీ కోసం పూర్తి సౌందర్య సేవలు' },
      features: ['Bridal Makeup', 'Hair Styling', 'Mehendi', 'Draping', 'Photos'],
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
      price: 'Contact for pricing'
    },
    {
      id: 2,
      name: { en: 'Birthday Celebration', te: 'పుట్టినరోజు వేడుక' },
      description: { en: 'Fun makeup and styling for birthday parties', te: 'పుట్టినరోజు పార్టీల కోసం ఫన్ మేకప్' },
      features: ['Party Makeup', 'Hair Styling', 'Venue Decoration', 'Refreshments'],
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600',
      price: 'Starting ₹15,000'
    },
    {
      id: 3,
      name: { en: 'Corporate Event', te: 'కార్పొరేట్ ఈవెంట్' },
      description: { en: 'Professional styling for corporate events', te: 'కార్పొరేట్ ఈవెంట్ల కోసం ప్రొఫెషనల్ స్టైలింగ్' },
      features: ['Professional Makeup', 'Hair Styling', 'Quick Service', 'Group Packages'],
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600',
      price: 'Contact for pricing'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="section-title">{t.title}</h1>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t.packages}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventPackages.map(pkg => (
              <div key={pkg.id} className="card group hover:scale-105 transition-transform">
                <img
                  src={pkg.image}
                  alt={pkg.name[language]}
                  className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                />
                <h3 className="text-2xl font-bold mb-2">{pkg.name[language]}</h3>
                <p className="text-gray-600 mb-4">{pkg.description[language]}</p>
                <ul className="space-y-2 mb-4">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-xl font-bold text-primary-600 mb-4">{pkg.price}</p>
                <button className="btn-primary w-full">Learn More</button>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-2xl mx-auto">
          <div className="card">
            <h2 className="text-3xl font-bold mb-6 text-center">{t.inquiry}</h2>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
                <p className="text-gray-600">We've received your inquiry. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2">{t.eventType}</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select event type</option>
                    <option value="bridal">Bridal Party</option>
                    <option value="birthday">Birthday Celebration</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">{t.eventDate}</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">{t.guestCount}</label>
                    <input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Number of guests"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2">{t.message}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="input-field"
                    rows="4"
                    placeholder="Describe your event..."
                  />
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  {t.sendInquiry}
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Event Venue</h2>
              <p className="text-gray-600 mb-4">
                Our spacious and beautifully designed venue is perfect for hosting your special occasions. 
                With modern amenities, comfortable seating, and a professional atmosphere, we ensure your 
                event is memorable.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Capacity: Up to 50 guests
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Modern facilities & decor
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional staff assistance
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Catering arrangements available
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=600"
                alt="Event Venue"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Events;
