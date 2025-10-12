import Map from "./Map.jsx";
import Form from "./Form.jsx";
import MarkerList from "./MarkerList.jsx";
import { useState, useRef } from "react";

export default function App() {
  let [markers, setMarkers] = useState([]);
  let [marker, setMarker] = useState(null);
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);

  const selectMarker = (marker) => {
    console.log(marker.getLatLng());
    setMarker(marker);
  };

  const addMarker = (marker) => {
    marker.bindPopup(
      "<h1>" + marker.data.name + "</h1><p>" + marker.data.description + "</p>",
    );
    marker.on("click", function () {
      marker.openPopup();
    });
    leafletMapRef.current.addLayer(marker);
    setMarkers([...markers, marker]);
  };

  return (
    <div style={{ display: "flex" }}>
      <Map
        width={50}
        mapRef={mapRef}
        leafletMapRef={leafletMapRef}
        selectMarker={selectMarker}
      />
      <div style={{ flexDirection: "column", justifyContent: "space-between" }}>
        <MarkerList markers={markers} />
        <Form
          marker={marker}
          addMarker={addMarker}
          selectMarker={selectMarker}
        />
      </div>
    </div>
  );
}
