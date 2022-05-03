import styles from '../../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'

export default function Random({ randomDrink }) {
  return (
    <div  className={styles.container}>
      <Image className="styles.thumbnail"
        src={randomDrink.strDrinkThumb}
        alt="picture of cocktail drink"
        height='150px'
        width='100px'
      />
      <div className={styles.containerContent}>
        <h3>{randomDrink.strDrink}</h3>
        <span>{randomDrink.strAlcoholic} {randomDrink.strCategory}</span>
        <span>Ingredients:</span>
        {Object.keys(randomDrink).filter(keys => {
          return keys.includes('Ingredient')
        }).map(ingredient => {
          return <span key={ingredient}>
          <span>{
          `${randomDrink[ingredient]}: ${randomDrink[`strMeasure${ingredient.replace('strIngredient','')}`]}`}
          </span>
        </span>
        })}
      </div>
    </div>
  )
}
