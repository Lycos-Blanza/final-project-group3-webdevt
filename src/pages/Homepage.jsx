import React from 'react';
import '../css/Homepage.css';
import Topbar from '../components/Topbar';

const backgroundImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo61SmvNPbBwbIP13SIi4E8nHbjw4VWmEnqQ&s&fbclid=IwY2xjawN68IxleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAEwAAEed3UazLFzYqgwEmUcVIx_kwoyw_GUGckUSgiilyommE8sekY4yvVl1UhQBM4_aem_PsqhpQ2f1OdMvAzuwoHOfQ";

export default function Homepage() {
  return (
    <>
      <Topbar />
      <div className="homepage-container" style={{ paddingTop: 'var(--topbar-height)' }}>
        <img
          src={backgroundImage}
          alt="Diner28"
          className="homepage-bg"
        />
        <div className="homepage-title">
          WELCOME TO DINER28
        </div>
        <div className="homepage-description">
          <div className="homepage-quote">
            ”Diner28: Where gastronomy transcends dining.”
          </div>
          <div className="homepage-text">
            Diner28 is an elevated culinary sanctuary where innovation meets timeless elegance. Each plate is a meticulously crafted composition, celebrating the harmony of flavors, textures, and artistry. From the ethereal amuse-bouches to signature entrées that push the boundaries of contemporary cuisine, every detail is designed to evoke awe and delight. Our sommelier-curated selections and bespoke desserts complement the immersive ambiance, transforming every meal into an unforgettable sensory journey.
          </div>
        </div>
      </div>
    </>
  );
}
