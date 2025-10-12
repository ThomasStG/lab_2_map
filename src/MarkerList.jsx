export default function MarkerList({ markers }) {
  if (!markers) return <div>Loading...</div>;
  return (
    <>
      <div>
        <h1>MarkerList</h1>
        <div>
          <ul>
            {markers.map((marker) => (
              <li key={marker.data.name}>
                <h2>{marker.data.name}</h2>
                <p>{marker.data.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
