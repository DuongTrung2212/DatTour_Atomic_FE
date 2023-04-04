import classNames from "classnames/bind";
import styles from "./AdminContent.module.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeadset,
    faRunning,
    faTicket,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import UserManager from "./pages/UserManager";
import TourManager from "./pages/TourManager";
import { memo } from "react";
import { useState } from "react";
import { useMemo } from "react";
import StaffManager from "./pages/StaffManager";

const cx = classNames.bind(styles);
const tab = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        tabList: `Khách hàng`,
        tabPanel: <UserManager />,
    },
    {
        icon: <FontAwesomeIcon icon={faHeadset} />,
        tabList: `Nhân viên`,
        tabPanel: <StaffManager />,
    },
    {
        icon: <FontAwesomeIcon icon={faRunning} />,
        tabList: `Tour`,
        tabPanel: <TourManager />,
    },
    {
        icon: <FontAwesomeIcon icon={faTicket} />,
        tabList: `Tour đã đặt`,
        tabPanel: <p>tabPanel4</p>,
    },
];

function AdminContent() {
    const [index, setIndex] = useState(0);
    const abc = (index) => {
        return index;
    };

    const testUseMemo = useMemo(() => abc(index), [index]);

    return (
        <div className={cx("adminContent")}>
            <Tabs
                defaultIndex={testUseMemo}
                onSelect={(index) => {
                    setIndex(index);
                }}
                className={cx("tabs")}
                direction="ltr"
            >
                <TabList className={cx("tabList")}>
                    {tab.map((tab, index) => {
                        return (
                            <Tab
                                selectedClassName={cx("onSelect")}
                                key={index}
                                className={cx("tab")}
                            >
                                <div className={cx("tabItem")}>
                                    <div className={cx("icon")}>{tab.icon}</div>
                                    <b className={cx("title")}>{tab.tabList}</b>
                                </div>
                            </Tab>
                        );
                    })}
                </TabList>
                {tab.map((tab, index) => {
                    return (
                        <TabPanel key={index}>
                            <div>{tab.tabPanel}</div>
                        </TabPanel>
                    );
                })}
                {/* <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel> */}
            </Tabs>
            <div className={cx("listMenu")}></div>
        </div>
    );
}

export default memo(AdminContent);
