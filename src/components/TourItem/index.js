import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./TourItem.module.scss";
const cx = classNames.bind(styles);
function TourItem(props) {
    return (
        <Link preventScrollReset={true} to={"/infor-tour/" + props.tourId}>
            <div className={cx("tour")}>
                <img
                    className={cx("img")}
                    src={`${process.env.REACT_APP_API_IMG_URL}${props.img}`}
                />
                <div className={cx("content")}>
                    <h3 className={cx("title")}>{props.title}</h3>
                    <div className={cx("detail")}>
                        <div className={cx("info")}>
                            <p>
                                <b>Bắt đầu : </b>
                                {props.start}
                            </p>
                            <p>
                                <b>Kết thúc : </b>
                                {props.end}
                            </p>
                            <p>
                                <b>Địa điểm: </b>
                                {props.location}
                            </p>
                        </div>
                        <div className={cx("price")}>
                            <div className={cx(props.sale ? "block" : "")}>
                                {props.price.toLocaleString()}{" "}
                                <p className={cx("decimal")}>VND</p>
                            </div>
                            <div>
                                {props.sale ? (
                                    <>
                                        {(
                                            props.price -
                                            (props.price * props.sale) / 100
                                        ).toLocaleString()}
                                        <p className={cx("decimal")}>VND</p>
                                    </>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {props.sale ? (
                    <div className={cx("sale")}>-{props.sale} %</div>
                ) : (
                    <p></p>
                )}
            </div>
        </Link>
    );
}

export default TourItem;
