import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NewPet from "./pages/NewPet";
import NotFound from "./pages/NotFound";
import PetDetails from "./pages/PetDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/novo" element={<NewPet />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/pets/:id" element={<PetDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
