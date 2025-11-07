import React from 'react';
import '../css/Homepage.css';

const backgroundImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo61SmvNPbBwbIP13SIi4E8nHbjw4VWmEnqQ&s&fbclid=IwY2xjawN68IxleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAEwAAEed3UazLFzYqgwEmUcVIx_kwoyw_GUGckUSgiilyommE8sekY4yvVl1UhQBM4_aem_PsqhpQ2f1OdMvAzuwoHOfQ";

export default function Homepage() {
  return (
    <div className="homepage-container">
      <img
        src={backgroundImage}
        alt="Diner28"
        className="homepage-bg"
      />
      <div className="homepage-title">
        WELCOME TO DINER28
      </div>
    </div>
  );
}
