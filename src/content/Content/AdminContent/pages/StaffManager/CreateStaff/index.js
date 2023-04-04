import classNames from "classnames/bind";
import { useState } from "react";
import requestAxios from "../../../../../../api/axios";
import Input from "../../../../../../components/Input";
import styles from "./CreateStaff.module.scss";
const cx = classNames.bind(styles);
function CreateStaff() {
    const [nameStaff, setNameStaff] = useState("");
    const [genderStaff, setGenderStaff] = useState("");
    const [phoneStaff, setPhoneStaff] = useState("");
    const [emailStaff, setEmailStaff] = useState("");

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
        await requestAxios
            .post(`nhanVien`, {
                TenHDVien: nameStaff,
                GioiTinh: genderStaff,
                SdtNV: phoneStaff,
                Email: emailStaff,
            })
            .then((res) => console.log("OK"))
            .catch((err) => console.log("Err create staff"));
    };

    return (
        <div className={cx("createStaff")}>
            <h3>Thêm Nhân viên</h3>
            <div>
                <Input
                    onChangeValue={getValueName}
                    notNull
                    label={"Tên nhân viên"}
                    classNameLabel={cx("labelGender")}
                />
                <Input onChangeValue={getValueGender} label={"Giới tính"} classNameLabel={cx("labelGender")} />
                <Input onChangeValue={getValuePhone} notNull label={"Sdt"} classNameLabel={cx("labelGender")} />
                <Input onChangeValue={getValueEmail} isEmail label={"Email"} classNameLabel={cx("labelGender")} />
                <button onClick={handleSubmit}>Xác Nhận</button>
            </div>
        </div>
    );
}

export default CreateStaff;
