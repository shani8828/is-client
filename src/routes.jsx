import { Routes, Route } from "react-router-dom";
import Cameras from "./pages/Cameras";
import KnownPeople from "./pages/KnownPeople";
import Events from "./pages/Events";
import AddCamera from "./components/cameras/AddCamera";
import LiveDashboard from "./components/LiveDashboard";
import HomePage from "./pages/Index";
import About from "./pages/About";
import Team from "./pages/Team";
import Layout from "./components/Layout";
import NoPage from "./pages/NoPage";

export default function RoutesConfig() {
  return (
    <main className="min-h-[80vh]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/add-camera" element={<AddCamera />} />
          <Route path="/people" element={<KnownPeople />} />
          <Route path="/events" element={<Events />} />
          <Route path="/dashboard" element={<LiveDashboard />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </main>
  );
}
