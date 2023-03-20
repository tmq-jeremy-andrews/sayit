import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Default from "./pages/Default";
import Home from "./pages/Home";

// Import Components
// Components go here

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Default />}>
            <Route index path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
