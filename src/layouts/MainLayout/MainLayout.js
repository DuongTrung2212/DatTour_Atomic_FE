import { createContext } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../content/Footer";
import Header from "../../content/Header";

import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";
const cx = classNames.bind(styles);
export const TourContext = createContext();
function MainLayout({ children }) {
    // const [userLogin, setUserLogin] = useState(false);
    // const getUser = (user) => {
    //     setUserLogin(user);
    // };
    const tourId = useParams();
    const valueSearch = useParams();
    return (
        <div className={cx("mainLayout")}>
            <TourContext.Provider value={(tourId, valueSearch)}>
                <Header />
                {children}
                <Footer />
            </TourContext.Provider>
        </div>
    );
}

export default MainLayout;
