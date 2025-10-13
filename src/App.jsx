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

  const savedIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: "saved-marker",
  });

  const selectMarker = (marker) => {
    setMarker(marker);
  };

  const finishAdding = () => {
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].data === null) {
        alert("You have an unsaved marker");
      }
    }
  };

  const deleteMarker = (marker) => {
    leafletMapRef.current.removeLayer(marker);
    setMarkers(markers.filter((m) => m !== marker));
  };

  const addMarker = (marker) => {
    const { lat, lng } = marker.getLatLng();

    // Check for a duplicate marker with the same location. Allowing for a 1e-6
    // difference in latitude and longitude
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
      // ➕ Add new marker
      marker.bindPopup(
        `<h1>${marker.data?.name || "Untitled"}</h1><p>${
          marker.data?.description || ""
        }</p>`,
      );
      marker.on("click", () => marker.openPopup());
      marker.setIcon(savedIcon);

      // Add new marker
      leafletMapRef.current.addLayer(marker);
      setMarkers((prev) => [...prev, marker]);
    }

    // Clear form
    setMarker(null);
  };

  return (
    <div style={{ display: "flex" }}>
      <Map
        width={50}
        mapRef={mapRef}
        leafletMapRef={leafletMapRef}
        selectMarker={selectMarker}
        marker={marker}
      />
      <div style={{ flexDirection: "column", justifyContent: "space-between" }}>
        <MarkerList markers={markers} />
        <Form
          marker={marker}
          addMarker={addMarker}
          selectMarker={selectMarker}
          finishAdding={finishAdding}
          deleteMarker={deleteMarker}
        />
      </div>
    </div>
  );
}
