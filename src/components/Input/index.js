import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./Input.module.scss";
import useDebounce from "../../hooks/useDebounce";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { InputNumber } from "antd";
const cx = classNames.bind(styles);
function Input({
    label,
    notNull,
    isEmail,
    value,
    defaultValue,
    onChangeValue,
    classNameLabel,
    ...props
}) {
    const [dataChange, setDataChange] = useState("");
    const [message, setMessage] = useState("");
    const valueDebounced = useDebounce(dataChange, 1000);
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const checkNull = (e) => {
        var txt = e.target.value;
        setDataChange(txt);
        if (onChangeValue) {
            onChangeValue(txt);
        }

        if (isEmail) {
            if (!valueDebounced) return;
            validateEmail(txt)
                ? setMessage("")
                : setMessage("Email chưa hợp lệ");
        } else {
            notNull == true && txt.trim() == ""
                ? setMessage("Không được để trống")
                : setMessage("");
        }
    };
    useEffect(() => {
        if (value) setDataChange(value);
    }, [value]);
    return (
        <div className={cx("field", props.className)}>
            <label className={cx("label", classNameLabel)}>{label}</label>
            {!props.isNumber ? (
                <input
                    {...props}
                    max={props.max}
                    min={props.min}
                    onChange={checkNull}
                    value={dataChange}
                    className={cx("input")}
                    type={props.type ? props.type : "text"}
                />
            ) : (
                <InputNumber
                    max={props.max}
                    min={props.min}
                    onChange={checkNull}
                    defaultValue={defaultValue || 1}
                    placeholder={props.placeholder}
                    value={dataChange}
                />
            )}
            <span className={cx("message")}>{message}</span>
        </div>
    );
}

export default Input;
