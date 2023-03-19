import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./Introduce.module.scss";
const cx = classNames.bind(styles);

function Introduce(props) {
    return (
        <div className={cx("introduce")}>
            <div className={cx("icon")}>{props.icon}</div>
            <div className={cx("text")}>
                <div className={cx("title")}>{props.title}</div>
                <div className={cx("content")}>{props.content}</div>
            </div>
        </div>
    );
}

export default Introduce;
