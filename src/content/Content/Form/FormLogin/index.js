import Input from "../../../../components/Input";
import classNames from "classnames/bind";
import styles from "./FormLogin.module.scss";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import requestAxios from "../../../../api/axios";
const cx = classNames.bind(styles);
function FormLogin() {
    const [number, setNumber] = useState("");
    const [pass, setPass] = useState("");

    const getNumber = (value) => {
        setNumber(value);
    };
    const getPass = (value) => {
        setPass(value);
    };
    const fetchData = async () => {
        await requestAxios
            .post("auth/login", {
                Sdt: number,
                MatKhau: pass,
            })
            .then((res) => {
                if (res.data.message == "OK") {
                    window.location.reload();
                } else alert(res.data.message);
            })
            .catch((err) => alert("Err"));
    };
    const handleLogin = () => {
        if (number.trim() != "" && pass.trim() != "") {
            fetchData();
        }
    };

    return (
        <div className={cx("formLogin")}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h2>Login</h2>
            <Input
                onChangeValue={getNumber}
                notNull={true}
                label="Số điện thoại"
                placeholder="Enter your sdt..."
            />
            <Input
                onChangeValue={getPass}
                notNull={true}
                label="Password"
                fieldPass={true}
                placeholder="Enter your password..."
            />
            <button onClick={handleLogin} className={cx("btnLogin")}>
                Đăng nhập
            </button>
        </div>
    );
}

export default FormLogin;
