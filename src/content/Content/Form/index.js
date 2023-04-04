import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./Form.module.scss";
import FormLogin from "./FormLogin";
import FormSignUp from "./FormSignUp";
import { memo } from "react";
const cx = classNames.bind(styles);
function Form() {
    const [login, setLogin] = useState(true);
    const handleChangeForm = () => {
        login == true ? setLogin(false) : setLogin(true);
    };
    return (
        <div className={cx("form")}>
            {login ? <FormLogin /> : <FormSignUp />}
            <div className={cx("nextSignUp")}>
                <span>
                    {login
                        ? " Bạn chưa có tài khoản ? "
                        : "Bạn đã có tài khoản ? "}
                    <b onClick={handleChangeForm}>
                        {login ? "Đăng kí" : "Đăng nhập"}
                    </b>
                </span>
            </div>
        </div>
    );
}

export default memo(Form);
