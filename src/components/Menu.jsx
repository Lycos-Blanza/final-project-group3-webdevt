import React, { useEffect, useState } from 'react';
import '../css/Menu.css';

export default function Menu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/food.json')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className="menu-section" id="menu-section">
      <h2 className="menu-title">Menu</h2>
      <div className="menu-cards">
        {items.map((item, idx) => (
          <div className="menu-card" key={idx}>
            <img className="menu-card-img" src={item.FoodIMG} alt={item.Food} />
            <div className="menu-card-content">
              <div className="menu-card-name">{item.Food}</div>
              <div className="menu-card-desc">{item.FoodDes}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
