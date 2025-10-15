import Map from "./Map.jsx";
import Form from "./Form.jsx";
import MarkerList from "./MarkerList.jsx";
import { useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

export default function App() {
  let [markers, setMarkers] = useState([]);
  let [marker, setMarker] = useState(null);
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  let [display, setDisplay] = useState("");

  // create a custom marker icon for saved markers (only color changes)
  const savedIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: "saved-marker",
  });

  const selectMarker = (marker) => {
    setMarker(marker);
  };

  // function to finish adding markers and update the display
  const finishAdding = () => {
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].data == null) {
        setMarker(markers[i]);
        console.log(markers[i].getLatLng());
        alert(
          "Please fill out all fields before saving." + markers[i].getLatLng(),
        );
        return;
      }
    }
    setDisplay("hidden");
    setTimeout(() => leafletMapRef.current.invalidateSize(), 100);
  };

  // function to remove a marker from the map
  const deleteMarker = (marker) => {
    leafletMapRef.current.removeLayer(marker);
    setMarkers(markers.filter((m) => m !== marker));
  };

  // function to add a marker to the map
  const addMarker = (marker) => {
    const { lat, lng } = marker.getLatLng();

    // Check for a duplicate marker with the same location. Allowing for a 1e-6
    // difference in latitude and longitude for floating point errors
    const existingIndex = markers.findIndex((m) => {
      const pos = m.getLatLng();
      return Math.abs(pos.lat - lat) < 1e-6 && Math.abs(pos.lng - lng) < 1e-6;
    });

    if (existingIndex !== -1) {
      // Get existing matching marker
      const existing = markers[existingIndex];

      // Update data
      existing.data = marker.data;

      // Update popup
      existing
        .unbindPopup()
        .bindPopup(
          `<h1>${marker.data?.name || "Untitled"}</h1><p>${
            marker.data?.description || ""
          }</p>`,
        );

      existing.openPopup();

      // Update state
      const updatedMarkers = [...markers];
      updatedMarkers[existingIndex] = existing;
      setMarkers(updatedMarkers);
    } else {
      // Set popup to include name and description
      marker.bindPopup(
        `<h1>${marker.data?.name || "Untitled"}</h1>
          <p style="white-space: pre-line;">${marker.data?.description || ""}</p>`,
      );
      marker.on("click", () => marker.openPopup());
      console.log("Data: ", marker.data);

      // Add new marker
      leafletMapRef.current.addLayer(marker);
      setMarkers((prev) => [...prev, marker]);
    }

    // Update marker icon
    if (marker.data) {
      marker.setIcon(savedIcon);
    }
  };

  return (
    <div className="App-container">
      <Map
        mapRef={mapRef}
        leafletMapRef={leafletMapRef}
        selectMarker={selectMarker}
        addMarker={addMarker}
      />
      <div className={`right-panel ${display}`}>
        <MarkerList markers={markers} selectMarker={selectMarker} />
        <Form
          marker={marker}
          addMarker={addMarker}
          selectMarker={selectMarker}
          deleteMarker={deleteMarker}
        />
        <button onClick={finishAdding}>Finish</button>
      </div>
    </div>
  );
}
