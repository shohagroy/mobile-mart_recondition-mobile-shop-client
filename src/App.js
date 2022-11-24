import "./App.css";
import { RouterProvider } from "react-router-dom";
import route from "./Routes/Route/route";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={route}></RouterProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
