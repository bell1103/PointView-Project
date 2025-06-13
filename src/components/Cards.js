import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Recently Uploaded Matches</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='ing-tennis.jpg' // extract thumnial from user uplaoded video/or default 
              text=' Ing vs the world  ' // user imput
              label='Singles/double' // user input 
              path='/services'//some path to where the data of the match is 
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;