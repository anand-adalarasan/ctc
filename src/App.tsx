import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Connect from "./pages/Connect";
import Faith from "./pages/Faith";
import BibleStudyPrayer from "./pages/BibleStudyPrayer";
import Grow from "./pages/Grow";
import Home from "./pages/Home";
import KidsCircle from "./pages/KidsCircle";
import Pastors from "./pages/Pastors";
import Sermons from "./pages/Sermons";
import Serve from "./pages/Serve";
import SundaySchool from "./pages/SundaySchool";
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
        <Route path="/grow/bible-study-prayer" element={<BibleStudyPrayer />} />
        <Route path="/grow/sunday-school" element={<SundaySchool />} />
        <Route path="/grow/kids-circle" element={<KidsCircle />} />
        <Route path="/serve" element={<Serve />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/faith" element={<Faith />} />
        <Route path="/pastors" element={<Pastors />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}
