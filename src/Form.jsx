export default function Form({ marker, addMarker, selectMarker }) {
  if (!marker) return <div>Select a marker on the map</div>;

  const position = marker.getLatLng(); // <- just use marker directly

  function saveMarker() {
    if (!marker || typeof marker.getLatLng !== "function") return;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    marker.data = { name, description };
    addMarker(marker);
    console.log(marker.data);
    selectMarker(null);
  }

  return (
    <>
      <div>
        Location: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
      </div>
      <div style={{ width: "50vw", display: "flex", flexDirection: "column" }}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="name">Title:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="name"
                  defaultValue={marker.data?.name || ""}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="description">Description:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="description"
                  defaultValue={marker.data?.description || ""}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={saveMarker}>Save Marker</button>
      </div>
    </>
  );
}
