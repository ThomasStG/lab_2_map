import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

// create a custom marker icon for unsaved markers
const unsavedIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "unsaved-marker",
});

function setupMap(leafletMapRef, mapRef, selectMarker, addMarker) {
  if (!mapRef.current) return;

  leafletMapRef.current = L.map(mapRef.current).setView(
    [43.035725, -71.444801],
    16,
  );

  // Create new marker
  function onMapClick(e) {
    const { lat, lng } = e.latlng;

    const newMarker = L.marker([lat, lng], { icon: unsavedIcon }).addTo(
      leafletMapRef.current,
    );

    addMarker(newMarker);

    selectMarker(newMarker);

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
  mapRef,
  selectMarker,
  leafletMapRef,
  addMarker,
}) {
  // Initialize the map after the first render
  useEffect(() => {
    if (!mapRef.current) return;
    const cleanup = setupMap(leafletMapRef, mapRef, selectMarker, addMarker);
    return cleanup;
  }, []);

  return (
    <>
      <div
        ref={mapRef}
        style={{
          height: "100vh",
          width: `100%`,
        }}
      />
    </>
  );
}
