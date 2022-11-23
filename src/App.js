import "./App.css";
import { RouterProvider } from "react-router-dom";
import route from "./Routes/Route/route";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
