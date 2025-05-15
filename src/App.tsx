import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Teams from "./pages/Teams";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
const App = () => {
  return (
    <div className="bg-amber-50 min-h-screen ">
      <BrowserRouter>
            <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/teams" element={<Teams />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
