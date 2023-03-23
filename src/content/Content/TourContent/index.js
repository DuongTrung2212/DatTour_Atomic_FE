import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import requestAxios from "../../../api/axios";
import SlideImage from "../../../components/SlideImage";
import TourItem from "../../../components/TourItem";
import styles from "./TourContent.module.scss";
const cx = classNames.bind(styles);
function TourContent() {
    const [listTour, setListTour] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await requestAxios
                .get("tour")
                .then((res) => {
                    if (res.data.listTour) setListTour(res.data.listTour);
                })
                .catch(() => console.log("Err get all tour"));
        };
        fetchData();
    }, []);
    return (
        <div className={cx("tourContent")}>
            <SlideImage className={cx("slide")} classNameImg={cx("img")} />
            <h1>Tour</h1>
            <div className={cx("content")}>
                {listTour.map((tour, index) => {
                    return (
                        <TourItem
                            tourId={tour.MaTour}
                            key={index}
                            img={tour.HinhAnh[0]}
                            title={tour.TenTour}
                            start={tour.NgayBD}
                            end={tour.NgayKT}
                            location={tour.DiemDi}
                            price={tour.Gia}
                            sale={tour.Sale}
                        />
                    );
                })}
                <TourItem
                    tourId={"ABC"}
                    img={"ABC"}
                    title={"ABC"}
                    start={"ABC"}
                    end={"ABC"}
                    location={"ABC"}
                    price={"ABC"}
                    sale={"ABC"}
                />
            </div>
        </div>
    );
}

export default TourContent;
