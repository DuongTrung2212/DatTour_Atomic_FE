import classNames from "classnames/bind";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CreateStaff from "./CreateStaff";
import styles from "./StaffManager.module.scss";
import StaffList from "./StaffList";
const cx = classNames.bind(styles);

function StaffManager() {
    return (
        <div className={cx("staffManager")}>
            <h1>Quản Lí Nhân Viên</h1>
            <Tabs>
                <TabList>
                    <Tab>HD viên</Tab>
                    <Tab>Thêm HD Viên</Tab>
                </TabList>

                <TabPanel>
                    <StaffList />
                </TabPanel>
                <TabPanel>
                    <CreateStaff />
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default StaffManager;
