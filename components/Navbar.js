import React from 'react';
import Link from 'next/link';
import Router from 'next/router'

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchResult: [],
            searchInput: '',
            currentTime: ''
        }
    }

    searchInput = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    }

    enterPressed = (e) => {
        const code = e.keyCode || e.which;
        if(code === 13) {
            Router.push({
                pathname: '/forecast',
                query: {city: this.state.searchInput},
            });
        }
    }

    componentDidMount() {
        setInterval( () => {
          this.setState({
            currentTime : new Date().toLocaleString()
          })
        },1000);
    }

    render(){
        return(
            <div className="container">
        <main className="navbar">
            <ul>
                <li><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/"><a>Link2</a></Link></li>
                <li><Link href="/"><a>Link3</a></Link></li>
                <li><input className="search" type="text" onChange={(e) => this.searchInput(e)} onKeyPress={(e) => this.enterPressed(e)} placeholder="Type city name:"/></li>
            </ul>
            <p className="hour">{this.state.currentTime}</p>
        </main>

        <style jsx>{`
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

            .hour{
                font-size: 20px;
            }
        `}</style>
    </div>
        )
    }
};

export default Navbar;