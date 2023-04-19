import classNames from "classnames/bind";
import styles from "./UpdateStaffForm.module.scss";
import Input from "../../../../../../../components/Input";
import SelectCustom from "../../../../../../../components/SelectCustom/SelectCustom";
import { variableLocal } from "../../../../../../../varialeLocal";
import { useContext, useEffect, useState } from "react";
import requestAxios from "../../../../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { DaTaChangeContext } from "../../../..";
const cx = classNames.bind(styles);
function UpdateStaffForm({ staffId }) {
    const [dataStaff, setDataStaff] = useState();
    const [tenHDVien, setTenHDVien] = useState("");
    const [email, setEmail] = useState("");
    const [sdt, setSdt] = useState("");
    const [gender, setGender] = useState({});
    const { changed, setChanged } = useContext(DaTaChangeContext);
    const getValueSdt = (data) => {
        setSdt(data);
    };
    const getValueName = (data) => {
        setTenHDVien(data);
    };
    const getValueEmail = (data) => {
        setEmail(data);
    };
    useEffect(() => {
        const fetchDataStaff = async () => {
            await requestAxios
                .get(`nhanVien/${staffId}`)
                .then((res) => {
                    if (res.data.message == "OK") {
                        setDataStaff(res.data.nhanVien);
                        setTenHDVien(res.data.nhanVien.TenHDVien);
                        setEmail(res.data.nhanVien.Email);
                        setSdt(res.data.nhanVien.SdtNV);
                        setGender({
                            value: res.data.nhanVien.GioiTinh,
                            label: res.data.nhanVien.GioiTinh,
                        });
                    }
                })
                .catch((err) => console.log(err));
        };
        fetchDataStaff();
    }, [changed]);
    const handleSubmit = async () => {
        await requestAxios
            .post(`nhanVien/${staffId}`, {
                TenHDVien: tenHDVien,
                GioiTinh: gender.value,
                SdtNV: sdt,
                Email: email,
            })
            .then((res) => {
                if (res.data.message == "OK") {
                    toast.success("Thành công");
                    setChanged(changed + 1);
                } else {
                    toast.warning("Thành công");
                }
            })
            .catch((err) => toast.error("Lỗi hệ thống"));
    };
    return (
        <div className={cx("updateUserForm")}>
            <Input
                onChangeValue={getValueName}
                value={tenHDVien}
                label={"Tên"}
            />
            <SelectCustom
                onChange={(e) => setGender(e)}
                value={gender}
                options={variableLocal.dataGender}
                label={"Giới tính"}
            />
            <Input
                onChangeValue={getValueSdt}
                value={sdt}
                label={"Số điện thoại"}
            />
            <Input
                onChangeValue={getValueEmail}
                value={email}
                label={"Email"}
            />
            <button className={cx("btn")}  onClick={handleSubmit}>Xác nhận</button>
        </div>
    );
}

export default UpdateStaffForm;
