import React from 'react';
import {MapContainer, TileLayer} from "react-leaflet";
import Routing from "./Routing";
import {useSelector} from "react-redux";

const Map = ({}) => {

    const sourceCity = useSelector(state => state.dataReducer.sourceCity)
    const destinationCity = useSelector(state => state.dataReducer.destinationCity)
    return (
            <MapContainer center={[51.505, -0.09]} zoom={13} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    (sourceCity && destinationCity) && <Routing sourceCity={sourceCity} destinationCity={destinationCity}/>
                }

            </MapContainer>

    );
};

export default Map;