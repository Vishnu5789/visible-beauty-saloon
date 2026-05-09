import React, { useState } from 'react';

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = ['All', 'Bridal', 'Hair', 'Makeup', 'Events'];

  const galleryImages = [
    { id: 1, category: 'Bridal', url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600', title: 'Bridal Makeup 1' },
    { id: 2, category: 'Hair', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', title: 'Hair Coloring' },
    { id: 3, category: 'Makeup', url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600', title: 'Party Makeup' },
    { id: 4, category: 'Events', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', title: 'Bridal Party' },
    { id: 5, category: 'Bridal', url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600', title: 'Bridal Makeup 2' },
    { id: 6, category: 'Hair', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600', title: 'Hair Styling' },
    { id: 7, category: 'Makeup', url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600', title: 'Eye Makeup' },
    { id: 8, category: 'Events', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600', title: 'Birthday Event' },
    { id: 9, category: 'Bridal', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', title: 'Bridal Look' },
    { id: 10, category: 'Hair', url: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=600', title: 'Hair Treatment' },
    { id: 11, category: 'Makeup', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600', title: 'Natural Makeup' },
    { id: 12, category: 'Events', url: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=600', title: 'Corporate Event' },
  ];

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="section-title">Our Gallery</h1>
          <p className="section-subtitle">Explore our beautiful work and transformations</p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map(image => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer aspect-square"
              onClick={() => setLightboxImage(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-semibold p-4">{image.title}</p>
              </div>
            </div>
          ))}
        </div>

        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
              onClick={() => setLightboxImage(null)}
            >
              &times;
            </button>
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white text-xl font-semibold">{lightboxImage.title}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
