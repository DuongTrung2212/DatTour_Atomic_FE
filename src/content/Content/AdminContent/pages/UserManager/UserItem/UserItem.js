import classNames from "classnames/bind";
import { memo, useEffect, useRef, useState } from "react";
import styles from "./UserItem.module.scss";
const cx = classNames.bind(styles);
function UserItem(props) {
    const [showUser, setShowUser] = useState(false);
    const showUserRef = useRef();
    useEffect(() => {
        // if (props.getUser) props.getUser(userLogin);
        let handle = (e) => {
            try {
                if (!showUserRef.current.contains(e.target)) setShowUser(false);
            } catch {}
        };
        if (handle) document.addEventListener("mousedown", handle);
    });
    const handleClickShowUser = () => {
        setShowUser(true);
        console.log("AAA");
    };
    return (
        <div className={cx("userItem")}>
            <p className={cx("stt")}>1</p>
            <img className={cx("img")} />
            <p className={cx("name")}>Nguyen Van A</p>
            <p className={cx("sdt")}>0123456789</p>
            <p className={cx("email")}>nguyanvana@gmail.com</p>
            <div className={cx("action")}>
                <button onClick={handleClickShowUser} className={cx("edit")}>
                    Check
                </button>
                <button className={cx("delete")}>Delete</button>
            </div>
            {showUser ? (
                <div ref={showUserRef} className={cx("showUser")}>
                    User
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default memo(UserItem);
