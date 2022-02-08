import React from 'react'
import PropTypes from 'prop-types'
import {Typography, Grid, Skeleton} from '@mui/material'
import { IconContext } from 'react-icons'
import IconState, { validValues } from './../IconState'

const Weather = ({ temperature, state }) => {
    return (
        <Grid container item
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}>
            <IconContext.Provider value={{ size:'6em'}}>
                {
                    state ?
                    <IconState state={state} />
                    :
                    <Skeleton variant="circle" height={80} width={80}></Skeleton>
                }
            </IconContext.Provider>
            {
                temperature ?
                <Typography display="inline" variant="h2">{temperature}</Typography>
                :
                <Skeleton variant="react" height={80} width={80}></Skeleton>
            }
        </Grid>
    )
}

Weather.propTypes = {
    temperature: PropTypes.number,
    state: PropTypes.oneOf(validValues),
}

export default Weather
