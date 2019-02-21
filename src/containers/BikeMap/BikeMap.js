import React, { Component } from 'react';
import { Map, Marker, Tooltip, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';

export class BikeMap extends Component {
  constructor(props) {
    super(props);
  }

  markersToShow = () => {
    const cityIcon = new L.icon({
      iconSize: [15, 24.6],
      iconAnchor: [7.5, 24.6],
      popupAnchor: [1, -20],
      shadowSize: [24.6, 24.6],
      shadowUrl: require('../../images/marker-shadow.png'),
      iconUrl: require('../../images/marker-icon-violet.png')
    });

    return this.props.cities.map(network => {
      const { name, id} = network;
      const { city, country, latitude, longitude } = network.location;
      return (
        <Marker
          position={[latitude, longitude]}
          icon={cityIcon}
          key={id}
          id={id}>
          <Tooltip>{`${name}, ${city}, ${country}`}</Tooltip>
        </Marker>
      )
    });
  }

  render () {
    return (
      <div className='map-container'>
        <Map
          onresize
          id='map'
          minZoom='3'
          maxZoom='19'
          center={[30, 0]}
          zoom='3'>
          {this.markersToShow()}
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains='abcd'
            minZoom='3'
            maxZoom='19'
            ext='png'
          />
        </Map>
      </div>  
    )
  }
}

export const mapStateToProps = (state) => ({
  cities: state.cities,
  stations: state.stations,
  favorites: state.favorites,
});

export default connect(mapStateToProps)(BikeMap);

// "react": "^16.8.2",