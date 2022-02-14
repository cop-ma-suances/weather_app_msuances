import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Grid, Paper} from '@mui/material'
import CityInfo from './../components/CityInfo'
import Weather from './../components/Weather'
import WeatherDetails from './../components/WeatherDetails'
import ForecastChart from './../components/ForecastChart'
import Forecast from './../components/Forecast'
import AppFrame from '../components/AppFrame'
import axios from 'axios'
import moment from 'moment'
import convertUnits from 'convert-units'
import 'moment/locale/es'


const CityPage = () => {

    const [data, setData] = useState(null)
    const [forecastItemList, setForecastItemList] = useState(null)
    const country = "Argentina"
    const state = "clouds"
    const temperature = 20
    const humidity = 80
    const wind = 5

    const {city, countryCode} = useParams();
    
    useEffect(() => {

        const getForecast = async () => {
            const appId = '99a917a804f3dfd1d7df144c4fb05c1c';
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${appId}`;

            try {
                const { data } = await axios.get(url);

                console.log("data", data)

                const daysAhead = [0,1,2,3,4,5]
                const days = daysAhead.map(d => moment().add(d, 'd'));
                const toCelsius = (temp) => Number(convertUnits(temp).from("K").to("C").toFixed(0));

                const dataAux = days.map(d => {

                    const tempObjArray = data.list.filter(item => {
                        const dayOfYear = moment.unix(item.dt).dayOfYear();

                        return dayOfYear === d.dayOfYear()
                    })

                    console.info("tmp_obj_Array: " + tempObjArray)

                    const temps = tempObjArray.map(el => el.main.temp);
                    console.info("temps: " + temps)

                    return ({
                        dayHour: d.format('ddd'),
                        min: toCelsius(Math.min(...temps)),
                        max: toCelsius(Math.max(...temps))
                    })
                });
                setData(dataAux)

                /* Estructura { hour: 18, state:"clear", temperature:17, weekDay:"Jueves" } */
                const interval = [4,8,12,16,20,24]
                const forecastItemListAux = data.list.filter((item, index) => interval.includes(index))
                    .map(item => {
                        console.info("map_data.list item: ", item)
                        return ({
                            hour: moment.unix(item.dt).hour(),
                            weekDay: moment.unix(item.dt).format('ddd'),
                            state: item.weather[0].main.toLowerCase(),
                            temperature: toCelsius(item.main.temp)
                        })
                    })
                    console.info("temps: ", forecastItemListAux)
                setForecastItemList(forecastItemListAux)

            } catch (error) {
                console.log(error)
            }
        }

        getForecast();

    }, [city, countryCode])
    


    return (
        <AppFrame>
                <Grid item container
                justify="space-around"
                direction="column"
                spacing={2}>
                    <Grid item container 
                        xs={12} 
                        justify="center"
                        alignItems="flex-end">
                        <CityInfo city={city} country={country} />
                    </Grid>
                    <Grid container item xs={12}
                        justify="center">
                        <Weather temperature={temperature} 
                            state={state} />
                        <WeatherDetails humidity={humidity} 
                            wind={wind} />
                    </Grid>
                    <Grid item>
                        {
                            data && <ForecastChart data={data} />
                        }
                    </Grid>
                    <Grid item>
                        {
                            forecastItemList && <Forecast forecastItemList={forecastItemList} />
                        }
                    </Grid>
                </Grid>
        </AppFrame>
    )
}

export default CityPage
