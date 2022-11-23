import "./App.css";
import { RouterProvider } from "react-router-dom";
import route from "./Routes/Route/route";

function App() {
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
