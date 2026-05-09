import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import translations from '../data/translations.json';
import services from '../data/services.json';
import ServiceCard from '../components/ServiceCard';

function Services() {
  const { language } = useContext(LanguageContext);
  const t = translations[language].services;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hair', 'Skin', 'Nails', 'Makeup', 'Special'];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="section-title">{t.title}</h1>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
