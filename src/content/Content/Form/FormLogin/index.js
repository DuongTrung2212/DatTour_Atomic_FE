import Input from "../../../../components/Input";
import classNames from "classnames/bind";
import styles from "./FormLogin.module.scss";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import requestAxios from "../../../../api/axios";
import PhoneInput from "react-phone-number-input";
import ReactjsAlert from "reactjs-alert";
const cx = classNames.bind(styles);
function FormLogin() {
    const [status, setStatus] = useState(false);
    const [number, setNumber] = useState("");
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [clickAble, setClickAbel] = useState(true);

    const getNumber = (value) => {
        setNumber(value);
    };
    const getPass = (value) => {
        setPass(value);
    };
    const fetchData = async () => {
        setClickAbel(false);
        await requestAxios
            .post("auth/login", {
                Sdt: number,
                MatKhau: pass,
            })
            .then((res) => {
                if (res.data.message == "OK") {
                    setClickAbel(true);
                    setStatus(true);
                    setUserName(res.data.data.TenKH);
                    // window.location.reload();
                } else {
                    toast.warn(res.data.message);
                    setClickAbel(true);
                }
            })
            .catch((err) => {
                toast.warn("Vui lòng xem lại TK và MK");
                setClickAbel(true);
            });
    };
    const handleLogin = () => {
        if (number.trim() != "" && pass.trim() != "") {
            fetchData();
        } else {
            toast.warn("Vui lòng nhập đầy đủ");
        }
    };

    return (
        <div className={cx("formLogin")}>
            <ReactjsAlert
                status={status} // true or false
                type={"success"} // success, warning, error, info
                title={`Chào mừng ${userName}`}
                button={"OK"}
                quotes={true}
                quote="Cảm ơn bạn tìm đến chúng tôi"
                Close={() => {
                    setStatus(false);
                    window.location.reload();
                }}
            />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <h2>Login</h2>
            <label>Số điện thoại</label>
            <PhoneInput
                className={cx("phoneInput")}
                international
                defaultCountry="VN"
                value={number}
                onChange={setNumber}
            />
            <Input
                onChangeValue={getPass}
                notNull={true}
                label="Password"
                type="password"
                placeholder="Enter your password..."
            />
            {clickAble ? (
                <button onClick={handleLogin} className={cx("btnLogin")}>
                    Đăng nhập
                </button>
            ) : (
                ""
            )}
        </div>
    );
}

export default FormLogin;
