import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./Form.module.scss";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import FormLogin from "./FormLogin";
import FormSignUp from "./FormSignUp";
import { memo } from "react";
import Input from "../../../components/Input";
import { auth } from "../../../config/configFirebase";
import PhoneInput from "react-phone-number-input";
import requestAxios from "../../../api/axios";
import { toast } from "react-toastify";
import { useRef } from "react";
const cx = classNames.bind(styles);
// const auth = getAuth();
// auth.languageCode = "it";
function Form() {
    const [login, setLogin] = useState(true);
    const [showFormPhone, setShowFormPhone] = useState(false);

    const [showFormPass, setShowFormPass] = useState(false);
    const [showFormOTP, setShowFormOTP] = useState(false);
    const [recaptcha, setRecaptcha] = useState();
    const [valuePhone, setValuePhone] = useState("");
    const [valueOTP, setValueOTP] = useState("");
    const [valuePass, setValuePass] = useState("");
    const formForgetPassRef = useRef();
    useEffect(() => {
        // if (props.getUser) props.getUser(userLogin);
        let handle = (e) => {
            try {
                if (!formForgetPassRef.current.contains(e.target)) {
                    // setShowFormPass(false);
                    // setShowFormOTP(false);
                    setShowFormPhone(false);
                }
            } catch {}
        };
        if (handle) document.addEventListener("mousedown", handle);
    });
    const getValueOTP = (value) => {
        setValueOTP(value);
    };

    const getValuePass = (value) => {
        setValuePass(value);
    };
    const handleChangeForm = () => {
        login === true ? setLogin(false) : setLogin(true);
    };
    const handleForgetPass = () => {
        showFormPhone ? setShowFormPhone(false) : setShowFormPhone(true);
    };

    const handleSendOTP = async () => {
        if (!recaptcha) {
            const verifier = new RecaptchaVerifier(
                "sign-in-button",
                {
                    size: "invisible",
                },
                auth
            );
            verifier.verify().then(() => setRecaptcha(verifier));
        }
        await signInWithPhoneNumber(auth, valuePhone, recaptcha)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setShowFormOTP(true);
                setShowFormPhone(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleValidOTP = () => {
        window.confirmationResult
            .confirm(valueOTP)
            .then((result) => {
                toast("Hãy nhập mật khẩu mới");
                setShowFormOTP(false);
                setShowFormPass(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleChangPass = async () => {
        await requestAxios
            .patch(`auth/changePassByNumber`, {
                Sdt: valuePhone,
                MatKhau: valuePass,
            })
            .then((res) => {
                if (res.data.message === "OK") {
                    toast.success("Đã đổi mật khẩu");
                    console.log("OK");
                } else {
                    toast.warning("Đã có lỗi xảy ra");
                }
                setShowFormPass(false);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className={cx("form")}>
            <div id="sign-in-button" className="justify-center flex"></div>
            {login ? <FormLogin /> : <FormSignUp />}
            <div className={cx("nextSignUp")}>
                <span>
                    {login
                        ? " Bạn chưa có tài khoản ? "
                        : "Bạn đã có tài khoản ? "}
                    <b onClick={handleChangeForm}>
                        {login ? "Đăng kí" : "Đăng nhập"}
                    </b>
                </span>

                <div ref={formForgetPassRef}>
                    {showFormPhone ? (
                        <div className={cx("formForgetPass")}>
                            <span className={cx("labelPhone")}>
                                Số điện thoại
                            </span>

                            <PhoneInput
                                className={cx("phoneInput")}
                                international
                                defaultCountry="VN"
                                value={valuePhone}
                                onChange={setValuePhone}
                            />

                            <button onClick={handleSendOTP}>OK</button>
                        </div>
                    ) : (
                        ""
                    )}
                    {showFormOTP ? (
                        <div className={cx("formForgetPass")}>
                            <Input
                                onChangeValue={getValueOTP}
                                onKeyDown={null}
                                label={"Nhập mã OTP"}
                            />
                            <button onClick={handleValidOTP}>OK</button>
                        </div>
                    ) : (
                        ""
                    )}
                    {showFormPass ? (
                        <div className={cx("formForgetPass")}>
                            <Input
                                onChangeValue={getValuePass}
                                onKeyDown={null}
                                label={"Mật khẩu mới"}
                            />
                            <button onClick={handleChangPass}>OK</button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <p onClick={handleForgetPass}>Quên mật khẩu ?</p>
            </div>
        </div>
    );
}

export default memo(Form);
