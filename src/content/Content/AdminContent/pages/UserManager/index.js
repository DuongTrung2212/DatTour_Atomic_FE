import classNames from "classnames/bind";
import { memo, useEffect, useRef, useState } from "react";
import requestAxios from "../../../../../api/axios";
import UserItem from "./UserItem/UserItem";
import styles from "./UserManager.module.scss";

const cx = classNames.bind(styles);

function UserManager() {
    const [listUser, setListUser] = useState([]);
    const [fetch, setFetch] = useState(false);
    const fetchData = async () => {
        requestAxios
            .get("user/getAllUser")
            .then((res) => {
                if (res.data.userList) setListUser(res.data.userList);
            })
            .catch((err) => console.log("Err fetch list user"));
    };
    const handleDelete = (boolean) => {
        console.log(boolean);
        setFetch(boolean);
    };
    useEffect(() => {
        fetchData();
    }, [fetch]);

    // const handleClickShowUser = (userId) => {
    //     setShowUser(true);
    //     console.log(userId);
    // };
    return (
        <div className={cx("userManager")}>
            <h1>Danh sách người dùng</h1>
            <div className={cx("userList")}>
                {listUser.map((item, index) => {
                    return (
                        <UserItem
                            key={index}
                            index={index + 1}
                            data={item}
                            userId={item.MaKH}
                            onDelete={handleDelete}
                        />
                    );
                })}

                {/* <UserItem onClick={handleClickShowUser} />
                <UserItem onClick={handleClickShowUser} /> */}
            </div>
        </div>
    );
}

export default memo(UserManager);
