import classNames from "classnames/bind";
import styles from "./DecriptionForm.module.scss";
import Input from "../../../../../../components/Input";
import { Button } from "antd";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

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
        if (
            title.trim().length < 5 ||
            file.length <= 0 ||
            content.length < 20
        ) {
            toast("Vui lòng nhập đầy đủ");
            return;
        } else {
            const dataDecription = {
                title,
                file,
                content,
            };
            console.log(dataDecription);
            if (props.onSubmit) props.onSubmit({ dataDecription });
        }
    };
    return (
        <div className={cx("decriptionForm")}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <Input
                onChangeValue={handleTitle}
                className={cx("title")}
                notNull={true}
                label={"Tiêu đề"}
            />
            <span>Chọn ảnh</span>
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

            <button className={cx("btnOK")} onClick={handleClickBtn}>
                OK
            </button>
        </div>
    );
}

export default DecriptionForm;
