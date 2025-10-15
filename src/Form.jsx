export default function Form({
  marker,
  addMarker,
  selectMarker,
  deleteMarker,
}) {
  // If no marker is selected, show a message
  if (!marker) return <div>Select a marker on the map</div>;

  const position = marker.getLatLng();

  // function to save the marker
  function saveMarker() {
    if (!marker || typeof marker.getLatLng !== "function") return;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    if (!name || !description) {
      alert("Please fill out all fields before saving.");
      return;
    }
    marker.data = { name, description };
    addMarker(marker);
    selectMarker(null);
  }

  // function to delete the current marker
  function deleteCurrent() {
    deleteMarker(marker);
    selectMarker(null);
  }

  return (
    <div>
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
                <textarea
                  type="text"
                  id="description"
                  defaultValue={marker.data?.description || ""}
                  rows="4"
                  cols="50"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button onClick={saveMarker}>Save Marker</button>
          <button onClick={deleteCurrent}>Delete</button>
        </div>
      </div>
    </div>
  );
}
