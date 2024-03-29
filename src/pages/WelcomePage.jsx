import React from 'react'
import WelcomeScreen from './../components/WelcomeScreen'
import { Grid, Typography, Link } from '@mui/material'
import { WiDaySunny } from 'react-icons/wi'
import {IconContext} from 'react-icons'
import { Link as RouterLink } from 'react-router-dom'

const WelcomePage = () => {
    return (
        <WelcomeScreen>
            {/* <Link to="/main">Ir a Main</Link> */}
            <Grid container direction="column" justify="center" className="full" >
                <div className="highlight">
                    <Grid item container xs={12} justify="center" alignItems="center">
                        <Grid item>
                            <IconContext.Provider value={{size:"6em"}}>
                                <WiDaySunny />
                            </IconContext.Provider>
                        </Grid>
                        <Grid item container direction="column" justify="center" alignItems="center">
                            <Typography variant="h4" color="inherit" >Weather App</Typography>
                            <Link color="inherit" aria-label='menu' component={RouterLink} to="/main" >
                                Enter
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </WelcomeScreen>
    )
}

export default WelcomePage
