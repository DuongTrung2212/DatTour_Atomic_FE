import classNames from "classnames/bind";
import { useRef } from "react";
import { useEffect } from "react";
import { memo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateForm from "../UpdateForm/UpdateForm";
import styles from "./TourItem.module.scss";

const cx = classNames.bind(styles);
function TourItem({ data, ...props }) {
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

    return (
        <div className={cx("tourItem")}>
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
                <button onClick={handleClickCheck}>Check</button>
                <button onClick={handleClickUpdate}>Cập nhật</button>
                <button>Xóa</button>
            </div>
        </div>
    );
}

export default memo(TourItem);
