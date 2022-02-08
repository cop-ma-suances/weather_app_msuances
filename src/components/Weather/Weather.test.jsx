import React from 'react'
import Weather from './Weather'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// TDD
test("Weather render sunny", async () => {
    // AAA Arrange Act Assert
    render(<Weather temperature={10} state="clear" />)

    const temp = await screen.findByRole("heading")

    expect(temp).toHaveTextContent("10")
})