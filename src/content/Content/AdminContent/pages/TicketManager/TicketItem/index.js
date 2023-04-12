import classNames from "classnames/bind";
import styles from "./TicketItem.module.scss";
import { useRef, useState } from "react";
import { useEffect } from "react";
import SelectCustom from "../../../../../../components/SelectCustom/SelectCustom";
import { variableLocal } from "../../../../../../varialeLocal";
import requestAxios from "../../../../../../api/axios";
import { useContext } from "react";
import { DaTaChangeContext } from "../../..";
import { confirmCustom } from "../../../../../../components/ConfirmCustom";
import { ToastContainer, toast } from "react-toastify";

const cx = classNames.bind(styles);

function TicketItem({
    index,
    ticketId,
    tourId,
    userId,
    userName,
    userPhone,
    bookDate,
    userSum,
    priceSum,
    status,
}) {
    const [labelStatus, setLabelStatus] = useState("");
    const [showChangeStatusForm, setShowChangeStatusForm] = useState(false);
    const { changed, setChanged } = useContext(DaTaChangeContext);
    const selectCustomRef = useRef();
    useEffect(() => {
        let handle = (e) => {
            try {
                if (!selectCustomRef.current.contains(e.target))
                    setShowChangeStatusForm(false);
            } catch {}
        };
        if (handle) document.addEventListener("mousedown", handle);
    });
    useEffect(() => {
        switch (status) {
            case "DD":
                setLabelStatus("Đã duyệt");
                break;
            case "CD":
                setLabelStatus("Đang chờ duyệt");
                break;
            // case "DD":
            //     setLabelStatus("Đang chờ duyệt");
            // break;

            default:
                break;
        }
    });
    const handleChangeStatus = () => {
        if (showChangeStatusForm) setShowChangeStatusForm(false);
        else setShowChangeStatusForm(true);
    };
    const handleChange = async (e) => {
        await requestAxios
            .patch(`datTour/${ticketId}`, {
                TinhTrang: e.value,
            })
            .then((res) => {
                if (res.data.message == "OK") {
                    setChanged(changed + 1);
                    console.log("OK");
                }
            })
            .catch((err) => {
                console.log("Err change status ticket");
            });
        setShowChangeStatusForm(false);
    };
    const onYes = async () => {
        await requestAxios
            .delete(`datTour/manager/${ticketId}`)
            .then((res) => {
                if (res.data.message == "OK") {
                    toast.success("Đã xóa");
                    setChanged(changed + 1);
                } else console.log("Loi");
            })
            .catch((err) => console.log(err));
    };
    const handleChangeDelete = () => {
        confirmCustom(
            "Xác nhận xóa",
            `Bạn có chắc chắn xóa vé này của ${userName}`,
            onYes
        );
    };

    return (
        <div className={cx("ticketItem")}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <span className={cx("index")}>{index}</span>
            <span className={cx("ticketId")}>{ticketId}</span>
            <span className={cx("userName")}>{userName}</span>
            <span className={cx("userPhone")}>{userPhone}</span>
            <span className={cx("bookDate")}>{bookDate}</span>
            <span className={cx("userSum")}>{userSum}</span>
            <span className={cx("priceSum")}>{priceSum}</span>
            <span className={cx("labelStatus")}>{labelStatus}</span>

            <div className={cx("action")}>
                <button onClick={handleChangeStatus} className={cx("update")}>
                    Update
                </button>
                <button onClick={handleChangeDelete} className={cx("delete")}>
                    Delete
                </button>
                {showChangeStatusForm ? (
                    <div ref={selectCustomRef} className={cx("selectCustom")}>
                        <SelectCustom
                            label={"Duyệt"}
                            onChange={handleChange}
                            options={variableLocal.dataStatusUpdateTour}
                        />
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default TicketItem;
