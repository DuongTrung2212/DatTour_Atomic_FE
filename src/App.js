import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import classNames from "classnames/bind";
import styles from "./App.module.scss";
import MainLayout from "./layouts/MainLayout/MainLayout";
import ResetScroll from "./ResetScroll/ResetScroll";
import Cookies from "js-cookie";
import { createContext, useState } from "react";
import Admin from "./pages/Admin";
import InforUser from "./pages/InforUser";
const cx = classNames.bind(styles);
export const UserContext = createContext();
export const AdminContext = createContext();
export const DataUserChangeContext = createContext();
function App() {
    const User = Cookies.get("access_token") ? true : false;

    const isAdmin = Cookies.get("isAdmin") ? true : false;
    const [dataUserChange, setDataUserChange] = useState(0);
    // if (Admin) publicRoutes.push({ path: "/admin", page: <Admin /> });

    // console.log(process.env.REACT_APP_API_BASE_URL);
    // console.log({ publicRoutes });
    return (
        <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
            <div className={cx("app")}>
                <AdminContext.Provider value={isAdmin}>
                    <UserContext.Provider value={User}>
                        <DataUserChangeContext.Provider
                            value={{ dataUserChange, setDataUserChange }}
                        >
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
                                    {User ? (
                                        <Route
                                            path="/infor-user"
                                            element={
                                                <MainLayout>
                                                    <InforUser />
                                                </MainLayout>
                                            }
                                        />
                                    ) : (
                                        ""
                                    )}
                                </Routes>
                            </ResetScroll>
                        </DataUserChangeContext.Provider>
                    </UserContext.Provider>
                </AdminContext.Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;
