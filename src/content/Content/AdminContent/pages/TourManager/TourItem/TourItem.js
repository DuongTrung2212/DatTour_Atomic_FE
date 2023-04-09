import classNames from "classnames/bind";
import { useRef } from "react";
import { useEffect } from "react";
import { memo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateForm from "../UpdateForm/UpdateForm";
import styles from "./TourItem.module.scss";
import { confirmCustom } from "../../../../../../components/ConfirmCustom";
import requestAxios from "../../../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";

const cx = classNames.bind(styles);
function TourItem({ data, onDelete, ...props }) {
    const [formUpdate, setFormUpdate] = useState(false);
    let updateFormRef = useRef();
    const navigate = useNavigate();
    const handleClickCheck = () => {
        navigate(`/infor-tour/${data.MaTour}`, { replace: false });
    };
    const handleClickUpdate = () => {
        setFormUpdate(true);
    };

    useEffect(() => {
        let handle = (e) => {
            try {
                if (!updateFormRef.current.contains(e.target))
                    setFormUpdate(false);
            } catch {}
        };
        if (handle) document.addEventListener("mousedown", handle);
    });
    const onYes = async () => {
        await requestAxios
            .delete(`tour/${data.MaTour}`)
            .then((res) => {
                if (res.data.message == "OK") {
                    if (onDelete) onDelete();
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => console.log("Errr"));
    };
    const handleDelete = () => {
        confirmCustom("Xác nhận xóa", "Bạn muốn xóa e này", onYes);
    };
    return (
        <div className={cx("tourItem")}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
            />
            <p className={cx("stt")}>{props.index}</p>
            <p className={cx("tourId")}>{data.MaTour}</p>
            <p className={cx("tourName")}>{data.TenTour}</p>
            <p className={cx("soLuong")}>{data.SoLuong}</p>

            {formUpdate ? (
                <>
                    <div className={cx("updateForm")} ref={updateFormRef}>
                        <UpdateForm tourId={data.MaTour} />
                    </div>
                    <div></div>
                </>
            ) : (
                ""
            )}

            <div className={cx("action")}>
                <button className={cx("check")} onClick={handleClickCheck}>
                    Check
                </button>
                <button className={cx("update")} onClick={handleClickUpdate}>
                    Cập nhật
                </button>
                <button className={cx("del")} onClick={handleDelete}>
                    Xóa
                </button>
            </div>
        </div>
    );
}

export default memo(TourItem);
