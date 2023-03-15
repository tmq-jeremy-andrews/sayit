import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import Login from "./pages/Login";

// Import Components
// Components go here

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
