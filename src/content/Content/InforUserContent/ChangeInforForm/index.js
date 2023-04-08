import classNames from "classnames/bind";
import styles from "./ChangeInforForm.module.scss";
import Input from "../../../../components/Input";
import { useContext, useEffect, useState } from "react";
import requestAxios from "../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { DataUserChangeContext } from "../../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ChangePassForm from "./ChangPassForm";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
const cx = classNames.bind(styles);
function ChangeInforForm() {
    const [nameUser, setNameUser] = useState("");
    const [emailUser, setEmailUser] = useState("");
    const [addressUser, setAddressUser] = useState("");

    const [showBtn, setShowBtn] = useState(true);
    const [dataUser, setDataUser] = useState("");
    const [switchToChangePass, setSwitchToChangePass] = useState(false);
    const { dataUserChange, setDataUserChange } = useContext(
        DataUserChangeContext
    );
    useEffect(() => {
        const fetchData = async () => {
            await requestAxios
                .get("user")
                .then((res) => {
                    if (res.data.message == "OK") {
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
                else toast.error("Vui lòng xem lại");
                setShowBtn(true);
                setDataUserChange(dataUserChange + 1);
            })
            .catch((err) => {
                toast.error("Lỗi r bạn");
                setShowBtn(true);
            });
    };

    const handleChangeForm = () => {
        if (switchToChangePass) setSwitchToChangePass(false);
        else setSwitchToChangePass(true);
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
            {switchToChangePass ? (
                <div>
                    <ChangePassForm />
                </div>
            ) : (
                <div>
                    <Input
                        value={nameUser}
                        onChangeValue={getNameUser}
                        label={"Tên"}
                    />
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
                    <button onClick={showBtn ? handleSubmit : null}>
                        Xác nhận
                    </button>
                </div>
            )}
            <Tippy
                content={<span className={cx("tippyLabel")}>Đổi mật khẩu</span>}
            >
                <button onClick={handleChangeForm}>
                    {switchToChangePass ? (
                        <FontAwesomeIcon icon={faArrowLeft} />
                    ) : (
                        <FontAwesomeIcon icon={faArrowRight} />
                    )}
                </button>
            </Tippy>
        </div>
    );
}

export default ChangeInforForm;
