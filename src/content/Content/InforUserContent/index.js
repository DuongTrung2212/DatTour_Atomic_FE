import classNames from "classnames/bind";
import styles from "./InforUserContent.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faMailBulk,
    faMailForward,
    faPhone,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import InforItem from "./InforItem";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import AllTour from "./pages/AllTour";
import requestAxios from "../../../api/axios";
import { useEffect } from "react";
import { useState } from "react";
import Files from "react-files";
import VerifyPass from "./VerifyPass";
import { useRef } from "react";
const cx = classNames.bind(styles);
function InforUserContent() {
    const [user, setUser] = useState({});
    const [verified, setVerified] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const verifyPassRef = useRef();
    const fetchDataUser = async () => {
        await requestAxios
            .get("/user")
            .then((res) => {
                if (res.data.user) setUser(res.data.user);
            })
            .catch((err) => console.log("err fetch api at infor user conten"));
    };
    useEffect(() => {
        const hanlde = (e) => {
            try {
                if (!verifyPassRef.current.contains(e.target))
                    setShowVerify(false);
            } catch {}
        };
        window.addEventListener("mousedown", hanlde);
    });
    useEffect(() => {
        fetchDataUser();
    }, []);
    return (
        <div className={cx("inforUserContent")}>
            {showVerify && !verified ? (
                <div ref={verifyPassRef}>
                    <VerifyPass onSuccess={() => setVerified(true)} />
                </div>
            ) : (
                ""
            )}
            <img
                draggable={false}
                className={cx("background")}
                src={`${process.env.REACT_APP_API_IMG_URL}/${user.Img}`}
            />
            <div className={cx("header")}>
                <div className={cx("introduce")}>
                    <InforItem
                        icon={<FontAwesomeIcon icon={faUser} />}
                        text={user.TenKH}
                    />
                    <InforItem
                        icon={<FontAwesomeIcon icon={faMailBulk} />}
                        text={user.Email}
                    />
                    <InforItem
                        icon={<FontAwesomeIcon icon={faPhone} />}
                        text={user.Sdt}
                    />
                    <InforItem
                        icon={<FontAwesomeIcon icon={faPhone} />}
                        text={user.DiaChi}
                    />
                    <div className={cx("editInfor")}>
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
                </div>
                <img
                    className={cx("imgIntroduce")}
                    src={`${process.env.REACT_APP_API_IMG_URL}/${user.Img}`}
                />
                <div className={cx("avatar")}>
                    <img
                        src={`${process.env.REACT_APP_API_IMG_URL}/${user.Img}`}
                    />
                    <b>Duơng Trung</b>
                    <div
                        onClick={(e) => {
                            setShowVerify(true);
                            if (!verified) e.preventDefault();
                        }}
                        className={cx("editAvatar")}
                    >
                        <Files>
                            <FontAwesomeIcon icon={faEdit} />
                        </Files>
                    </div>
                </div>
            </div>
            <div className={cx("content")}>
                <Tabs>
                    <TabList>
                        <Tab>
                            <b>Tất cả vé</b>
                        </Tab>
                        <Tab>
                            <b>Vé đã hoàn thành</b>
                        </Tab>
                        <Tab>
                            <b>Vé đang chờ</b>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div>
                            <AllTour />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>BBBB</div>
                    </TabPanel>
                    <TabPanel>
                        <div>CCCC</div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default InforUserContent;
