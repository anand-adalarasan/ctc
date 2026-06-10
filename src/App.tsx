import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Faith from "./pages/Faith";
import Grow from "./pages/Grow";
import Home from "./pages/Home";
import Pastors from "./pages/Pastors";
import Sermons from "./pages/Sermons";
import Serve from "./pages/Serve";
import Visit from "./pages/Visit";
import Worship from "./pages/Worship";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visit" element={<Visit />} />
        <Route path="/worship" element={<Worship />} />
        <Route path="/grow" element={<Grow />} />
        <Route path="/serve" element={<Serve />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/events" element={<Events />} />
        <Route path="/faith" element={<Faith />} />
        <Route path="/pastors" element={<Pastors />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}
