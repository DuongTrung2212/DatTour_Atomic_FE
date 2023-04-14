import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";
import { variableLocal } from "../../varialeLocal";
const cx = classNames.bind(styles);
function NotFound() {
    return (
        <div className={cx("notFound")}>
            <img src={variableLocal.imgNotFound} />
            <span>Không tìm thấy trang</span>
        </div>
    );
}

export default NotFound;
