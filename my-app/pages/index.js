import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react'

export default function Home({ lastDrink }) {

  const [isHidden, setIsHidden] = useState(true);
  const [client, setClient] = useState('');
  const [drink, setDrink] = useState('');
  const [regular, setRegular] = useState(false);
  const [introduced, setIntroduced] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    localStorage.getItem('client') ? (setClient(localStorage.getItem('client'))) : null;
  }, [client])

  useEffect(() => {
    fetch(`http://localhost:3000/api/index/drink?client=${client}`)
      .then(res => res.json())
      .then(data => data.length ? setDrink(data[0].lastDrink) : null)
  }, [client])

  useEffect(() => {
    if (client && drink) {
      setRegular(true);
      setIntroduced(false);
      setFirstTime(false);
    } else if (client && !drink) {
      setIntroduced(true);
      setFirstTime(false);
    }
  }, [client, drink, isHidden])
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      localStorage.setItem('client', `${e.target.value}`);
      setClient(e.target.value);
      fetch('http://localhost:3000/api/index/client', {
        method: 'POST',
        body: JSON.stringify({client: `${e.target.value}`}),
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
    }
  }

  setTimeout(() => setIsHidden(false), 2000);

  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Personal Bartender</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Happy Hour
        </h1>
      { regular && !isHidden ? (
          <p className={styles.description}>
            Welcome back {client}, did you enjoy the {drink}?
            <div>
              <Link href='/feedback'>
            {/* will eventually change this route to something else*/}
                <span className={styles.text}>
                  Yes
                </span>
              </Link>
            </div>
              <Link href='/feedback'>
               <span className={styles.text}>
                  No
                </span>
              </Link>
          </p>
        ) : null}

      { introduced && !isHidden ? (
        <p className={styles.description}>
          Nice to meet you {client}, how can I help you?
        </p>) : null}

      { firstTime && !isHidden ? (
        <p className={styles.description}>
        To whom am I speaking to? <input
        placeholder="Enter Name Here"
        onKeyDown={(event) => handleKeyDown(event)}
        />
        </p>) : null}

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Menu &rarr;</h2>
            <p>Discover something you like</p>
          </a>

        <Link href="/recommend">
          <a className={styles.card}>
            <h2>Suggestion &rarr;</h2>
            <p>Here is what I recommend</p>
          </a>
        </Link>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Top Ten &rarr;</h2>
            <p>These are the 10 most popular drinks</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Search &rarr;</h2>
            <p>
              Already know what you want?
            </p>
          </a>
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}