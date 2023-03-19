import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./Input.module.scss";
import useDebounce from "../../hooks/useDebounce";
import { faL } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function Input(props) {
    const [value, setValue] = useState("");
    const [message, setMessage] = useState("");
    const valueDebounced = useDebounce(value, 1000);
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    const checkNull = (e) => {
        var txt = e.target.value.trim();
        setValue(txt);
        if (props.onChangeValue) props.onChangeValue(txt);

        if (props.fieldEmail) {
            if (!valueDebounced) return;
            validateEmail(txt)
                ? setMessage("")
                : setMessage("Email chưa hợp lệ");
        } else {
            props.notNull == true && txt == ""
                ? setMessage("Không được để trống")
                : setMessage("");
        }
    };
    return (
        <div className={cx("field")}>
            <label className={cx("label")}>{props.label || "Input"}</label>
            <input
                maxLength={props.maxLength}
                minLength={props.minLength}
                onChange={checkNull}
                value={value}
                className={cx("input")}
                type={props.fieldPass ? "password" : "text"}
                placeholder={props.placeholder || "Input"}
            />
            <span className={cx("message")}>{message}</span>
        </div>
    );
}

export default Input;
