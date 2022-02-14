import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Alert from '@mui/material/Alert'
import CityInfo from './../CityInfo'
import Weather from './../Weather'
import convertUnits from 'convert-units'

const getCityCode = (city,countryCode) => (`${city}-${countryCode}`)

// li: es un item (según tag html, tiene el role "listitem")
// renderCityAndCountry se va a convertir en una función que retorna otra función
const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
    const { city, countryCode, country } = cityAndCountry
    /* const {temperature, state} = weather; */

    return (
        <ListItem
            button
            key={getCityCode(city, countryCode)} 
            onClick={() => eventOnClickCity(city, countryCode)} >
            <Grid container 
                justify="center"
                alignItems="center"
            >
                <Grid item
                    md={8}
                    xs={12}>
                    <CityInfo city={city} country={country} />
                </Grid>
                <Grid item
                    md={4}
                    xs={12}>
                    <Weather 
                        temperature={weather && weather.temperature} 
                        state={weather && weather.state} />
                </Grid>
            </Grid>
        </ListItem>
    )
}

// cities: es un array, y en cada item tiene que tener la ciudad, pero además el country
// ul: tag html para listas no ordenadas
const CityList = ({ cities, onClickCity }) => {
    
    const [allWeather, setAllWeather] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const setWeather = async (city, countryCode) => {
            const appId = "99a917a804f3dfd1d7df144c4fb05c1c";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appId}`;

            console.log(url);
            try {
                const response = await axios.get(url)

                const { data } = response
                const temperature = Number(convertUnits(data.main.temp).from("K").to("C").toFixed(0))
                /* const state = "diferente"  */
                const state = data.weather[0].main.toLowerCase()
    
                const propName = getCityCode(city, countryCode)
                const propValue = { temperature, state } // Ej: { temperature: 10, state: "sunny" }

		        // Dado el valor pasado (objeto weather {propName: value}), se actualiza en el array si existe la propiedad, o se añade si no existe
                setAllWeather(allWeather => ({ ...allWeather, [propName]: propValue }))                
            } catch (error) {
                if(error.response) {
                    // Errores en el lado servidor
                    const { data, status } = error.response;
                    console.info("axios_error: ", data);
                    console.info("axios_error_status: ", status);
                    setError("Se produjo un error en el servidor")
                } else if(error.request) {
                    // Errores por no llegar al servidor
                    console.info("Server unavailable or not connected")
                    setError("Se produjo un error intentando conectar con el servidor")
                } else {
                    // Errores imprevistos
                    console.info("Oops! an unexpected error ocurred")
                    setError("Se produjo un error inesperado")
                }
            }

        }

        cities.forEach(({ city, countryCode }) => {
            setWeather(city, countryCode)
        });
        
    }, [cities]);

    /* const weather = {temperature: 10, state: "sunny"} */

    return (
        <div>
            {
                error && <Alert onClose={() => setError(null)} severity="error">{error}</Alert>
            }
            <List>
                {
                    cities.map(cityAndCountry => renderCityAndCountry(onClickCity)(cityAndCountry, allWeather[getCityCode(cityAndCountry.city, cityAndCountry.countryCode)]))
                }
            </List>
        </div>
    )
}

// ¿Cómo podemos mejorar esta validación?
CityList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            city: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            countryCode: PropTypes.string.isRequired
        })
    ).isRequired,
    onClickCity: PropTypes.func.isRequired,
}

export default CityList
