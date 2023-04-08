import classNames from "classnames/bind";
import { memo, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import requestAxios from "../../../../../../api/axios";
import styles from "./UserItem.module.scss";
import { confirmCustom } from "../../../../../../components/ConfirmCustom";
const cx = classNames.bind(styles);
function UserItem({ data, ...props }) {
    const [showUser, setShowUser] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const showUserRef = useRef();
    useEffect(() => {
        // if (props.getUser) props.getUser(userLogin);
        let handle = (e) => {
            try {
                if (!showUserRef.current.contains(e.target)) setShowUser(false);
            } catch {}
        };
        if (handle) document.addEventListener("mousedown", handle);
    });

    const handleClickShowUser = async () => {
        setShowUser(true);
        const fetchData = async () => {
            await requestAxios
                .get(`user/${props.userId}`)
                .then((res) => {
                    if (res.data.message == "OK") {
                        setDataUser(res.data.user);
                    }
                })
                .catch((err) => console.log("err get user"));
        };
        fetchData();
    };
    const onYes = async () => {
        await requestAxios
            .delete(`user/${props.userId}`)
            .then((res) => {
                if (res.data.message == "OK") {
                    if (props.onDelete) props.onDelete();
                    toast.success(res.data.message);
                }
            })
            .catch((err) => toast.error("Lỗi rồi bạn"));
    };
    const handleClickDeleteUser = async () => {
        confirmCustom("Xác nhận xóa", "Bạn muốn xóa người dùng", onYes);
    };
    return (
        <div className={cx("userItem")}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
            />
            <p className={cx("stt")}>{props.index}</p>
            <img
                className={cx("img")}
                src={`${process.env.REACT_APP_API_IMG_URL}${data.Img}`}
            />
            <p className={cx("name")}>{data.TenKH}</p>
            <p className={cx("sdt")}>{data.Sdt}</p>
            <p className={cx("email")}>{data.Email}</p>
            <div className={cx("action")}>
                <button onClick={handleClickShowUser} className={cx("edit")}>
                    Check
                </button>
                <button
                    onClick={handleClickDeleteUser}
                    className={cx("delete")}
                >
                    Delete
                </button>
            </div>
            {showUser ? (
                <div ref={showUserRef} className={cx("showUser")}>
                    <h2>Thông tin người dùng</h2>
                    <div>
                        <img
                            className={cx("imgUser")}
                            src={`${process.env.REACT_APP_API_IMG_URL}${dataUser.Img}`}
                        />
                        <h3 className={cx("nameUser")}>{dataUser.TenKH}</h3>
                        <p>
                            <b>Mã Khách Hàng : </b>
                            {dataUser.MaKH}
                        </p>
                        <p>
                            <b>Số điện thoại : </b>
                            {dataUser.Sdt}
                        </p>

                        <p>
                            <b>Email : </b>
                            {dataUser.Email}
                        </p>
                        <p>
                            <b>Địa chỉ : </b>
                            {dataUser.DiaChi}
                        </p>
                        <p>
                            <b>Level : </b>
                            {dataUser.Level}
                        </p>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default memo(UserItem);
