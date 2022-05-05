import React from 'react'
import styles from './../styles/Home.module.css'
import Form from './components/form.js'

export default function feedback() {
  return (
    <div className={styles.fbContainer}>
      <Form/>
    </div>
  )
}
