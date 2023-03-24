import classNames from "classnames/bind";
import { memo, useEffect, useRef, useState } from "react";
import requestAxios from "../../../../../api/axios";
import UserItem from "./UserItem/UserItem";
import styles from "./UserManager.module.scss";

const cx = classNames.bind(styles);

function UserManager() {
    const [listUser, setListUser] = useState([1, 2]);

    const fetchData = async () => {
        requestAxios
            .get("user")
            .then((res) => console.log.data)
            .catch((err) => console.log("Err fetch list user"));
    };

    useEffect(() => {});

    // const handleClickShowUser = (userId) => {
    //     setShowUser(true);
    //     console.log(userId);
    // };
    return (
        <div className={cx("userManager")}>
            <h1>Danh sách người dùng</h1>
            <div className={cx("userList")}>
                {listUser.map((item, index) => {
                    return <UserItem />;
                })}

                {/* <UserItem onClick={handleClickShowUser} />
                <UserItem onClick={handleClickShowUser} /> */}
            </div>
        </div>
    );
}

export default memo(UserManager);
