import { useState } from "react";
import Input from "../../../../../components/Input";
import requestAxios from "../../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import styles from "./ChangPassForm.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function ChangePassForm() {
    const [passUser, setPassUser] = useState("");
    const [showBtn, setShowBtn] = useState(true);
    const getPassUser = (data) => {
        setPassUser(data);
    };
    const handleSubmitChangePass = async () => {
        if (passUser === "") return;
        setShowBtn(false);

        await requestAxios
            .patch(`user/changePass`, {
                MatKhau: passUser,
            })
            .then((res) => {
                if (res.data.message === "OK") {
                    toast.success("Đã đổi mật khẩu");
                } else {
                    toast.warning(res.data.message);
                }
            })
            .catch((err) => {
                console.log("Err chang pass user");
            });
        setShowBtn(true);
    };
    return (
        <div className={cx("changePassForm")}>
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
            <Input
                type="password"
                onChangeValue={getPassUser}
                label={"Mật khẩu mới"}
            />
            <button onClick={showBtn ? handleSubmitChangePass : null}>
                Xác nhận
            </button>
        </div>
    );
}

export default ChangePassForm;
