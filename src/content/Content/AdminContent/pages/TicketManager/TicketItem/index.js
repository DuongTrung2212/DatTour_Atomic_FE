import classNames from "classnames/bind";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
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
                <button>Update</button>
                <button>Delete</button>
            </div>
        </div>
    );
}

export default TicketItem;
