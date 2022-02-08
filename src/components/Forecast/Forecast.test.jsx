import React from 'react'
import Forecast from './Forecast'
import { render, screen } from '@testing-library/react'

const forecastItemList = [
	{ hour: 18, state:"clear", temperature:17, weekDay:"Jueves" },
	{ hour: 6, state:"clouds", temperature:18, weekDay:"Viernes" },
	{ hour: 12, state:"snow", temperature:18, weekDay:"Viernes" },
	{ hour: 18, state:"drizzle", temperature:19, weekDay:"Viernes" },
	{ hour: 6, state:"clear", temperature:17, weekDay:"Sábado" },
	{ hour: 12, state:"thunderstorm", temperature:17, weekDay:"Sábado" }, 
]

test('Forecast render', async () => {
    // ¿Cómo encontrar los items?
    // findAllByTestId nos va a permitir encontrar cada item con esa marca

    render(<Forecast forecastItemList={forecastItemList} />)

    const forecastItems = await screen.findAllByTestId("forecast-item-container")

    expect(forecastItems).toHaveLength(6)
})
