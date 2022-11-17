import { useLoadScript } from '@react-google-maps/api';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import LoadingAnimation from '../components/LoadingAnimation';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export function CustomMap({ google, locations = [] }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  if (!isLoaded) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <Map
      google={google}
      containerStyle={{
        position: 'static',
        width: '100%',
        height: '100%',
      }}
      style={mapStyles}
      center={locations[0]}
      initialCenter={{ lat: 48.210033, lng: 16.363449 }}
      zoom={10}
      disableDefaultUI={true}
    >
      <Marker
        title="The marker`s title will appear as a tooltip."
        name="SOMA"
        position={{ lat: 48.210033, lng: 16.363449 }}
      />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
})(CustomMap);
