import classNames from "classnames/bind";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CreateStaff from "./CreateStaff";
import styles from "./TicketManager.module.scss";
import StaffList from "./StaffList";
const cx = classNames.bind(styles);

function TicketManager() {
    return (
        <div className={cx("ticketManager")}>
            <h1>Quản lí vé</h1>
            <div>
                <span>Tour ABC</span>
                <div></div>
            </div>
        </div>
    );
}

export default TicketManager;
