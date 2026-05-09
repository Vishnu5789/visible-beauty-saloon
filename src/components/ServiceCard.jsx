import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import translations from '../data/translations.json';

function ServiceCard({ service }) {
  const { language } = useContext(LanguageContext);
  const t = translations[language].services;

  return (
    <div className="card group hover:scale-105 transition-transform duration-500 border-2 border-transparent hover:border-primary-300 bg-gradient-to-br from-white to-primary-50">
      <div className="relative overflow-hidden rounded-xl mb-4 shadow-lg">
        <img
          src={service.image}
          alt={service.name[language]}
          className="w-full h-48 object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
          ₹{service.price}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">{service.name[language]}</h3>
          <span className="text-xs text-white bg-gradient-to-r from-primary-600 to-accent-600 px-3 py-1 rounded-full font-semibold">
            {service.category}
          </span>
        </div>
        
        <p className="text-base text-gray-600 leading-relaxed">{service.description[language]}</p>
        
        <div className="flex items-center text-sm text-gray-500 pt-2 bg-primary-50 px-3 py-2 rounded-lg">
          <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">{service.duration} {t.mins}</span>
        </div>
        
        <Link
          to="/booking"
          state={{ selectedService: service }}
          className="btn-primary w-full text-center mt-4 block sparkle"
        >
          <span className="flex items-center justify-center">
            {t.bookNow} →
          </span>
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
