import classNames from "classnames/bind";
import styles from "./DecriptionForm.module.scss";
import Input from "../../../../../../components/Input";
import { Button } from "antd";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
const cx = classNames.bind(styles);
function DecriptionForm(props) {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [content, setContent] = useState("");

    const handleTitle = (e) => {
        setTitle(e);
    };
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };
    const handleContent = (e) => {
        setContent(e.target.value);
    };
    const handleClickBtn = () => {
        const dataDecription = {
            title,
            file,
            content,
        };

        if (props.onSubmit) props.onSubmit({ dataDecription });
    };
    return (
        <div className={cx("decriptionForm")}>
            <Input
                onChangeValue={handleTitle}
                className={cx("title")}
                notNull={true}
                label={"Tiêu đề"}
            />
            <label>Chọn ảnh</label>
            <input
                onChange={handleFile}
                className={cx("file")}
                accept={"image/*"}
                type={"file"}
            />
            <label>Nội dung</label>
            <textarea
                onChange={handleContent}
                className={cx("content")}
                placeholder="Nhập nội dung"
            />

            <Button onClick={handleClickBtn}>OK</Button>
        </div>
    );
}

export default DecriptionForm;
