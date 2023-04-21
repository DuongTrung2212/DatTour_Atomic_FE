import {
    faEarthAsia,
    faMoneyCheckDollar,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import requestAxios from "../../../api/axios";
import Introduce from "../../../components/Introduce";
import SlideImage from "../../../components/SlideImage";
import CategoryTour from "./CategoryTour/CategoryTour";
import styles from "./HomeContent.module.scss";
import { variableLocal } from "../../../varialeLocal";
const cx = classNames.bind(styles);

function HomeContent() {
    const [listTourTN, setListTourTN] = useState([]);
    const [listTourTQ, setListTourTQ] = useState([]);
    const [listTourBien, setListTourBien] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            await requestAxios
                .get("tour/categoryTour")
                .then((res) => {
                    if (res.data.message === "OK") {
                        if (res.data.tourTN) setListTourTN(res.data.tourTN);
                        if (res.data.tourTQ) setListTourTQ(res.data.tourTQ);
                        if (res.data.tourBien)
                            setListTourBien(res.data.tourBien);
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
                alt=""
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
