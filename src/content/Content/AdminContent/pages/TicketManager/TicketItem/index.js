import classNames from "classnames/bind";
import styles from "./TicketItem.module.scss";

const cx = classNames.bind(styles);

function TicketItem({ index, tourId, userId, userName, bookDate, userSum }) {
    return (
        <div className={cx("ticketItem")}>
            <span className={cx("index")}>{index}</span>
            <span className={cx("userName")}>{userName}</span>
            <span className={cx("bookDate")}>{bookDate}</span>
            <span className={cx("userSum")}>{userSum}</span>
            <div className={cx("action")}>
                <button className={cx("update")}>Update</button>
                <button className={cx("delete")}>Delete</button>
            </div>
        </div>
    );
}

export default TicketItem;
