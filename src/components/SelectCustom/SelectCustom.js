import Select from "react-select";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./SelectCustom.module.scss";
const cx = classNames.bind(styles);
function SelectCustom({
    className,
    classNameSelect,
    label,
    options,
    onChange,
    ...props
}) {
    const handleChange = (e) => {
        onChange(e);
    };

    return (
        <div className={cx("field", className)}>
            <label className={cx("label", classNameSelect)}>
                {label || "Input"}
            </label>
            <Select {...props} onChange={handleChange} options={options} />
        </div>
    );
}

export default SelectCustom;
