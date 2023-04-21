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
import { memo, useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import StaffManager from "./pages/StaffManager";
import TicketManager from "./pages/TicketManager";
import { createContext } from "react";

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
        tabPanel: <TicketManager />,
    },
];
export const DaTaChangeContext = createContext();
function AdminContent() {
    const [index, setIndex] = useState(0);
    const [changed, setChanged] = useState(0);

    useEffect(() => {});
    const abc = (index) => {
        return index;
    };

    const testUseMemo = useMemo(() => abc(index), [index]);
    return (
        <DaTaChangeContext.Provider value={{ changed, setChanged }}>
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
                                        <div className={cx("icon")}>
                                            {tab.icon}
                                        </div>
                                        <b className={cx("title")}>
                                            {tab.tabList}
                                        </b>
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
                </Tabs>
                <div className={cx("listMenu")}></div>
            </div>
        </DaTaChangeContext.Provider>
    );
}

export default memo(AdminContent);
