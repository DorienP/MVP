import Head from 'next/head'
import styles from '../styles/Home.module.css'
import StakingCalculator from './Components/StakingCalculator'

export default function Home() {
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
