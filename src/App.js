import React from "react";
import Bookings from "./components/Bookings";
import { Restaurant } from "./components/Restaurant";
import "./App.css";
import Header from "./components/Header";
import {
  TouristCardsLinksAndImages,
  TouristInfoCards
} from "./components/TouristInfoCards";
import { footerContentArray, Footer } from "./components/Footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <TouristInfoCards cardContent={TouristCardsLinksAndImages} />
      <Bookings />
      <Restaurant />
      <Footer footerContent={footerContentArray} />
    </div>
  );
};

export default App;
