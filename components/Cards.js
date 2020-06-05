import axios from 'axios';

const Cards = (props) => {

    const {weather, index} = props;
    const currentDay = new Date().getDay();
    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    //const icon = axios.get(`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);

    return(
    <div className="card">
        <p>{day[(currentDay + (index - 1)) % 7]}</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="#"/>
        <p>{Math.round(weather.temp.day * 10) / 10}&deg;C</p>

        <style jsx>{`
          .card{
            text-align: center;
            margin: auto;
            color: #fff;
            background-color: #ffffff80;
            margin: 20px;
            padding: 20px;
            box-shadow: 10px 10px 24px -2px rgba(0,0,0,.4);
            border-radius: 5px;
          }

          .card:not(:first-child){
            opacity: .9;
            background-color: #ffffff50;
          }
        `}</style>
    </div>
    )
}

export default Cards;