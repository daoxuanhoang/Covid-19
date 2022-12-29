import Head from "next/head";
import TableCountry from "../components/TableCountry";
import styles from "../styles/Home.module.css";
import StatisticsWorld from "../components/StatisticsWorld";

export default function Home() {
  return (
    <>
      <Head>
        <title>Vi-rút corona (Covid 19)</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <StatisticsWorld />
        <TableCountry />
      </main>
    </>
  );
}
