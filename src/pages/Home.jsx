import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import translations from '../data/translations.json';
import services from '../data/services.json';
import testimonials from '../data/testimonials.json';
import ServiceCard from '../components/ServiceCard';

function Home() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [isVisible, setIsVisible] = useState({});
  
  const featuredServices = services.filter(s => 
    ['hair-1', 'skin-1', 'makeup-2', 'nails-1'].includes(s.id)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <section className="relative h-[700px] flex items-center justify-center hero-gradient overflow-hidden">
        <div className="floating-shapes">
          <div className="shape w-64 h-64 bg-white rounded-full" style={{ top: '10%' }}></div>
          <div className="shape w-48 h-48 bg-white rounded-full" style={{ top: '40%' }}></div>
          <div className="shape w-72 h-72 bg-white rounded-full" style={{ top: '60%' }}></div>
          <div className="shape w-56 h-56 bg-white rounded-full" style={{ top: '20%' }}></div>
          <div className="shape w-40 h-40 bg-white rounded-full" style={{ top: '70%' }}></div>
        </div>
        
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200)' }}
        />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-2xl animate-slide-down">
            {t.hero.title}
          </h1>
          <p className="text-3xl md:text-4xl mb-4 font-serif animate-fade-in animation-delay-200">
            {t.hero.subtitle}
          </p>
          <p className="text-xl md:text-2xl mb-10 opacity-90 animate-fade-in animation-delay-400">
            {t.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-slide-up animation-delay-600">
            <Link to="/booking" className="btn-primary text-lg px-10 py-4 sparkle glow-effect">
              <span className="flex items-center justify-center">
                ✨ {t.hero.bookService}
              </span>
            </Link>
            <Link to="/events" className="btn-secondary bg-white text-lg px-10 py-4 hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 border-white">
              <span className="flex items-center justify-center">
                🎉 {t.hero.bookEvent}
              </span>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 animate-bounce-slow">
            <div className="text-center">
              <div className="text-4xl font-bold">500+</div>
              <div className="text-sm opacity-80">Happy Clients</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-4xl font-bold">10+</div>
              <div className="text-sm opacity-80">Years Experience</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-4xl font-bold">15+</div>
              <div className="text-sm opacity-80">Services</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-300 to-accent-300 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent-300 to-primary-300 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16" id="services-section" data-animate>
            <h2 className="section-title text-5xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent animate-slide-up">
              {t.services.title}
            </h2>
            <p className="section-subtitle text-xl animate-fade-in animation-delay-200">{t.services.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredServices.map((service, index) => (
              <div 
                key={service.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
          
          <div className="text-center animate-bounce-slow">
            <Link to="/services" className="btn-accent inline-block text-lg px-10 py-4 sparkle">
              <span className="flex items-center justify-center">
                {t.services.viewAll} →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #ff3d9a 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-right" id="why-choose" data-animate>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 to-purple-400 rounded-3xl blur-2xl opacity-30 animate-pulse-slow"></div>
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600"
                  alt="Salon Interior"
                  className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="animate-slide-left animation-delay-300">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Why Choose Us?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mr-4 flex-shrink-0 group-hover:animate-wiggle">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">Expert Professionals</h3>
                    <p className="text-gray-600 text-lg">Highly trained staff with years of experience</p>
                  </div>
                </div>
                <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center mr-4 flex-shrink-0 group-hover:animate-wiggle">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">Premium Products</h3>
                    <p className="text-gray-600 text-lg">Only the best quality products for your care</p>
                  </div>
                </div>
                <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center mr-4 flex-shrink-0 group-hover:animate-wiggle">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">Modern Facilities</h3>
                    <p className="text-gray-600 text-lg">Clean, comfortable and well-equipped salon</p>
                  </div>
                </div>
                <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center mr-4 flex-shrink-0 group-hover:animate-wiggle">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">Event Hosting</h3>
                    <p className="text-gray-600 text-lg">Beautiful venue for bridal parties and events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-primary-300 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-accent-300 to-transparent rounded-full blur-3xl animate-float animation-delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-slide-down" id="testimonials" data-animate>
            <h2 className="section-title text-5xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent">
              {t.testimonials.title}
            </h2>
            <p className="section-subtitle text-xl">{t.testimonials.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="card bg-gradient-to-br from-white to-pink-50 border-2 border-transparent hover:border-primary-300 transform hover:rotate-1 transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 animate-pulse animation-delay-${i * 100}" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-base mb-4 italic leading-relaxed">
                  "{testimonial.text[language]}"
                </p>
                <div className="pt-4 border-t border-primary-200">
                  <p className="font-bold text-lg text-primary-700">{language === 'en' ? testimonial.name : testimonial.nameTe}</p>
                  <p className="text-sm text-gray-600 bg-primary-100 inline-block px-3 py-1 rounded-full mt-1">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-size-200 animate-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">Ready to Transform Your Look?</h2>
            <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-3xl mx-auto">Book your appointment today and experience the best beauty services in Rajahmundry</p>
            <Link to="/booking" className="btn-secondary bg-white text-primary-600 hover:bg-gradient-to-r hover:from-white hover:to-primary-50 inline-block text-xl px-12 py-5 sparkle glow-effect transform hover:scale-110">
              <span className="flex items-center justify-center">
                ✨ Book Now & Get 10% Off
              </span>
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="animate-bounce-slow">
              <div className="text-5xl mb-2">💅</div>
              <div className="font-semibold">Nails</div>
            </div>
            <div className="animate-bounce-slow animation-delay-200">
              <div className="text-5xl mb-2">💇</div>
              <div className="font-semibold">Hair</div>
            </div>
            <div className="animate-bounce-slow animation-delay-400">
              <div className="text-5xl mb-2">💄</div>
              <div className="font-semibold">Makeup</div>
            </div>
            <div className="animate-bounce-slow animation-delay-600">
              <div className="text-5xl mb-2">✨</div>
              <div className="font-semibold">Spa</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
