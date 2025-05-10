// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Profile from "./profile";
import ListingForm from "./form"
import Listings from "./listings"
import Signin_up from "./signin_up"
import OtpVerify from "./otpverify"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/listingform" element={<ListingForm />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/newuser" element={<Signin_up />} />
        <Route path="/otpverify" element={<OtpVerify />} />
      </Routes>
    </Router>
  );
};

export default App;
