import React from 'react';
import './MotoCatalog.css';
import Header from './Header';

const MotoCatalog = () => {
  const motos = [
    {
      id: 1,
      name: 'Yamaha YZF-R3',
      image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/146935/r3-right-side-view-10.png?isig=0&q=80&wm=3',
      price: '$5,299',
      description: 'Una moto deportiva ligera perfecta para principiantes y entusiastas.',
    },
    {
      id: 2,
      name: 'Kawasaki Ninja 400',
      image: 'https://www.kawasaki.com/content/uploads/accessories/999693776/999693776-131840017579255924.jpg?w=800&404=~/content/images/404.jpg',
      price: '$5,199',
      description: 'Moto potente y manejable, ideal para pilotos intermedios.',
    },
    {
      id: 3,
      name: 'Honda CBR500R',
      image: 'https://psmfirestorm.blob.core.windows.net/crs-images/378418/original.jpg',
      price: '$6,999',
      description: 'Diseño aerodinámico y rendimiento superior para una experiencia emocionante.',
    },
    {
      id: 4,
      name: 'Yamaha YZF-R3',
      image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/146935/r3-right-side-view-10.png?isig=0&q=80&wm=3',
      price: '$5,299',
      description: 'Una moto deportiva ligera perfecta para principiantes y entusiastas.',
    },
    {
      id: 5,
      name: 'Yamaha YZF-R3',
      image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/146935/r3-right-side-view-10.png?isig=0&q=80&wm=3',
      price: '$5,299',
      description: 'Una moto deportiva ligera perfecta para principiantes y entusiastas.',
    },
    {
      id: 6,
      name: 'Yamaha YZF-R3',
      image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/146935/r3-right-side-view-10.png?isig=0&q=80&wm=3',
      price: '$5,299',
      description: 'Una moto deportiva ligera perfecta para principiantes y entusiastas.',
    },
    {
      id: 7,
      name: 'Yamaha YZF-R3',
      image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/146935/r3-right-side-view-10.png?isig=0&q=80&wm=3',
      price: '$5,299',
      description: 'Una moto deportiva ligera perfecta para principiantes y entusiastas.',
    },
  ];

  return (
    <div className="catalog-container">
      <Header /> {/* Aquí se incluye el Header */}
      <h1>Catálogo de Motos</h1>
      <div className="moto-cards">
        {motos.map((moto) => (
          <div key={moto.id} className="moto-card">
            <img src={moto.image} alt={moto.name} className="moto-image" />
            <h2 className="moto-name">{moto.name}</h2>
            <p className="moto-price">{moto.price}</p>
            <p className="moto-description">{moto.description}</p>
            <button className="moto-button">Ver detalles</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotoCatalog;