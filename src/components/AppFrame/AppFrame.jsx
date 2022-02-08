import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { WiDaySunny } from 'react-icons/wi';
import { Grid, AppBar, Toolbar, IconButton, Link, Typography } from '@mui/material';

const AppFrame = ({children}) => {
    return (
        <Grid container justify="center" >
            <AppBar position="static" >
                <Toolbar variant="dense" >
                    <IconButton color="inherit" aria-label="menu" >
                        <Link component={RouterLink} to="/main" color="inherit" aria-label='menu' >
                            <IconContext.Provider value={{size:'2em'}} >
                                <WiDaySunny />
                            </IconContext.Provider>
                        </Link>
                    </IconButton>
                    <Typography variant="h6" color="inherit" >
                        Weather App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                {children}
            </Grid>
        </Grid>
    );
};

AppFrame.propTypes = {
    children: PropTypes.node
};

export default AppFrame;
