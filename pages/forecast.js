import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { PropTypes } from 'react'

class forecast extends React.Component {
  constructor(props){
    super(props);
    this.weatherData = this.weatherData.bind(this);
    this.state = {
      weather: []
    }
  }


  render(){
    return (
      <div className="container">
        <Head>
          <title>Weather Forecast</title>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,600;0,800;1,900&display=swap" rel="preload" as="font" crossOrigin=""></link>
        </Head>
    
          <main>
            <Navbar />
          </main>   
  
        <footer>
          <p>Designed and coded by: <b>Jakub Łasecki</b></p>
        </footer>
  
        <style jsx>{`
          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-size: cover;
            background-position: center;
            background-image: url(/bgSunny.svg);
          }

          .sunny{
            background-image: url(/bgSunny.svg);
          }

          .cloudy{
            background-image: url(/bgCloudy.svg);
          }
  
          main {
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
  
          .header{
            margin: 20vh auto 0 auto;
            color: #fff;
            font-size: 16px;
            font-weight: 400;
          }
  
          footer {
            width: 100%;
            height: 50px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            opacity: .3;
            font-weight: 200;
          }
          
        `}</style>
  
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: 'Nunito', sans-serif;
          }
  
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    )
  }
  
}

export default forecast