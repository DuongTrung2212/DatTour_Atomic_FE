import Admin from "../pages/Admin";
import Home from "../pages/Home";
import InforTour from "../pages/InforTour";
import InforUser from "../pages/InforUser";
import Tour from "../pages/Tour";

const publicRoutes = [
    { path: "/", page: <Home /> },
    { path: "/tour", page: <Tour /> },
    { path: "/infor-tour/:tourId", page: <InforTour /> },
    { path: "/infor-user", page: <InforUser /> },
<<<<<<< HEAD
    // { path: "/admin", page: <Admin /> },
=======
>>>>>>> e168df4e6480efc6b21e7ff30a6a6bce9655b8ac
];
export { publicRoutes };
