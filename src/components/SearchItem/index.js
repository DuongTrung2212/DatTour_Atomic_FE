import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./SearchItem.module.scss";
const cx = classNames.bind(styles);
function SearchItem(props) {
    return (
        <Link className={cx("searchItem")} to={`/infor-tour/${props.tourId}`}>
            <img
                className={cx("imgItem")}
                src={`${process.env.REACT_APP_API_IMG_URL}${props.img}`}
            />
            <div className={cx("contentItem")}>
                <FontAwesomeIcon className={cx("icon")} icon={faLocation} />
                <div className={cx("")}>
                    <p className={cx("titleItem")}>{props.title}</p>
                    <p className={cx("priceItem")}>{`${props.price} VND`}</p>
                </div>
            </div>
        </Link>
    );
}

export default SearchItem;
