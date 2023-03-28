import Input from "../../../../components/Input";
import classNames from "classnames/bind";
import styles from "./FormSignUp.module.scss";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
    getAuth,
    signInWithPhoneNumber,
    RecaptchaVerifier,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, app, analytics } from "../../../../config/configFirebase";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { async } from "@firebase/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faWarning } from "@fortawesome/free-solid-svg-icons";
import ReactjsAlert from "reactjs-alert";
import requestAxios from "../../../../api/axios";
const cx = classNames.bind(styles);

auth.languageCode = "it";

function FormSignUp() {
    const [valuePhone, setValuePhone] = useState("");
    const [status, setStatus] = useState(false);
    const [userName, setUserName] = useState("");
    const [otp, setOtp] = useState("");
    const [recaptcha, setRecaptcha] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [rePass, setRePass] = useState("");
    const [step, setStep] = useState("INPUT_PHONE_NUMBER");
    const [result, setResult] = useState("");
    const [message, setMessage] = useState("");

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
    var verifier;

    const handleSendOTP = async () => {
        if (
            valuePhone.length < 5 ||
            name == "" ||
            email == "" ||
            pass == "" ||
            pass != rePass
        )
            return toast.warn("Vui lòng kiểm tra lại dữ liệu", {
                icon: <FontAwesomeIcon icon={faWarning} />,
            });

        verifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    // setStep("");
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
            },
            auth
        );

        const sendOTP = async () => {
            await signInWithPhoneNumber(auth, valuePhone, verifier)
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
                if (res.data.message == "OK") sendOTP();
                else
                    return toast(res.data.message, {
                        icon: <FontAwesomeIcon icon={faPhone} />,
                    });
            })
            .catch((err) => {
                toast("Lỗi xử lí");
            });
    };
    const handleValidOTP = async () => {
        window.confirmationResult
            .confirm(otp)
            .then(async (result) => {
                alert("OK");
                console.log(result);
                await requestAxios
                    .post("auth/signup", {
                        TenKH: name,
                        Sdt: valuePhone,
                        MatKhau: pass,
                        Email: email,
                    })
                    .then((res) => {
                        toast.success(res.data.message);
                        setStatus(true);
                        setUserName(res.data.newUser.TenKH);
                        console.log(res.data.data);
                    })
                    .catch((err) => {
                        toast.error("Đăng kí không thành công");
                    });
            })
            .catch((err) => setMessage("Sai OTP"));
    };
    return (
        <div className={cx("formSignUp")}>
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
                        fieldEmail
                        label="Email"
                        placeholder="Enter your email..."
                    />
                    <Input
                        onChangeValue={getValuePass}
                        notNull={true}
                        label="Password"
                        type="password"
                        placeholder="Enter your password..."
                    />
                    <Input
                        onChangeValue={getValueRePass}
                        notNull={true}
                        label="Confirm Password"
                        fieldPass={true}
                        type="password"
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
            <div id="recaptcha-container"></div>
        </div>
    );
}

export default FormSignUp;
