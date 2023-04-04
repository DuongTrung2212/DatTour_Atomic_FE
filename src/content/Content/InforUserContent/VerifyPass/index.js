import classNames from "classnames/bind";
import styles from "./VerifyPass.module.scss";

import Input from "../../../../components/Input";
import { Button } from "antd";
import { useState } from "react";
import requestAxios from "../../../../api/axios";

const cx = classNames.bind(styles);
function VerifyPass({ onSuccess, onErr, ...props }) {
    const [pass, setPass] = useState("");
    const [showBtn, setShowBtn] = useState(true);
    const getPass = (data) => {
        setPass(data);
    };
    const handleVerifyPass = async () => {
        setShowBtn(false);
        requestAxios
            .post("user/verify", {
                MatKhau: pass,
            })
            .then((res) => {
                if (res.data.message == "OK") onSuccess();
                else {
                    onErr();
                    setShowBtn(true);
                }
            })
            .catch((err) => setShowBtn(true));
    };
    return (
        <div className={cx("verifyPass")}>
            <h2>VerifyPass</h2>
            <div>
                <Input onChangeValue={getPass} label={"Xác nhận mật khẩu"} />
                {showBtn ? (
                    <Button className="btn" onClick={handleVerifyPass}>
                        OK
                    </Button>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default VerifyPass;
