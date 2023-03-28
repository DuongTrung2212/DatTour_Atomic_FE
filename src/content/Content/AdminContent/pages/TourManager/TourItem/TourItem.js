import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./TourItem.module.scss";

const cx = classNames.bind(styles);
function TourItem({ data, ...props }) {
    const navigate = useNavigate();
    const handleClickCheck = () => {
        navigate(`/infor-tour/${data.MaTour}`);
    };
    return (
        <div className={cx("tourItem")}>
            <p className={cx("stt")}>{props.index}</p>
            <p className={cx("tourId")}>{data.MaTour}</p>
            <p className={cx("tourName")}>{data.TenTour}</p>
            <p className={cx("soLuong")}>{data.SoLuong}</p>
            <div className={cx("action")}>
                <button onClick={handleClickCheck}>Check</button>
                <button>Cập nhật</button>
                <button>Xóa</button>
            </div>
        </div>
    );
}

export default TourItem;
