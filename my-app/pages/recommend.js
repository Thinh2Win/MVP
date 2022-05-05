import styles from './../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import Random from './components/random.js'
import Link from 'next/link'

export default function Recommend({ randomDrink }) {
  const [isHidden, setIsHidden] = useState(true);
  const [client, setClient] = useState('');

  useEffect(() => {
    localStorage.getItem('client') ? (setClient(localStorage.getItem('client'))) : null;
  }, [client])
  useEffect(() => {
    let body = {
      client,
      lastDrink: randomDrink.strDrink
    }
    client ? (
      fetch('http://localhost:3000/api/index/drink', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    ) : null;
  }, [client, randomDrink])

  setTimeout(() => setIsHidden(false), 2500);

  return (
      <div className={styles.recContainer}>
        {!isHidden ? (
            <div className={styles.centerContainer}>
              <Random randomDrink={randomDrink}/>
              <a href='http://localhost:3000'>
                <h2 style={{color: 'white'}}>Return</h2>
              </a>
          </div>
          ) : null
        }
      </div>
  )
}

export async function getStaticProps() {
  let randomDrink = await fetch('https://thecocktaildb.com/api/json/v2/9973533/random.php')
    .then(res => res.json())
    randomDrink = randomDrink.drinks[0];
    Object.keys(randomDrink).forEach(key => {
      if (!randomDrink[key]) {
        delete randomDrink[key];
      }
    })
  return {
    props: {randomDrink}
  }
}