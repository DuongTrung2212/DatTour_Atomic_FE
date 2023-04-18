import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import requestAxios from "../../../../../../../api/axios";
import styles from "./StaffItem.module.scss";
import { ToastContainer, toast } from "react-toastify";
import { confirmCustom } from "../../../../../../../components/ConfirmCustom";
import UpdateStaffForm from "../UpdateStaffForm";
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
    const [showUpdateStaffForm, setShowUpdateStaffForm] = useState(false);
    const updateStaffFormRef = useRef();
    useEffect(() => {
        let handle = (e) => {
            try {
                if (!updateStaffFormRef.current.contains(e.target))
                    setShowUpdateStaffForm(false);
            } catch {}
        };
        if (handle) document.addEventListener("mousedown", handle);
    });
    const onYes = async () => {
        await requestAxios
            .delete(`nhanVien/${staffId}`)
            .then((res) => {
                if (res.data.message == "OK") {
                    toast.success("Đã xóa");
                    if (deleted) deleted();
                } else {
                    toast.warning(res.data.message);
                }
            })
            .catch((err) => toast.error("Lỗi xóa nhân viên"));
    };
    const handleClickUpdate = () => {
        if (showUpdateStaffForm) setShowUpdateStaffForm(false);
        else setShowUpdateStaffForm(true);
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
            {showUpdateStaffForm ? (
                <div ref={updateStaffFormRef} className={cx("formUpdate")}>
                    <UpdateStaffForm
                        staffId={staffId}
                        emailStaff={emailStaff}
                        nameStaff={nameStaff}
                        phoneStaff={phoneStaff}
                        genderStaff={genderStaff}
                    />
                </div>
            ) : (
                ""
            )}
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
                    <button
                        className={cx("Update")}
                        onClick={handleClickUpdate}
                    >
                        Update
                    </button>
                    <button
                        className={cx("Delete")}
                        onClick={handleDeleteStaff}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StaffItem;
