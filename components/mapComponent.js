import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const mapStyle = [
  { stylers: [{ saturation: -100 }] },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#0099dd" }]
  },
  { elementType: "labels", stylers: [{ visibility: "on" }] },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#aadd55" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [{ visibility: "on" }]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text",
    stylers: [{ visibility: "on" }]
  },
  {
    featureType: "road.local",
    elementType: "labels.text",
    stylers: [{ visibility: "on" }]
  },
  {}
];

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=aaaaaa&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `130%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  let markers = props.centres.map((point, index) => {
    // random style
    return (
      <Marker
        position={{
          lat: point.fields.geo_point_2d[0],
          lng: point.fields.geo_point_2d[1]
        }}
        key={index}
        text="HELLO"
      />
    );
  });
  //let center = props.galeries.length>0 ? { lat: props.galeries[0].lat, lng: props.galeries[0].long } : props.defaultCenter
  return (
    <GoogleMap
      defaultZoom={props.defaultZoom}
      defaultCenter={props.defaultCenter}
      options={{ scrollwheel: false, styles: mapStyle }}
    >
      {markers}
    </GoogleMap>
  );
});

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.defaultProps = {
      center: {
        lat: 48.866667,
        lng: 2.333333
      },
      zoom: 14
    };
    this.showBoxMagasin = this.showBoxMagasin.bind(this);
  }

  showBoxMagasin(index) {
    let points = this.props.centres;
    if (points[index].showBox) {
      points[index].showBox = false;
    } else {
      points[index].showBox = true;
    }

    this.setState({ magasins: magasins });
  }

  render() {
    return (
      <div>
        <MyMapComponent
          defaultZoom={this.defaultProps.zoom}
          defaultCenter={this.defaultProps.center}
          centres={this.props.centres}
          props={this.props}
        />
      </div>
    );
  }
}

export default MapComponent;
