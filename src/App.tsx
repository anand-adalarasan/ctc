import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Connect from "./pages/Connect";
import Events from "./pages/Events";
import BibleStudyPrayer from "./pages/BibleStudyPrayer";
import Grow from "./pages/Grow";
import Home from "./pages/Home";
import KidsCircle from "./pages/KidsCircle";
import NotFound from "./pages/NotFound";
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
        <Route path="/about" element={<Navigate to="/visit#mission" replace />} />
        <Route path="/visit" element={<Visit />} />
        <Route path="/worship" element={<Worship />} />
        <Route path="/grow" element={<Grow />} />
        <Route path="/grow/bible-study-prayer" element={<BibleStudyPrayer />} />
        <Route path="/grow/sunday-school" element={<SundaySchool />} />
        <Route path="/grow/kids-circle" element={<KidsCircle />} />
        <Route path="/serve" element={<Serve />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/events" element={<Events />} />
        <Route path="/faith" element={<Navigate to="/visit#beliefs" replace />} />
        <Route path="/pastors" element={<Navigate to="/visit" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mission" element={<Navigate to="/visit#mission" replace />} />
        <Route path="/beliefs" element={<Navigate to="/visit#beliefs" replace />} />
        <Route path="/pastor" element={<Navigate to="/visit" replace />} />
        <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
        <Route path="/bible-study" element={<Navigate to="/grow/bible-study-prayer" replace />} />
        <Route path="/sunday-school" element={<Navigate to="/grow/sunday-school" replace />} />
        <Route path="/kids-circle" element={<Navigate to="/grow/kids-circle" replace />} />
        <Route path="/audio-sermons" element={<Navigate to="/sermons" replace />} />
        <Route path="/community-outreach" element={<Navigate to="/serve" replace />} />
        <Route path="/fellowship-hour" element={<Navigate to="/connect" replace />} />
        <Route path="/annual-church-retreat" element={<Navigate to="/events" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
