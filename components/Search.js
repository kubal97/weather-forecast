import React from 'react';
import Router from 'next/router'

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: ''
        };
    }

    searchInput = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    }

    enterPressed = (e) => {
        const code = e.keyCode || e.which;
        if(code === 13) {
            this.props.searchFilter(this.state.searchInput);      
            Router.push('/forecast');
        }
    }

    render(){
        return (
            <div>
                <input className="search" type="text" onChange={(e) => this.searchInput(e)} onKeyPress={(e) => this.enterPressed(e)} placeholder="Type city name:"/>
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
}

export default Search;