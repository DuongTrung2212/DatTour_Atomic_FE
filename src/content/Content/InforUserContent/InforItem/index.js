import classNames from "classnames/bind";
import styles from "./InforItem.module.scss";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const cx = classNames.bind(styles);
function InforItem({ icon, text }) {
    return (
        <div className={cx("infoItem")}>
            <div>{icon}</div>
            <p>{text}</p>
        </div>
    );
}

export default InforItem;
