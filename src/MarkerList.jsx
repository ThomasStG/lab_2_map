import "./MarkerList.css";

export default function MarkerList({ markers, selectMarker }) {
  if (!markers) return <div>Waiting for markers...</div>;

  // Filter out markers without data
  const markersWithData = markers.filter((marker) => marker.data);

  // If there are no markers with data, return a message
  if (markersWithData.length === 0) return <div>Waiting for markers...</div>;

  return (
    <div>
      <h1>MarkerList</h1>
      <div>
        {markersWithData.map((marker) => (
          <div
            key={marker.data.name}
            className="marker-list-item"
            onClick={() => selectMarker(marker)}
          >
            <h2>{marker.data.name}</h2>
            <p>{marker.data.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
