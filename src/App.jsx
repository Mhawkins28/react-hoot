import { Routes, Route } from "react-router";
import { useContext, useState, useEffect } from "react";

import { UserContext } from "./contexts/UserContext.jsx";
import * as hootService from "./services/hootService.js";

import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Landing from "./components/Landing/Landing.jsx";
import HootList from "./pages/HootList/HootList.jsx";

const App = () => {
  const [hoots, setHoots] = useState([]);
  const { user } = useContext(UserContext);

    useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
  
      // console log to verify
      console.log('hootsData:', hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);
  
  // return statement code here

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path="/hoots" element={<HootList hoots={hoots} />} />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
