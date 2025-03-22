import { GoogleMap, LoadScript } from "@react-google-maps/api"
import LoadingCircle from 'components/LoadingCircle'

function MapPage() {

  const center = {
    lat: 49.8175, // Latitude
    lng: 15.473,  // Longitude
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";
  return (
    <>
      <LoadScript googleMapsApiKey={apiKey} loadingElement={<LoadingCircle/>}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
      >
        {/* You can add markers or other components here */}
      </GoogleMap>
      </LoadScript>
    </>
  )
}

export default MapPage