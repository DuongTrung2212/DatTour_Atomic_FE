import {
    faEarthAsia,
    faEnvelope,
    faEnvelopeOpen,
    faFileInvoiceDollar,
    faMoneyCheckDollar,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import requestAxios from "../../../api/axios";
import Input from "../../../components/Input";
import Introduce from "../../../components/Introduce";
import SlideImage from "../../../components/SlideImage";
import TourItem from "../../../components/TourItem";
import FormLogin from "../Form/FormLogin";
import CategoryTour from "./CategoryTour/CategoryTour";
import styles from "./HomeContent.module.scss";
import { variableLocal } from "../../../varialeLocal";
const cx = classNames.bind(styles);
var fadeImages = [
    {
        url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: "First Slide",
    },
    {
        url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        caption: "Second Slide",
    },
    {
        url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: "Third Slide",
    },
];
function HomeContent() {
    const [listTourTN, setListTourTN] = useState([]);
    const [listTourTQ, setListTourTQ] = useState([]);
    const [listTourBien, setListTourBien] = useState([]);
    const [listTour, setListTour] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            await requestAxios
                .get("tour/categoryTour")
                .then((res) => {
                    if (res.data.message == "OK") {
                        if (res.data.tourTN) setListTourTN(res.data.tourTN);
                        if (res.data.tourTQ) setListTourTQ(res.data.tourTQ);
                        if (res.data.tourBien)
                            setListTourBien(res.data.tourBien);
                        if (res.data) setListTour(res.data);
                    }
                })
                .catch((err) => {
                    console.log("Err");
                });
        };
        fetch();
    }, []);

    return (
        <div className={cx("homeContent")}>
            <img
                className={cx("background")}
                src={variableLocal.mainBackground}
            />
            <div className={cx("img")}>
                <SlideImage />
            </div>
            <div className={cx("introduce")}>
                <Introduce
                    icon={<FontAwesomeIcon icon={faUserCircle} />}
                    title="TƯ VẤN CHUYÊN NGHIỆP"
                    content="Hỗ trợ nhiệt tình, chăm sóc chu đáo"
                />
                <Introduce
                    icon={<FontAwesomeIcon icon={faEarthAsia} />}
                    title="TRẢI NGHIỆM ĐA DẠNG"
                    content="Chọn tour phù hợp nhất, giá cả hợp lí"
                />
                <Introduce
                    icon={<FontAwesomeIcon icon={faMoneyCheckDollar} />}
                    title="THANH TOÁN AN TOÀN"
                    content="Linh hoạt, rõ ràng, bảo mật"
                />
            </div>

            {listTourTN.length > 0 ? (
                <CategoryTour
                    listTour={listTourTN}
                    category={"Tour tự nhiên"}
                />
            ) : (
                ""
            )}
            {listTourTQ.length > 0 ? (
                <CategoryTour
                    listTour={listTourTQ}
                    category={"Tour tham quan"}
                />
            ) : (
                ""
            )}
            {listTourBien.length > 0 ? (
                <CategoryTour listTour={listTourBien} category={"Tour biển"} />
            ) : (
                ""
            )}
        </div>
    );
}

export default HomeContent;
