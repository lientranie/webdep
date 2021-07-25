import React, {useState} from 'react';
import './Card.css';
import CardItem from './CardItem';
import Accordion from './Accordion';
import Search from './Search';
import Category from './Category'

const items = [
  {
      title: 'Restaurants & Cafe',
      content: 'React is font end js framework',
      src:'https://www.helmet.fi/download/noname/{C2DADB6A-5CCA-4317-9D8A-010C82617627}/83239',
      text:'Lauantain satutuokioissa kuunnellaan satuja. Lisäksi jokaisella kerralla on pientä \
       satuihin liittyvää oheistoimintaa - tehdään esimerkiksi sadulle äänimaisema, askarrellaan \
        tai tutustutaan beebot -robotteihin.',
      label:'Children and families',
      path:'/events',
  },
  {
      title: 'Hotel & Accomodation',
      content: 'React is fabulous',
      src:'https://www.helmet.fi/download/noname/{C5BC0B85-BDAA-48B5-A6DF-EC333CF880D2}/48598',
      text:'Travel through the Islands of Bali in a Private Cruise',
      label:'Luxury',
      path:'/sights',
  },
  {
      title: 'Works & Studies',
      content: 'By creating components',
      src:'https://api.hel.fi/linkedevents/media/images/Meilahti_c_Veikko_Somerpuro_.jpg',
      text:'Ride through the Sahara Desert on a guided camel tour',
      label:'Adrenaline',
      path:'/sign-up',
  },

  { title: 'MUSEUMS & GALLERIES'

  },
  
  { title: 'Sports'

  },
]

const options = [
  {
    label: 'The Color Red',
    value: 'red'
  },
  {
    label: 'The Color Green',
    value: 'green'
  },
  {
    label: 'The Color Blue',
    value: 'blue'
  }

];



function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <Category items= {items}/>

      <br/>
      <Search />
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
