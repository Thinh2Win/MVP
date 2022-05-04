import styles from './../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import Random from './components/random.js'

export default function Recommend({ randomDrink }) {
  const [isHidden, setIsHidden] = useState(true);

  setTimeout(() => setIsHidden(false), 2500);

  return (
      <div className={styles.recContainer}>
        {!isHidden ? (
            <div className={styles.centerContainer}>
              <Random randomDrink={randomDrink}/>
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