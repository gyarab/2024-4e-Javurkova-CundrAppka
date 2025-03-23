import { GoogleMap, LoadScript } from "@react-google-maps/api";
import LoadingCircle from 'components/LoadingCircle';
import "styles/MapPage.css"; // Importing the CSS

function MapPage() {
  const center = {
    lat: 49.8175, // Latitude of the Czech Republic
    lng: 15.473,  // Longitude of the Czech Republic
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";

  return (
    <div className="map-page">
      <h1 className="map-title">Explore the Czech Republic</h1>
      <div className="map-container">
        <LoadScript googleMapsApiKey={apiKey} loadingElement={<LoadingCircle />}>
          <GoogleMap mapContainerClassName="map-box" center={center} zoom={7} />
        </LoadScript>
      </div>
    </div>
  );
}

export default MapPage;
