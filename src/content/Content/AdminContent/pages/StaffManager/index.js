import classNames from "classnames/bind";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CreateStaff from "./CreateStaff";
import styles from "./StaffManager.module.scss";
const cx = classNames.bind(styles);

function StaffManager() {
    return (
        <div className={cx("staffManager")}>
            <h1>StaffManager</h1>
            <Tabs>
                <TabList>
                    <Tab>HD viên</Tab>
                    <Tab>Thêm HD Viên</Tab>
                </TabList>

                <TabPanel>
                    <h3>Danh </h3>
                </TabPanel>
                <TabPanel>
                    <CreateStaff />
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default StaffManager;
