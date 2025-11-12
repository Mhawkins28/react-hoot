import { Routes, Route, useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";

import { UserContext } from "./contexts/UserContext.jsx";
import * as hootService from "./services/hootService.js";

import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Landing from "./components/Landing/Landing.jsx";
import HootList from "./pages/HootList/HootList.jsx";
import HootDetails from "./pages/HootDetails/HootDetails.jsx";
import HootForm from "./pages/HootForm/HootForm.jsx";

const App = () => {
  const [hoots, setHoots] = useState([]);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate("/hoots");
  };

 const handleDeleteHoot = async (hootId) => {
   const deletedHoot = await hootService.deleteHoot(hootId);
   // Filter state using deletedHoot._id:
   setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
   navigate("/hoots");
 };

const handleUpdateHoot = async (hootId, hootFormData) => {
  const updatedHoot = await hootService.update(hootId, hootFormData);
  setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
  navigate(`/hoots/${hootId}`);
};


  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      setHoots(hootsData);
      // console log to verify
      console.log("hootsData:", hootsData);
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
            <Route
              path="/hoots/:hootId"
              element={<HootDetails handleDeleteHoot={handleDeleteHoot} />}
            />
            <Route
              path="/hoots/new"
              element={<HootForm handleAddHoot={handleAddHoot} />}
            />
            <Route
              path="hoots/:hootId/edit"
              element={<HootForm handleUpdateHoot={handleUpdateHoot} />}
            />
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
