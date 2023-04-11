import Admin from "../pages/Admin";
import Home from "../pages/Home";
import InforTour from "../pages/InforTour";
import InforUser from "../pages/InforUser";
import Search from "../pages/Search";
import Tour from "../pages/Tour";

const publicRoutes = [
    { path: "/", page: <Home /> },
    { path: "/tour", page: <Tour /> },
    { path: "/infor-tour/:tourId", page: <InforTour /> },
    { path: "/search/:valueSearch", page: <Search /> },
    { path: "*", page: <Home /> },

    // { path: "/admin", page: <Admin /> },
];
export { publicRoutes };
