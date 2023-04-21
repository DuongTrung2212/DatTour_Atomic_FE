import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./MenuItem.module.scss";
const cx = classNames.bind(styles);
function MenuItem(props) {
    return (
        <Link to={`${props.to}`}>
            <div className={cx("menuItem")}>
                <div className={cx("icon")}>{props.icon}</div>
                <p className={cx("title")}>{props.title}</p>
            </div>
        </Link>
    );
}

export default MenuItem;
