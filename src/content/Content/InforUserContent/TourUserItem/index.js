import classNames from "classnames/bind";
import styles from "./TourUserItem.module.scss";
import { useState } from "react";
import { useEffect } from "react";
const cx = classNames.bind(styles);
function TourUserItem({ img, date, quantity, price, name, status, ...props }) {
    const [labelStatus, setLabelStatus] = useState("");
    useEffect(() => {
        switch (status) {
            case "CD":
                setLabelStatus("Đang chờ duyệt");
                break;
            case "DD":
                setLabelStatus("Đã duyệt");
                break;
            case "HT":
                setLabelStatus("Đã hoàn thành");
                break;

            default:
                break;
        }
    }, []);
    return (
        <div className={cx("tourUserItem")}>
            <img
                className={cx("background")}
                src={`${process.env.REACT_APP_API_IMG_URL}${img}`}
            />
            <div className={cx("content")}>
                <div>
                    <b className={cx("nameTour")}>{name}</b>
                    <b className={cx("priceTour")}>
                        {parseInt(price).toLocaleString()} VND
                    </b>
                    <div className={cx("quantity")}>
                        <p>Số lượng : {quantity}</p>
                        <p>Ngày đặt : {date}</p>
                    </div>
                    <b className={cx("status")}>{labelStatus}</b>
                    {status == "CD" ? <button>Hủy vé</button> : ""}
                </div>
            </div>
        </div>
    );
}

export default TourUserItem;
