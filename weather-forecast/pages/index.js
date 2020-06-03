import React from 'react';
import axios from 'axios';
import Head from 'next/head';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentLocation: [],
      currentWeather: [],
      currentCondition: []
    }
  }

  async getLocationAndWeatherData() {
    const ip = (await axios.get('http://ip-api.com/json/').catch(error => alert(error))).data.query;
    const currentLocation = (await axios.get(`http://api.ipstack.com/${ip}?access_key=82c281aca5cc11fccfd3a662c2a01622`).catch(error => alert(error))).data;
    const currentWeather = (await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${currentLocation.city}&units=metric&appid=a13b7ef6a87a98ee8933dff99a45247f`).catch(error => alert(error))).data.main;
    const currentCondition = (await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${currentLocation.city}&units=metric&appid=a13b7ef6a87a98ee8933dff99a45247f`).catch(error => alert(error))).data.clouds;
    this.setState({
      currentLocation,
      currentWeather,
      currentCondition
    })
  }


  componentDidMount = () => {
    this.getLocationAndWeatherData();
  }

  render(){
    console.log(this.state.currentCondition.all);
    let latitude = Math.round(this.state.currentLocation.latitude * 10000) / 10000;
    let longitude = Math.round(this.state.currentLocation.longitude * 10000) / 10000;
    return (
      <div className="container">
        <Head>
          <title>Weather Forecast</title>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,600;0,800;1,900&display=swap" rel="preload" as="font" crossOrigin=""></link>
        </Head>
  
        <main>
          <h1 className="header">Welcome! Current weather bellow:</h1>
          <div className="weather">
          <p className="temperature">{Math.round(this.state.currentWeather.temp * 10) / 10}&deg;C</p>
            {this.state.currentCondition.all < 50 ?  <p className="condition">sunny day</p> : <p className="condition">cloudy day</p>}
            <p className="city">{this.state.currentLocation.city}, {this.state.currentLocation.country_name}</p>
            <div className="location">
            {this.state.currentLocation.latitude < 0 ? <h2 className="lat">{latitude}&deg; S</h2> : <h2 className="lat">{latitude}&deg; N</h2>}
            {this.state.currentLocation.longitude < 0 ? <h2 className="lat">{longitude}&deg; W</h2> : <h2 className="lat">{longitude}&deg; E</h2>}
          </div> 
          </div>
        </main>
  
        <footer>
          
        </footer>
  
        <style jsx>{`
          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-image: url(/bg.svg);
            background-size: cover;
            background-position: center;
          }
  
          main {
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
  
          .header{
            margin: 30vh auto 0 auto;
            color: #fff;
            font-size: 16px;
            font-weight: 400;
          }
  
          .weather{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
  
          .temperature{
            font-size: 128px;
            color: #fff;
            font-weight: 800;
            margin: auto;
            margin-bottom: 50px;
            margin-top: 40px;
          }
  
          .condition, .city{
            font-size: 16px;
            color: #fff;
            font-weight: 200;
            text-transform: uppercase;
          }

          .city{
            font-size: 20px;
          }
  
          .location{
            display: flex;
            flex-direction: row;
            font-size: 20px;
          }
  
          .lat, .lon{
            font-size: 20px;
            color: #fff;
            font-weight: 600;
            text-transform: uppercase;
            margin: 20px;
          }
  
          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
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

export default Home