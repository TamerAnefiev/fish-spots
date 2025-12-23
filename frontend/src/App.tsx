import { Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import PublicOnlyRoute from "./util/PublicOnlyRoute";
import PrivateRoute from "./util/PrivateRoute";
import City from "./components/City/City";
import Weather from "./components/Weather/Weather";
import FishSpots from "./components/FishSpots/FishSpots";
import SuggestedSpots from "./components/SuggestedSpots/SuggestedSpots";
import NotFound from "./components/NotFound/NotFound";
import FishSpotDetails from "./components/FishSpotDetails/FishSpotDetails";
import { cityRoutes } from "./util/routes";
import CookieConsent from "./components/Cookies/Consent";
import PrivacyPolicy from "./components/Policy/Policy";
import Chepareta from "./components/Chepareta/Chepareta";
import CheparetaDetails from "./components/CheparetaDetails/CheparetaDetails";
import Changelog from "./components/Changelog/Changelog";
import CatchHistory from "./components/CatchHistory/CatchHistory";
import AuthLoader from "./components/AuthLoader/AuthLoader";

function App() {
  const { loading } = useAuthContext();

  if (loading) {
    return <AuthLoader />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-zinc-300">
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city" element={<City />} />
          <Route path={cityRoutes.weather} element={<Weather />} />
          <Route path={cityRoutes.fishSpots} element={<FishSpots />} />
          <Route
            path={cityRoutes.suggestedSpots}
            element={<SuggestedSpots />}
          />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute navigateTo="/">
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/place/:region/:spotName"
            element={<FishSpotDetails />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/catch-history"
            element={
              <PrivateRoute>
                <CatchHistory />
              </PrivateRoute>
            }
          />
          <Route path="/chepareta" element={<Chepareta />} />
          <Route path="/chepareta/:seller" element={<CheparetaDetails />} />
          <Route path="/changelog" element={<Changelog />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        <CookieConsent />
      </div>
    </>
  );
}

export default App;
