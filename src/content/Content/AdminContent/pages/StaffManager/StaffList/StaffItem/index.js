import classNames from "classnames/bind";
import { useState } from "react";
import requestAxios from "../../../../../../../api/axios";
import styles from "./StaffItem.module.scss";
import { ToastContainer, toast } from "react-toastify";
import { confirmCustom } from "../../../../../../../components/ConfirmCustom";
const cx = classNames.bind(styles);
function StaffItem({
    deleted,
    className,
    index,
    staffId,
    nameStaff,
    genderStaff,
    phoneStaff,
    emailStaff,
    workDate,
}) {
    const onYes = async () => {
        await requestAxios
            .delete(`nhanVien/${staffId}`)
            .then((res) => {
                if (res.data.message == "OK") {
                    toast.success("Đã xóa");
                    if (deleted) deleted();
                } else {
                    toast.success(res.data.message);
                }
            })
            .catch((err) => toast.error("Lỗi xóa nhân viên"));
    };
    const handleDeleteStaff = () => {
        confirmCustom("Xác nhận xóa", "Bạn muốn xóa nhân viên", onYes);
    };
    return (
        <div className={cx("staffItem", className)}>
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
            <div className={cx("infor")}>
                <span className={cx("index")}>{index}</span>
                <span className={cx("nameStaff")}>{nameStaff}</span>
                <span className={cx("genderStaff")}>{genderStaff}</span>
                <span className={cx("phoneStaff")}>{phoneStaff}</span>
                <span className={cx("emailStaff")}>{emailStaff}</span>
                <span className={cx("workDate")}>
                    {workDate.toLocaleString()}
                </span>
                <div className={cx("action")}>
                    <button>Update</button>
                    <button onClick={handleDeleteStaff}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default StaffItem;
