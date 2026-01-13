import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navigation from "@/components/Navigation/Navigation";
import Home from "@/pages/Home";
import City from "@/pages/City";
import Weather from "@/pages/Weather";
import FishSpots from "@/pages/FishSpots";
import SuggestedSpots from "@/pages/SuggestedSpots";
import Login from "@/pages/Login";
import FishSpotDetails from "@/pages/FishSpotDetails";
import PrivacyPolicy from "@/pages/Policy";
import CatchHistory from "@/pages/CatchHistory";
import Chepareta from "@/pages/Chepareta";
import CheparetaDetails from "@/pages/CheparetaDetails";
import Changelog from "@/pages/Changelog";
import NotFound from "@/pages/NotFound";
import Footer from "@/components/Footer/Footer";
import AuthGuard from "@/guards/AuthGuard";
import { cityRoutes } from "@/util/routes";
import CookieConsent from "@/components/Cookies/Consent";
import AuthLoader from "@/components/AuthLoader/AuthLoader";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <AuthLoader />;
  }

  return (
    <>
      <div className="bg-background flex min-h-screen flex-col">
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
              <AuthGuard redirectTo="/" guestOnly>
                <Login />
              </AuthGuard>
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
              <AuthGuard redirectTo="/login" privateRoute>
                <CatchHistory />
              </AuthGuard>
            }
          />
          <Route path="/chepareta" element={<Chepareta />} />
          <Route path="/chepareta/:sellerSlug" element={<CheparetaDetails />} />
          <Route path="/changelog" element={<Changelog />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        <CookieConsent />

        <Toaster position="bottom-right" richColors expand />
      </div>
    </>
  );
}

export default App;
