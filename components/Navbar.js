import React from 'react';
import Link from 'next/link';
import Search from './Search';
import axios from 'axios';
import { PropTypes } from 'react'

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.passProps = this.passProps.bind(this);
        this.state = {
            searchResult: [],
            weather: [],
            currentTime: ''
        }
    }

    async searchFilter(input) {
        let lowerCase = input.toLowerCase();
        let city = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
        const location = (await axios.get(`https://geocode.xyz/${city},?json=1,461742712774512784134x6156`).catch(error => alert(error))).data;
        const weather = [];
        location && weather.push(await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.latt}&lon=${location.longt}&
        exclude=hourly,daily&appid=a13b7ef6a87a98ee8933dff99a45247f`).catch(error => alert(error)))
        location && this.setState({
            weather
        })
    } 

    componentDidMount() {
        setInterval( () => {
          this.setState({
            currentTime : new Date().toLocaleString()
          })
        },1000);
    }

    render(){
        this.state.longt ? console.log(this.state.longt.longt) : null;
        return(
            <div className="container">
        <main className="navbar">
            <ul>
                <li><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/"><a>Link2</a></Link></li>
                <li><Link href="/"><a>Link3</a></Link></li>
                <li><Search searchFilter={e => this.searchFilter(e)}/></li>
            </ul>
            <p className="hour">{this.state.currentTime}</p>
        </main>

        <style jsx>{`
            .container{

            }

            .navbar{
                display: flex;
                flex-direction: row;
                width: auto;
                margin: 10px 50px;
                justify-content: space-between;
                color: #fff;
            }

            ul{
                display: flex;
                flex-direction: row;
                list-style-type: none;
            }

            li{
                width: 20px;
                height: auto;
                margin: auto 50px;
                color: #fff;
            }

            a, a:visited{
                color: #fff;
                text-decoration: none;
                padding:  10px;
            }

            .search{
                width: 300px;
                height: 30px;
                margin: auto;
                border-radius: 5px;
                background-color: transparent;
                border: 1px solid #fff;
                padding: 10px;
                color: #fff;
            }

            .search::placeholder{
                color: #fff;
            }

            .search:focus, input[type="text"]{
                border: 1px solid #fff;
                outline: none;
            }

            .hour{
                font-size: 20px;
            }
        `}</style>
    </div>
        )
    }
};

export default Navbar;