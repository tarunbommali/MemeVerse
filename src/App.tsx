import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Teams from "./pages/Teams";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import appStore from "./store/appStore";
import { Provider } from "react-redux";
import Meme from "./pages/Meme";

const App = () => {
  return (
    <Provider store={appStore}>
      <div className="bg-amber-50 min-h-screen">
        <BrowserRouter>
          <Header />

          {/* Main Content with padding to prevent overlap */}
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/meme/:id" element={<Meme />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/teams" element={<Teams />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
