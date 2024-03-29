import React from 'react'
import { useHistory } from 'react-router-dom'
import CityList from './../components/CityList'
import AppFrame from '../components/AppFrame'
import { Paper } from '@mui/material'

const cities = [
    { city: "Buenos Aires", country: "Argentina", countryCode: "AR"},
    { city: "Bogotá", country: "Colombia", countryCode: "CO"},
    { city: "Madrid", country: "España", countryCode: "ES"},
    { city: "Tomtor", country: "Rusia", countryCode: "RU"}
]



const MainPage = () => {
    const history = useHistory()

    const onClickHandler = (city, countryCode) => {
        // history.push permite alterar la URL por programación
        console.log("cityClicc (city)=> ", city)
        console.log("cityClicc (country)=> ", countryCode)

        history.push(`/city/${countryCode}/${city}`)
    }

    return (
        <AppFrame>
            <Paper elevation={3} >
            <CityList 
                cities={cities} 
                onClickCity={onClickHandler} />
            </Paper>
        </AppFrame>
    )
}

export default MainPage
