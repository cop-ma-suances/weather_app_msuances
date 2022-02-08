import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, Link } from '@mui/material'
import { IconContext } from 'react-icons'
import { WiRain } from 'react-icons/wi'

const NotFoundPage = () => {
    return (
        <Grid container direction="column" justify="center" className="full" >
            <div className="highlight">
                <Grid item container xs={12} justify="center" alignItems="center">
                    <Grid item>
                        <IconContext.Provider value={{size:"6em"}}>
                            <WiRain />
                        </IconContext.Provider>
                    </Grid>
                    <Grid item container direction="column" justify="center" alignItems="center">
                        <Typography variant="h4" color="inherit" >
                            404 | La página no existe
                        </Typography>
                        <Link color="inherit" aria-label='menu' component={RouterLink} to="/" >
                            Home
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )
}

export default NotFoundPage
