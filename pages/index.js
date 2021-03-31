import Head from 'next/head'
import styles from '../styles/Home.module.css'
import StakingCalculator from './Components/StakingCalculator'
import React, {useState, useRef} from "react";

export default function Home() {

  const [currencies, setCurrencies] = useState([]);
  const [pair, setPair] = useState('');
  const [price, setPrice] = useState('0.00');
  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Ada or Not</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StakingCalculator />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Ada or Not!
        </h1>
      </main>
 

    </div>
  )
}
