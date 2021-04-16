import Head from 'next/head'
import styles from '../styles/Home.module.css'
import StakingCalculator from './Components/StakingCalculator'
import React, { useState, useRef, useEffect } from "react";
import {formatData} from './utils.js';
import Dashboard from './Components/Dashboard';


export default function Home() {

  const [currencies, setCurrencies] = useState([]);
  const [pair, setPair] = useState('');
  const [price, setPrice] = useState('0.00');
  const [pastData, setPastData] = useState({});
  const ws = useRef(null);

  let first = useRef(false);
  const url = 'https://api.pro.coinbase.com';

  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    let pairs = [];

    const apiCall = async () => {
      await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));
      console.log("pairs", pairs);
      let filtered = pairs.filter((pair) => {
        if (pair.quote_currency === "USD") {
          return pair;
        }
      });
  
      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });

      console.log(filtered);
      setCurrencies(filtered);

      first.current = true;
    };

    apiCall();
  }, []);

  useEffect(() => {
    if (!first.current) {
      console.log("returning on the first render");
      return;
    }

    console.log("running pair change");
    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);

    let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));
      console.log("data:", dataArr);
      let formattedData = formatData(dataArr);
      setPastData(formattedData);
    };

    fetchHistoricalData();

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        console.log("non ticker event", e);
        return;
      }
      if (data.product_id === pair) {
        console.log('id matches');
        setPrice(data.price);
      }
    };
  }, [pair]);

  const handleSelect = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let unsub = JSON.stringify(unsubMsg);

    ws.current.send(unsub);

    setPair(e.target.value);
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>DXchange</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <StakingCalculator /> */}
        <h1 className={styles.title}>
          Welcome to DXchange!
        </h1>
        <div className="card-container">
          <div className="card">
            <div className="card-body">
            </div>
          </div>
        </div>
      <main className={styles.main}>
        <select name="currency" value={pair} onChange={handleSelect} >
          {currencies.map((cur, idx) => {
            return <option key={idx} value={cur.id}>{cur.display_name}</option>
          })}
        </select>
        <Dashboard price={price} data={pastData} />
        <button>Buy</button><button>Sell</button>
      </main>

    </div>
  )
}
