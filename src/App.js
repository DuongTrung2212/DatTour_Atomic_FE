import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import classNames from "classnames/bind";
import styles from "./App.module.scss";
import MainLayout from "./layouts/MainLayout/MainLayout";
import ResetScroll from "./ResetScroll/ResetScroll";
import Cookies from "js-cookie";
import { createContext } from "react";
const cx = classNames.bind(styles);
export const UserContext = createContext();
function App() {
    const User = Cookies.get("access_token") ? true : false;
    console.log(process.env.REACT_APP_API_BASE_URL);
    console.log({ User });
    return (
        <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
            <div className={cx("app")}>
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
                        </Routes>
                    </ResetScroll>
                </UserContext.Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;
