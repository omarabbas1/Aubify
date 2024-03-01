import React from 'react';
import Navbar from '../NavBar/NavBar';

const HomePage = () => {
  return (
   /* const handleSignOut = () => {
        / Handle sign out logic here
      };
      */
    

    <div className="home-page">
      <Navbar 
        websiteName="Aubify" 
        userName="User Name" 
       /* onSignOut={handleSignOut}     To handle the user's signout after creating a token.*/    
      />
      <h1>Suiii</h1>
    </div>
  );
};

export default HomePage;