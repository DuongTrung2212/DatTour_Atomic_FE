import Input from "../../../../components/Input";
import classNames from "classnames/bind";
import styles from "./FormSignUp.module.scss";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../../../config/configFirebase";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faWarning } from "@fortawesome/free-solid-svg-icons";
import ReactjsAlert from "reactjs-alert";
import requestAxios from "../../../../api/axios";
import { memo } from "react";
const cx = classNames.bind(styles);

auth.languageCode = "it";

function FormSignUp() {
    const [valuePhone, setValuePhone] = useState("");
    const [status, setStatus] = useState(false);
    const [userName, setUserName] = useState("");
    const [otp, setOtp] = useState("");
    const [recaptcha, setRecaptcha] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [rePass, setRePass] = useState("");
    const [step, setStep] = useState("INPUT_PHONE_NUMBER");
    const [message, setMessage] = useState("");
    const [signUpClickAble, setSignUpClickAble] = useState(true);

    const getValueOTP = (value) => {
        setOtp(value);
    };
    const getValueName = (value) => {
        setName(value);
    };
    const getValueEmail = (value) => {
        setEmail(value);
    };
    const getValuePass = (value) => {
        setPass(value);
    };
    const getValueRePass = (value) => {
        setRePass(value);
    };
    // useEffect(() => {
    //     const verifier = new RecaptchaVerifier(
    //         "recaptcha-container",
    //         {
    //             size: "invisible",
    //             callback: (response) => {
    //                 // reCAPTCHA solved, allow signInWithPhoneNumber.
    //             },
    //         },
    //         auth
    //     );
    //     if (!recaptcha) {
    //         verifier.verify().then(() => setRecaptcha(verifier));
    //     }
    //     return () => {
    //         verifier.clear();
    //     };
    // });
    useEffect(() => {
        if (!recaptcha) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                },
                auth
            );
            setRecaptcha(window.recaptchaVerifier);
        }
    }, []);
    const handleSendOTP = async () => {
        setSignUpClickAble(false);
        if (
            valuePhone.length < 5 ||
            name === "" ||
            email === "" ||
            pass === "" ||
            pass !== rePass
        ) {
            setSignUpClickAble(true);
            return toast.warn("Vui lòng kiểm tra lại dữ liệu", {
                icon: <FontAwesomeIcon icon={faWarning} />,
            });
        }

        const sendOTP = async () => {
            signInWithPhoneNumber(auth, valuePhone, recaptcha)
                .then((confirmationResult) => {
                    console.log("OK");
                    window.confirmationResult = confirmationResult;
                    setStep("");
                    setMessage("");
                })
                .catch((error) => {
                    setMessage("Lỗi hệ thống");
                    console.log("Error" + error);
                });
        };

        await requestAxios
            .post("auth/checkUser", {
                Sdt: valuePhone,
            })
            .then((res) => {
                if (res.data.message === "OK") {
                    setSignUpClickAble(true);
                    sendOTP();
                } else
                    return toast(res.data.message, {
                        icon: <FontAwesomeIcon icon={faPhone} />,
                    });
            })
            .catch((err) => {
                setSignUpClickAble(true);
                toast("Lỗi xử lí");
            });
    };
    const handleValidOTP = async () => {
        setSignUpClickAble(false);
        window.confirmationResult
            .confirm(otp)
            .then(async (result) => {
                await requestAxios
                    .post("auth/signup", {
                        TenKH: name,
                        Sdt: valuePhone,
                        MatKhau: pass,
                        Email: email,
                    })
                    .then((res) => {
                        if (res.data.message === "OK") {
                            toast.success(res.data.message);
                            setStatus(true);
                            setUserName(res.data.newUser.TenKH);

                            console.log(res.data.data);
                        }
                    })
                    .catch((err) => {
                        setSignUpClickAble(true);
                        toast.error("Đăng kí không thành công");
                    });
            })
            .catch((err) => {
                setSignUpClickAble(true);
                setMessage("Sai OTP");
            });
    };
    return (
        <div className={cx("formSignUp")}>
            <div id="recaptcha-container"></div>
            <ReactjsAlert
                status={status} // true or false
                type={"success"} // success, warning, error, info
                title={`Chào mừng ${userName}`}
                button={"OK"}
                quotes={true}
                quote="Cảm ơn bạn tìm đến chúng tôi"
                Close={() => {
                    setStatus(false);
                    window.location.reload();
                }}
            />
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
            <h2>Sign Up</h2>
            {step === "INPUT_PHONE_NUMBER" ? (
                <>
                    <Input
                        onChangeValue={getValueName}
                        label="Tên"
                        notNull={true}
                        placeholder="Enter your name.."
                    />
                    <label>Số điện thoại</label>
                    <PhoneInput
                        className={cx("phoneInput")}
                        international
                        defaultCountry="VN"
                        value={valuePhone}
                        onChange={setValuePhone}
                    />
                    <Input
                        onChangeValue={getValueEmail}
                        isEmail
                        type="email"
                        label="Email"
                        placeholder="Enter your email..."
                    />
                    <Input
                        onChangeValue={getValuePass}
                        notNull={true}
                        type="password"
                        label="Password"
                        placeholder="Enter your password..."
                    />
                    <Input
                        type="password"
                        onChangeValue={getValueRePass}
                        notNull={true}
                        label="Confirm Password"
                        placeholder="Enter your Repassword..."
                    />
                </>
            ) : (
                <Input
                    onChangeValue={getValueOTP}
                    label="Confirm OTP"
                    placeholder="Enter your Repassword..."
                />
            )}
            <p className={cx("message")}>{message}</p>
            {signUpClickAble ? (
                <button
                    onClick={
                        step === "INPUT_PHONE_NUMBER"
                            ? handleSendOTP
                            : handleValidOTP
                    }
                    className={cx("btnSignUp")}
                >
                    {step === "INPUT_PHONE_NUMBER" ? "Send OTP" : "Xác nhận"}
                </button>
            ) : (
                ""
            )}
        </div>
    );
}

export default memo(FormSignUp);
