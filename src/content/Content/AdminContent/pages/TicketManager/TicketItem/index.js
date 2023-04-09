import classNames from "classnames/bind";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CreateStaff from "./CreateStaff";
import styles from "./TicketItem.module.scss";
import StaffList from "./StaffList";
const cx = classNames.bind(styles);

function TicketItem() {
    return (
        <div className={cx("ticketItem")}>
            {/* <span className={cx("index")}>{index}</span>
            <span className={cx("tourId")}>{nameStaff}</span>
            <span className={cx("")}>{genderStaff}</span>
            <span className={cx("phoneStaff")}>{phoneStaff}</span>
            <span className={cx("emailStaff")}>{emailStaff}</span>
            <span className={cx("workDate")}>{workDate.toLocaleString()}</span>
            <div className={cx("action")}>
                <button>Update</button>
                <button onClick={handleDeleteStaff}>Delete</button>
            </div> */}
        </div>
    );
}

export default TicketItem;
