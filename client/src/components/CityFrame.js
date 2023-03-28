import React from "react";
import '../styles/apps/city-frame.scss';

const CityFrame = ({cityId}) => {
    return (
        <div className='city-frame'>
            <div className='banner-container'>
              <img src={`/cities/${cityId}.jpg`}  alt="city-banner" />
            </div>
        </div>
    )
}

export default CityFrame;