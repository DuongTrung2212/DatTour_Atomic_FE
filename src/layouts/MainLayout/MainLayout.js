import { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../content/Footer";
import Header from "../../content/Header";

export const TourContext = createContext();
function MainLayout({ children }) {
    const [userLogin, setUserLogin] = useState(false);
    const getUser = (user) => {
        setUserLogin(user);
    };
    const tourId = useParams();
    return (
        <div>
            <TourContext.Provider value={tourId}>
                <Header getUser={getUser} />

                {children}

                <Footer />
            </TourContext.Provider>
        </div>
    );
}

export default MainLayout;
