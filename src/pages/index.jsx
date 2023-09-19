import { Route, Routes } from "react-router-dom";
// import ScrollToTop from "./../shared/components/index";

// Import pages
import { Home } from "./home/Home";
import { Login } from "./login/Login";
import { Register } from "./register/Register";
import { Profile } from "./profile/Profile";
import Jobs from "./jobs/Jobs";
import Traveling from "./traveling/Traveling";

const Routings = () => {
  return (
    <>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="traveling" element={<Traveling />} />
      </Routes>
    </>
  );
};

export default Routings;
