import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Agenda from "./components/Agenda";
import Partners from "./components/Partners";
import Team from "./components/Team";
import Footer from "./components/Footer";
import AdminApp from "./admin/AdminApp";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = () => setIsAdmin(window.location.pathname.startsWith("/admin"));
    check();
    window.addEventListener("popstate", check);
    return () => window.removeEventListener("popstate", check);
  }, []);

  if (isAdmin) return <AdminApp />;

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Agenda />
      <Partners />
      <Team />
      <Footer />
    </>
  );
}
