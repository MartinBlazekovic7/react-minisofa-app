import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useContext} from "react";
import {Main} from '../styles/styles'
import Favourites from "../modules/Favourites";
import Categories from "../modules/Categories";
import styled from "styled-components";
import {ThemeContext} from "../components/Layout";

const Home: NextPage = () => {

    const Theme = useContext(ThemeContext)

  return (
      <>
          <div className={styles.container}>
              <Head>
                  <title>MiniSofa</title>
                  <meta name="description" content="MiniSofa"/>
              </Head>
          </div>
            <Favourites />
      </>
  )
}

export default Home
