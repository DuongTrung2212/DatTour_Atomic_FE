import classNames from "classnames/bind";
import styles from "./InforUserContent.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faLocation,
    faMailBulk,
    faPhone,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import InforItem from "./InforItem";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import QueryTour from "./pages/QueryTour";
import requestAxios from "../../../api/axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import Files from "react-files";
import VerifyPass from "./VerifyPass";
import { useRef } from "react";
import ChangeInforForm from "./ChangeInforForm";
import { DataUserChangeContext } from "../../../App";
import { ToastContainer, toast } from "react-toastify";
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
                if (res.data.message === "OK") setUser(res.data.user);
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
    useEffect(() => {
        if (showVerify && !verified) {
            var x = window.scrollX;
            var y = window.scrollY;
            window.onscroll = function () {
                window.scrollTo(x, y);
            };
        } else {
            window.onscroll = function () {};
        }
    }, [showVerify, verified]);
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
                if (res.data.message === "OK") {
                    setChange(change + 1);
                    setDataUserChange(dataUserChange + 1);
                    console.log("OK");
                }
            })
            .catch((err) => console.log("Err update avatar at infor user"));
    };
    const showFormVerifyPass = () => {
        setShowVerify(true);
    };
    return (
        <div className={cx("inforUserContent")}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            {showVerify && !verified ? (
                <div className={cx("verifyPass")}>
                    <div ref={verifyPassRef}>
                        <VerifyPass
                            onSuccess={() => {
                                window.onscroll = function () {};
                                setVerified(true);
                            }}
                            onErr={() => {
                                toast.warning("Sai mật khẩu");
                            }}
                        />
                    </div>
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
                alt=""
                draggable={false}
                className={cx("background")}
                src={`${process.env.REACT_APP_API_IMG_URL}${user.Img}`}
            />
            <div className={cx("header")}>
                <img
                    alt=""
                    className={cx("imgIntroduce")}
                    src={`${process.env.REACT_APP_API_IMG_URL}${user.Img}`}
                />

                <div className={cx("avatar")}>
                    <img
                        alt=""
                        src={`${process.env.REACT_APP_API_IMG_URL}${user.Img}`}
                    />
                    <div className={cx("editavt")}>
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
                    <b className={cx("userName")}> {user.TenKH} </b>
                </div>
            </div>

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
                    icon={<FontAwesomeIcon icon={faLocation} />}
                    text={user.DiaChi}
                />
                <div
                    onClick={(e) => {
                        if (!verified) e.preventDefault();
                        else setShowChangeForm(true);
                        setShowVerify(true);
                    }}
                    className={cx("editInfor")}
                    // icon dong 179<FontAwesomeIcon icon={faEdit} />
                >
                    <button className={cx("editbutton")}>Sửa thông tin</button>
                </div>
            </div>

            <div>
                <hr />
            </div>
            <div className={cx("content")}>
                <Tabs>
                    <TabList className={cx("tabList")}>
                        <Tab
                            selectedClassName={cx("selectedTab")}
                            className={cx("tab")}
                        >
                            <b>Tất cả vé</b>
                        </Tab>
                        <Tab
                            selectedClassName={cx("selectedTab")}
                            className={cx("tab")}
                        >
                            <b>Vé đã hoàn thành</b>
                        </Tab>
                        <Tab
                            selectedClassName={cx("selectedTab")}
                            className={cx("tab")}
                        >
                            <b>Vé đang chờ</b>
                        </Tab>
                        <Tab
                            selectedClassName={cx("selectedTab")}
                            className={cx("tab")}
                        >
                            <b>Vé đã được duyệt</b>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div>
                            <QueryTour
                                verifyPass={showFormVerifyPass}
                                verified={verified}
                                typeQuery={"all"}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <QueryTour
                                verifyPass={showFormVerifyPass}
                                verified={verified}
                                typeQuery={"HT"}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <QueryTour
                                verifyPass={showFormVerifyPass}
                                verified={verified}
                                typeQuery={"CD"}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <QueryTour
                                verifyPass={showFormVerifyPass}
                                verified={verified}
                                typeQuery={"DD"}
                            />
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default InforUserContent;
