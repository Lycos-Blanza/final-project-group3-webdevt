import React from 'react';
import '../css/Homepage.css';
import Topbar from '../components/Topbar';
import Menu from '../components/Menu';

export default function Homepage() {
  // Scroll to menu section
  const handleExploreClick = () => {
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Topbar />
      <div className="homepage-container" style={{ paddingTop: 'var(--topbar-height)' }}>
        <div className="homepage-bg">
          <div className="homepage-bg-content">
            {/* Wrap title and button in a column flex container */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="homepage-title">
                WELCOME TO<br />DINER28
              </div>
              <button
                className="homepage-explore-btn"
                onClick={handleExploreClick}
                style={{ marginTop: '2rem' }}
              >
                EXPLORE
              </button>
            </div>
          </div>
        </div>
        <div className="homepage-description">
          <div className="homepage-quote">
            <b><i>”Diner28: Where gastronomy transcends dining.”</i></b>
          </div>
          <div className="homepage-text">
            <b>Diner28</b> is an elevated culinary sanctuary where innovation meets timeless elegance. Each plate is a meticulously crafted composition, celebrating the harmony of flavors, textures, and artistry. From the ethereal amuse-bouches to signature entrées that push the boundaries of contemporary cuisine, every detail is designed to evoke awe and delight. Our sommelier-curated selections and bespoke desserts complement the immersive ambiance, transforming every meal into an unforgettable sensory journey.
          </div>
        </div>
        <Menu />
      </div>
    </>
  );
}
