import React from 'react'
import PropTypes from 'prop-types'
import { WiDayCloudy,
    WiDaySunny,
    WiLightning,
    WiRain, 
    WiRaindrop, 
    WiSnow} from 'react-icons/wi'

export const validValues = [
        "clouds",
        "snow",
        "clear",
        "rain",
        "drizzle",
        "thunderstorm"
    ]

const stateByName = {
    clouds: WiDayCloudy,
    clear: WiDaySunny,
    rain: WiRain,
    snow: WiSnow,
    drizzle: WiRaindrop,
    thunderstorm: WiLightning
}

const IconState = ({ state }) => {
    const StateByName = stateByName[state]
    return (
        <StateByName />
    )
}

IconState.propTypes = {
    state: PropTypes.oneOf(validValues).isRequired,
}

export default IconState
