import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services, { ServiceDetail } from "./pages/Services";
import Events from "./pages/Events";
import Contact from "./pages/Contact";

function useHashRoute() {
  const get = () => window.location.hash.replace(/^#/, "") || "/";
  const [route, setRoute] = useState(get);
  useEffect(() => {
    const onHash = () => {
      setRoute(get());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export default function App() {
  const route = useHashRoute();

  let page;
  if (route.startsWith("/servizi/")) {
    page = <ServiceDetail slug={route.split("/servizi/")[1]} />;
  } else if (route.startsWith("/servizi")) {
    page = <Services />;
  } else if (route.startsWith("/chi-siamo")) {
    page = <About />;
  } else if (route.startsWith("/eventi")) {
    page = <Events />;
  } else if (route.startsWith("/contatti")) {
    page = <Contact />;
  } else {
    page = <Home />;
  }

  return (
    <div className="min-h-screen bg-sand-50 font-sans">
      <Header route={route} />
      <div key={route}>{page}</div>
      <Footer />
    </div>
  );
}
