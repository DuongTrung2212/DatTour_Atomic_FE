import classNames from "classnames/bind";
import styles from "./TourUserItem.module.scss";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { confirmCustom } from "../../../../components/ConfirmCustom";
import requestAxios from "../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { DataUserChangeContext } from "../../../../App";
const cx = classNames.bind(styles);
function TourUserItem({
    ticketId,
    img,
    date,
    quantity,
    price,
    name,
    status,
    ...props
}) {
    const [labelStatus, setLabelStatus] = useState("");
    const { dataUserChange, setDataUserChange } = useContext(
        DataUserChangeContext
    );
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
    }, [status]);
    const onYes = async () => {
        await requestAxios
            .delete(`datTour/${ticketId}`)
            .then((res) => {
                if ((res.data.message = "OK")) {
                    setDataUserChange(dataUserChange + 1);
                    toast.success("Đã xóa");
                } else {
                    toast.warning("Lỗi");
                }
            })
            .catch((err) => {
                toast.error("Lỗi");
            });
    };
    const handleDeleteTicket = () => {
        confirmCustom("Xác nhận xóa", "Bro muốn xóa vé thật ak", onYes);
    };
    return (
        <div className={cx("tourUserItem")}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <img
                className={cx("background")}
                src={`${process.env.REACT_APP_API_IMG_URL}${img}`}
                alt=""
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
                    {status === "CD" ? (
                        <button onClick={handleDeleteTicket}>Hủy vé</button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}

export default TourUserItem;
