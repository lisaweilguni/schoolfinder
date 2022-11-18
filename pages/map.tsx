import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import Head from 'next/head';
import { useMemo } from 'react';

export default function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const center = useMemo(() => ({ lat: 48.210033, lng: 16.363449 }), []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Map | Schoolfinder</title>
        <meta name="description" content="Map page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleMap
        mapContainerClassName="map-container"
        zoom={10}
        center={center}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
}
