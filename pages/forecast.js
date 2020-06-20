import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import { withRouter } from 'next/router'
import Navbar from '../components/Navbar';
import Cards from '../components/Cards';

class forecast extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      weather: [],
      isLoading: true,
      error: false
    }
  }

  async searchFilter(input) {
    let lowerCase = input.toLowerCase();
    let city = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
    const location = (await axios.get(`https://geocode.xyz/${city},?json=1,461742712774512784134x6156`)).data;
    location.error ? this.setState({isLoading: false, error: true}) : null;
    const weather = [];
    location && weather.push(await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.latt}&lon=${location.longt}&
    exclude=hourly,daily&units=metric&appid=a13b7ef6a87a98ee8933dff99a45247f`).catch(error => alert(error)))
    location && this.setState({
        weather: weather[0].data,
        isLoading: false,
        city
    })
  } 

  componentDidMount = () => {
    this.searchFilter(this.props.router.query.city);
    console.log(this.props.router.query.city);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.router.query.city !== this.props.router.query.city)  this.searchFilter(this.props.router.query.city);
}

  render(){
    return (
      <div className="container">
        <Head>
          <title>Weather Forecast</title>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,600;0,800;1,900&display=swap" rel="preload" as="font" crossOrigin=""></link>
        </Head>
    
        {this.state.isLoading ?
          <main>
            <Navbar />
            <h1 className="loading">Loading ...</h1>
          </main>
        :
          (this.state.error ? 
            <main>
              <Navbar />
              <h1 className="city">There was an error or we couldn't find your city :(. <br/>Please check if you spelled your city correct.</h1>
            </main>
            :
            <main>
              <Navbar />
              <h1 className="city">7 day weather forecast for: <b>{this.state.city}</b></h1>
              <div className="forecast">
                {this.state.weather.daily.map((day, index) => (
                  <Cards key={index} index={index} weather={day} />
                ))}
              </div>
            </main>
          )
        }   
  
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

          .loading{
            margin: 40vh auto;
            color: #fff;
          }

          .city{
            text-align: center;
            margin: 50px auto;
            color: #fff;
            font-size: 32px;
            font-weight: 400;
          }

          .forecast{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: auto;
            width: 80vw;
            height: auto;
            border-radius: 5px;
            padding: 20px;
            flex-wrap: wrap;
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

export default withRouter(forecast)