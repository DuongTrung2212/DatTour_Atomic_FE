import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import classNames from "classnames/bind";
import styles from "./App.module.scss";
import MainLayout from "./layouts/MainLayout/MainLayout";
import ResetScroll from "./ResetScroll/ResetScroll";
import Cookies from "js-cookie";
import { createContext } from "react";
import Admin from "./pages/Admin";
const cx = classNames.bind(styles);
export const UserContext = createContext();
export const AdminContext = createContext();
function App() {
    const User = Cookies.get("access_token") ? true : false;
<<<<<<< HEAD
    const isAdmin = Cookies.get("isAdmin") ? true : false;
    // if (Admin) publicRoutes.push({ path: "/admin", page: <Admin /> });
=======
    const Admin = Cookies.get("isAdmin") ? true : false;
>>>>>>> e168df4e6480efc6b21e7ff30a6a6bce9655b8ac
    console.log(process.env.REACT_APP_API_BASE_URL);
    console.log({ publicRoutes });
    return (
        <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
            <div className={cx("app")}>
<<<<<<< HEAD
                <AdminContext.Provider value={isAdmin}>
=======
                <AdminContext.Provider value={Admin}>
>>>>>>> e168df4e6480efc6b21e7ff30a6a6bce9655b8ac
                    <UserContext.Provider value={User}>
                        <ResetScroll>
                            <Routes>
                                {publicRoutes.map((route, index) => {
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <MainLayout>
                                                    {route.page}
                                                </MainLayout>
                                            }
                                        />
                                    );
                                })}
<<<<<<< HEAD
                                {isAdmin ? (
                                    <Route
                                        path="/admin"
                                        element={
                                            <MainLayout>
                                                <Admin />
                                            </MainLayout>
                                        }
                                    />
                                ) : (
                                    ""
                                )}
=======
>>>>>>> e168df4e6480efc6b21e7ff30a6a6bce9655b8ac
                            </Routes>
                        </ResetScroll>
                    </UserContext.Provider>
                </AdminContext.Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;
