import classNames from "classnames/bind";
import { useState } from "react";
import requestAxios from "../../../../../../api/axios";
import Input from "../../../../../../components/Input";
import styles from "./CreateStaff.module.scss";
import { ToastContainer, toast } from "react-toastify";
const cx = classNames.bind(styles);
function CreateStaff() {
    const [nameStaff, setNameStaff] = useState("");
    const [genderStaff, setGenderStaff] = useState("");
    const [phoneStaff, setPhoneStaff] = useState("");
    const [emailStaff, setEmailStaff] = useState("");
    const [showBtn, setShowBtn] = useState(true);

    const getValueName = (data) => {
        setNameStaff(data);
    };
    const getValueGender = (data) => {
        setGenderStaff(data);
    };

    const getValuePhone = (data) => {
        setPhoneStaff(data);
    };

    const getValueEmail = (data) => {
        setEmailStaff(data);
    };
    const handleSubmit = async () => {
        setShowBtn(false);
        await requestAxios
            .post(`nhanVien`, {
                TenHDVien: nameStaff,
                GioiTinh: genderStaff,
                SdtNV: phoneStaff,
                Email: emailStaff,
            })
            .then((res) => {
                if (res.data.message == "OK") {
                    toast.success("Thêm nhân viên thành công");
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => toast.error("Lỗi"));
        setShowBtn(true);
    };

    return (
        <div className={cx("createStaff")}>
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
            <h3>Thêm Nhân viên</h3>

            <div className={cx("formAddStaff")}>
                <Input
                    onChangeValue={getValueName}
                    notNull
                    label={"Tên nhân viên"}
                    classNameLabel={cx("labelGender")}
                />
                <Input
                    onChangeValue={getValueGender}
                    label={"Giới tính"}
                    classNameLabel={cx("labelGender")}
                />
                <Input
                    onChangeValue={getValuePhone}
                    notNull
                    label={"Sdt"}
                    classNameLabel={cx("labelGender")}
                />
                <Input
                    onChangeValue={getValueEmail}
                    isEmail
                    label={"Email"}
                    classNameLabel={cx("labelGender")}
                />
                {showBtn ? (
                    <button onClick={handleSubmit}>Xác Nhận</button>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default CreateStaff;
