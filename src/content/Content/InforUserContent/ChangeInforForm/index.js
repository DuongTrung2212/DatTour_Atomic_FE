import classNames from "classnames/bind";
import styles from "./ChangeInforForm.module.scss";
import Input from "../../../../components/Input";
import { useContext, useEffect, useState } from "react";
import requestAxios from "../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { DataUserChangeContext } from "../../../../App";
const cx = classNames.bind(styles);
function ChangeInforForm() {
    const [nameUser, setNameUser] = useState("");
    const [emailUser, setEmailUser] = useState("");
    const [addressUser, setAddressUser] = useState("");
    const [passUser, setPassUser] = useState("");
    const [showBtn, setShowBtn] = useState(true);
    const [dataUser, setDataUser] = useState("");
    const { dataUserChange, setDataUserChange } = useContext(
        DataUserChangeContext
    );
    useEffect(() => {
        const fetchData = async () => {
            await requestAxios
                .get("user")
                .then((res) => {
                    if (res.data.user) {
                        setNameUser(res.data.user.TenKH);
                        setEmailUser(res.data.user.Email);
                        setAddressUser(res.data.user.DiaChi);
                    }
                })
                .catch((err) => toast.error("Lỗi r bạn"));
        };
        fetchData();
    }, [dataUserChange]);
    const getNameUser = (data) => {
        setNameUser(data);
    };
    const getEmailUser = (data) => {
        setEmailUser(data);
    };
    const getAddressUser = (data) => {
        setAddressUser(data);
    };
    const getPassUser = (data) => {
        setPassUser(data);
    };
    const handleSubmit = async () => {
        setShowBtn(false);
        var formData = new FormData();
        formData.append("TenKH", nameUser);
        formData.append("Email", emailUser);
        formData.append("DiaChi", addressUser);

        await requestAxios
            .patch("user", formData)
            .then((res) => {
                if (res.data.message == "OK") toast.success("Đã đổi");
                setShowBtn(true);
                setDataUserChange(dataUserChange + 1);
            })
            .catch((err) => {
                toast.error("Lỗi r bạn");
                setShowBtn(true);
            });
    };
    return (
        <div className={cx("changeInforForm")}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <Input value={nameUser} onChangeValue={getNameUser} label={"Tên"} />
            <Input
                value={emailUser}
                onChangeValue={getEmailUser}
                label={"Email"}
            />
            <Input
                value={addressUser}
                onChangeValue={getAddressUser}
                label={"Địa chỉ"}
            />
            <button onClick={showBtn ? handleSubmit : null}>Xác nhận </button>
        </div>
    );
}

export default ChangeInforForm;
