import React, {useState, useEffect} from 'react';
import './Card.css';
import CardItem from './CardItem';
import items from './data'
import NewCard from './NewCard';
import Category from './Category';


const itemlist = ['All',  'Accomodation & Hotel','Architecture & Design','Banquet Venues','Bar & Nightlife','Culture center', 'Grocery',
 'Libraries', 'Museum & Gallerties', 'Meeting places & Auditorium','Nature & Sport', 'Restaurant & Cafe','Sauna & Wellness',
  'Sight & Attracttion','Shopping','Work & Study',  ]


const allCategories = ['All', ...new Set(items.map((item) => item.category))];

function Cards() {
  const [clickedItem, setClickedItem] = useState('') 

  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>   
      <Category items = {itemlist} clickedItem ={clickedItem} setClickedItem={setClickedItem} />   
      <br/>
      <NewCard  clickedItem = {clickedItem} />   
      <br/>
      
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='https://www.helmet.fi/download/noname/{C2DADB6A-5CCA-4317-9D8A-010C82617627}/83239'
              text='Lauantain satutuokioissa kuunnellaan satuja. Lisäksi jokaisella kerralla on pientä satuihin liittyvää oheistoimintaa - tehdään esimerkiksi sadulle äänimaisema, askarrellaan tai tutustutaan beebot -robotteihin.'
              label='Children and families'
              path='/events'
            />
            <CardItem
              src='https://www.helmet.fi/download/noname/{C5BC0B85-BDAA-48B5-A6DF-EC333CF880D2}/48598'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/sights'
            />            
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://www.helmet.fi/download/noname/{C95C4392-6C2F-4182-9182-1D9A0A376117}/87364'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/events'
            />
            <CardItem
              src='http://www.caisa.fi/instancedata/prime_product_resurssivaraus/kulke/embeds/EventPic_693092.jpg'
              text='Experience Football on Top of the Himilayan Mountains'
              label='Adventure'
              path='/events'
            />
            <CardItem
              src='https://api.hel.fi/linkedevents/media/images/Meilahti_c_Veikko_Somerpuro_.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Adrenaline'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
