import classNames from "classnames/bind";
import styles from "./TourUserItem.module.scss";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { confirmCustom } from "../../../../components/ConfirmCustom";
import requestAxios from "../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { DataUserChangeContext } from "../../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCircleXmark,
    faPersonCircleCheck,
    faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function TourUserItem({
    sale,
    verifyPass,
    verified,
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
    const [classStatus, setClassStatus] = useState("");
    const [iconStatus, setIconStatus] = useState(null);
    const { dataUserChange, setDataUserChange } = useContext(
        DataUserChangeContext
    );

    useEffect(() => {
        switch (status) {
            case "CD":
                setLabelStatus("Đang chờ duyệt");
                setClassStatus("waitApproval");
                setIconStatus(
                    <FontAwesomeIcon
                        className={cx("icon")}
                        icon={faShieldHalved}
                    />
                );
                break;
            case "DD":
                setLabelStatus("Đã duyệt");
                setIconStatus(
                    <FontAwesomeIcon
                        className={cx("icon")}
                        icon={faPersonCircleCheck}
                    />
                );
                setClassStatus("approved");
                break;
            case "HT":
                setLabelStatus("Đã hoàn thành");
                setIconStatus(
                    <FontAwesomeIcon
                        className={cx("icon")}
                        icon={faCircleCheck}
                    />
                );
                setClassStatus("completed");
                break;
            case "TC":
                setLabelStatus("Từ chối");
                setIconStatus(
                    <FontAwesomeIcon
                        className={cx("icon")}
                        icon={faCircleXmark}
                    />
                );
                setClassStatus("refuse");
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
        if (verified)
            confirmCustom("Xác nhận xóa", "Bro muốn xóa vé thật ak", onYes);
        else verifyPass();
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
                <div className={cx("nameAndPrice")}>
                    <b className={cx("nameTour")}>{name}</b>
                    <b className={cx("priceTour")}>
                        {(
                            (price - (price * sale) / 100) *
                            quantity
                        ).toLocaleString()}
                        {" VND"}
                    </b>
                    <div className={cx("quantity")}>
                        <p className={cx("num")}>Số lượng : {quantity}</p>
                        <p className={cx("dateBook")}>Ngày đặt : {date}</p>
                    </div>
                </div>

                <b className={cx("status", classStatus)}>
                    {labelStatus} {iconStatus}
                </b>
                {status === "CD" || status === "TC" ? (
                    <button
                        className={cx("btnDeleteTicket")}
                        onClick={handleDeleteTicket}
                    >
                        Hủy vé
                    </button>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default TourUserItem;
