import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Clouds from 'vanta/dist/vanta.clouds.min';
/* import * as THREE from '../../../node_modules/three'; */
import * as THREE from 'three'


const WelcomeScreen = ({ children }) => {
    const myRefDiv = useRef(null);
    const [vanta, setVanta] = useState(0);

    console.log("myRefDiv.current: ", myRefDiv.current)

    const effect = () => {
        console.log("effect_myRefDiv.current: ", myRefDiv.current)

        if(!vanta){
            setVanta(1);

            Clouds({
                THREE,
                el: myRefDiv.current,
                Color: 0x000000
            })
            console.info("seteamos vanta a 1")
        }
    };

    useEffect(effect, [vanta]);

    return (
        <div className="full" ref={myRefDiv}>
            {children}
        </div>
    );
};

WelcomeScreen.propTypes = {
    children: PropTypes.node
};

export default WelcomeScreen;
