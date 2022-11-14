import Geocode from 'react-geocode';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

// set response language. Defaults to english.
Geocode.setLanguage('de');

Geocode.fromAddress('Eiffel Tower').then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  (error) => {
    console.error(error);
  },
);
