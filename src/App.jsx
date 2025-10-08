import { useState } from "react";
import "./App.css";

function App() {
  const [done, setDone] = useState(false);

  var button = <button onClick={() => setDone(true)}>Finish</button>;

  if (done) {
    button = <p>Done</p>;
  }

  return (
    <>
      <div id="map" style={{ height: "100vh" }}></div>
    </>
  );
}

export default App;
