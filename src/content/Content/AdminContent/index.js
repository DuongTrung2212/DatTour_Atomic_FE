import classNames from "classnames/bind";
import styles from "./AdminContent.module.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserManager from "./pages/UserManager";
import TourManager from "./pages/TourManager";
import { memo } from "react";

const cx = classNames.bind(styles);
const tab = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        tabList: `Khách hàng`,
        tabPanel: <UserManager />,
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        tabList: `Nhân viên`,
        tabPanel: <p>tabPanel2</p>,
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        tabList: `Tour`,
        tabPanel: <TourManager />,
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        tabList: `Tour đã đặt`,
        tabPanel: <p>tabPanel4</p>,
    },
];
function AdminContent() {
    return (
        <div className={cx("adminContent")}>
            <Tabs className={cx("tabs")} direction="ltr">
                <TabList>
                    {tab.map((tab, index) => {
                        return (
                            <Tab
                                selectedClassName={cx("onSelect")}
                                key={index}
                                className={cx("tabList")}
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
