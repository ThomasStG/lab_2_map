import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function setupMap(leafletMapRef, mapRef, selectMarker) {
  if (!mapRef.current) return;

  leafletMapRef.current = L.map(mapRef.current).setView(
    [43.035725, -71.444801],
    16,
  );

  function onMapClick(e) {
    let lat = e.latlng.lat;
    let lon = e.latlng.lng;
    var marker = L.marker([lat, lon]);

    console.log(marker);
    console.log(marker.getLatLng());
    selectMarker(marker);

    marker.on("click", function () {
      selectMarker(marker);
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

export default function Map({ mapRef, selectMarker, width, leafletMapRef }) {
  useEffect(() => {
    if (!mapRef.current) return;
    const cleanup = setupMap(leafletMapRef, mapRef, selectMarker);
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
