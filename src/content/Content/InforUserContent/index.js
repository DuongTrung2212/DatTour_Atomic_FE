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
import { useContext, useEffect } from "react";
import { useState } from "react";
import Files from "react-files";
import VerifyPass from "./VerifyPass";
import { useRef } from "react";
import ChangeInforForm from "./ChangeInforForm";
import { DataUserChangeContext } from "../../../App";
const cx = classNames.bind(styles);
function InforUserContent() {
    const [user, setUser] = useState({});
    const [verified, setVerified] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const [showChangeForm, setShowChangeForm] = useState(false);
    const [change, setChange] = useState(0);
    const { dataUserChange, setDataUserChange } = useContext(
        DataUserChangeContext
    );
    const verifyPassRef = useRef();
    const changeInfoFormRef = useRef();
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
        const hanldeShowChangeInforForm = (e) => {
            try {
                if (!changeInfoFormRef.current.contains(e.target))
                    setShowChangeForm(false);
            } catch {}
        };
        window.addEventListener("mousedown", hanlde);
        window.addEventListener("mousedown", hanldeShowChangeInforForm);
    });
    useEffect(() => {
        fetchDataUser();
    }, [dataUserChange]);
    const hanldeChangeFile = async (files) => {
        let formData = new FormData();
        formData.append("Img", files[0]);
        await requestAxios
            .patch("user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setChange(change + 1);
                setDataUserChange(dataUserChange + 1);
                console.log("OK");
            })
            .catch((err) => console.log("Err update avatar at infor user"));
    };
    return (
        <div className={cx("inforUserContent")}>
            {showVerify && !verified ? (
                <div ref={verifyPassRef}>
                    <VerifyPass onSuccess={() => setVerified(true)} />
                </div>
            ) : (
                ""
            )}
            {showChangeForm ? (
                <div className={cx("changeInforForm")} ref={changeInfoFormRef}>
                    <ChangeInforForm />
                </div>
            ) : (
                ""
            )}
            <img
                draggable={false}
                className={cx("background")}
                src={`${process.env.REACT_APP_API_IMG_URL}${user.Img}`}
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
                    <div
                        onClick={(e) => {
                            if (!verified) e.preventDefault();
                            else setShowChangeForm(true);
                            setShowVerify(true);
                        }}
                        className={cx("editInfor")}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
                </div>
                <img
                    className={cx("imgIntroduce")}
                    src={`${process.env.REACT_APP_API_IMG_URL}${user.Img}`}
                />
                <div className={cx("avatar")}>
                    <img
                        src={`${process.env.REACT_APP_API_IMG_URL}${user.Img}`}
                    />
                    <b>Duơng Trung</b>
                    <div
                        onClick={(e) => {
                            setShowVerify(true);
                            if (!verified) e.preventDefault();
                        }}
                        className={cx("editAvatar")}
                    >
                        <Files
                            accepts={["image/*"]}
                            onChange={hanldeChangeFile}
                        >
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
