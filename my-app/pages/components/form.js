import React, {useState, useEffect} from 'react'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function Form() {

  return (
    <div className={styles.form}>
      <h3>Please tell me more</h3>
      <div className={styles.containerContent}>
        <input type="radio" value="sweet"/> Too Sweet
        <input type="radio" value="strong"/> Too Strong
        <input type="radio" value="sour"/> Too Sour
        <input placeholder='ingredients to omit' style={{margin: '20px 10px 10px 0'}}/>
        <Link href='/recommend'>
          <button style={{margin: '10px 10px 10px 0'}}>New Recommendation</button>
        </Link>
      </div>
    </div>
  )
}
