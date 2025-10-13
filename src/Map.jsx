import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const unsavedIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "unsaved-marker",
});

function setupMap(leafletMapRef, mapRef, selectMarker, marker) {
  if (!mapRef.current) return;
  console.log(marker);

  leafletMapRef.current = L.map(mapRef.current).setView(
    [43.035725, -71.444801],
    16,
  );

  function onMapClick(e) {
    const { lat, lng } = e.latlng;
    console.log(e);

    // If there's an unsaved marker, just move it
    if (marker && !marker.data) {
      leafletMapRef.current.removeLayer(marker);
    }
    // Create new marker
    const newMarker = L.marker([lat, lng], { icon: unsavedIcon }).addTo(
      leafletMapRef.current,
    );

    // Select it for editing
    selectMarker(newMarker);

    // Clicking a marker will select it again for editing
    newMarker.on("click", () => {
      selectMarker(newMarker);
    });
  }

  leafletMapRef.current.on("click", onMapClick);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(leafletMapRef.current);
  return () => {
    leafletMapRef.current.remove();
  };
}

export default function Map({
  marker,
  mapRef,
  selectMarker,
  width,
  leafletMapRef,
}) {
  useEffect(() => {
    if (!mapRef.current) return;
    const cleanup = setupMap(leafletMapRef, mapRef, selectMarker, marker);
    return cleanup;
  }, []);

  return (
    <>
      <div
        ref={mapRef}
        style={{
          height: "100vh",
          width: `${width}vw`,
        }}
      />
    </>
  );
}
