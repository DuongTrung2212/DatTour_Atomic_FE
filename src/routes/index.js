import Admin from "../pages/Admin";
import Home from "../pages/Home";
import InforTour from "../pages/InforTour";
import InforUser from "../pages/InforUser";
import Tour from "../pages/Tour";

const publicRoutes = [
    { path: "/", page: <Home /> },
    { path: "/tour", page: <Tour /> },
    { path: "/infor-tour/:tourId", page: <InforTour /> },
<<<<<<< HEAD
    // { path: "/infor-user", page: <InforUser /> },
    { path: "*", page: <Home /> },
=======
    { path: "/infor-user", page: <InforUser /> },
>>>>>>> ec943a195f724da5ab7318200c4ea74cbb7965d6

    // { path: "/admin", page: <Admin /> },
];
export { publicRoutes };
