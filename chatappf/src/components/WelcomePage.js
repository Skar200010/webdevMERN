// WelcomePage.js
import React from 'react';
import HomePage from './HomePage';
import './WelcomePage.css'
import SaveTreesTooltip from './tree';

const WelcomePage = () => {
  return (
  <div>
   

    <HomePage/>

    <div className='c1'>
      <h2>Welcome to the App!</h2>
      <h3> please login and signup </h3>
    </div>
    <SaveTreesTooltip/>
    </div>
  );
};

export default WelcomePage;
