import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import translations from '../data/translations.json';
import services from '../data/services.json';
import staff from '../data/staff.json';

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const t = translations[language].booking;
  
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(location.state?.selectedService || null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('payLater');
  const [bookingRef, setBookingRef] = useState('');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleNext = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && (!selectedDate || !selectedTime)) return;
    if (step === 3 && (!customerInfo.name || !customerInfo.email || !customerInfo.phone)) return;
    
    if (step === 4) {
      const ref = 'BP' + Date.now().toString().slice(-8);
      setBookingRef(ref);
    }
    
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="section-title text-center">{t.title}</h1>
          
          <div className="flex justify-between items-center mt-8 relative">
            {[1, 2, 3, 4, 5].map((s, index) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {s}
                  </div>
                  <span className="text-xs mt-2 hidden md:block">{
                    ['Service', 'Staff', 'Time', 'Details', 'Done'][index]
                  }</span>
                </div>
                {s < 5 && (
                  <div className={`flex-1 h-1 ${step > s ? 'bg-primary-600' : 'bg-gray-300'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="card">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t.selectService}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(service => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedService?.id === service.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img src={service.image} alt={service.name[language]} className="w-16 h-16 rounded object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{service.name[language]}</h3>
                        <p className="text-sm text-gray-600">{service.description[language]}</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-primary-600 font-bold">₹{service.price}</span>
                          <span className="text-sm text-gray-500">{service.duration} {t.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t.selectStaff}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div
                  onClick={() => setSelectedStaff(null)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedStaff === null
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <h3 className="font-semibold">{t.anyStaff}</h3>
                </div>
                {staff.map(member => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedStaff(member)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedStaff?.id === member.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <h3 className="font-semibold">{language === 'en' ? member.name : member.nameTe}</h3>
                        <p className="text-sm text-gray-600">{member.role[language]}</p>
                        <p className="text-xs text-gray-500">{member.experience} exp</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4">{t.selectDateTime}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Date</label>
                  <input
                    type="date"
                    min={getMinDate()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Time</label>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                          selectedTime === time
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t.customerDetails}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">{t.name}</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">{t.email}</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">{t.phone}</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="input-field"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">{t.notes}</label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                    className="input-field"
                    rows="3"
                    placeholder="Any special requests?"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t.confirmation}</h2>
              <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                <div>
                  <span className="font-semibold">Service:</span> {selectedService?.name[language]}
                </div>
                <div>
                  <span className="font-semibold">Staff:</span> {selectedStaff ? (language === 'en' ? selectedStaff.name : selectedStaff.nameTe) : t.anyStaff}
                </div>
                <div>
                  <span className="font-semibold">Date & Time:</span> {selectedDate} at {selectedTime}
                </div>
                <div>
                  <span className="font-semibold">Customer:</span> {customerInfo.name}
                </div>
                <div>
                  <span className="font-semibold">Contact:</span> {customerInfo.phone}
                </div>
                <div className="pt-4 border-t">
                  <span className="font-semibold text-lg">Total:</span> <span className="text-2xl font-bold text-primary-600">₹{selectedService?.price}</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">{t.paymentMethod}</h3>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="payNow"
                      checked={paymentMethod === 'payNow'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>{t.payNow} (UPI / Card / Netbanking)</span>
                  </label>
                  <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="payLater"
                      checked={paymentMethod === 'payLater'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>{t.payLater}</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">{t.thankYou}</h2>
              <p className="text-xl mb-6">{t.bookingConfirmed}</p>
              <div className="bg-gray-100 p-6 rounded-lg inline-block mb-6">
                <p className="font-semibold mb-2">{t.bookingRef}</p>
                <p className="text-3xl font-bold text-primary-600">{bookingRef}</p>
              </div>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">{t.reminderText}</p>
              <button
                onClick={() => navigate('/')}
                className="btn-primary"
              >
                {t.backHome}
              </button>
            </div>
          )}

          {step < 5 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              {step > 1 && (
                <button onClick={handlePrevious} className="btn-secondary">
                  {t.previous}
                </button>
              )}
              <button
                onClick={handleNext}
                className="btn-primary ml-auto"
                disabled={
                  (step === 1 && !selectedService) ||
                  (step === 2 && (!selectedDate || !selectedTime)) ||
                  (step === 3 && (!customerInfo.name || !customerInfo.email || !customerInfo.phone))
                }
              >
                {step === 4 ? t.confirm : t.next}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;
