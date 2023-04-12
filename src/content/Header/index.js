import {
    faHome,
    faMagnifyingGlass,
    faPlane,
    faSignOut,
    faTicket,
    faUser,
    faUserGear,
    faWalking,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Header.module.scss";
import { memo, useContext, useEffect, useRef, useState } from "react";
import Form from "../Content/Form";
import requestAxios from "../../api/axios";
import useDebounce from "../../hooks/useDebounce";
import SearchItem from "../../components/SearchItem";
import HeadlessTippy from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { TourContext } from "../../layouts/MainLayout/MainLayout";

import { AdminContext, DataUserChangeContext, UserContext } from "../../App";

import MenuItem from "./MenuItem/MenuItem";
const cx = classNames.bind(styles);

const listMenuItem = [
    {
        icon: <FontAwesomeIcon icon={faHome} />,
        to: "/",
        title: "Trang chủ",
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        to: "/infor-user",
        title: "Thông tin",
    },
    {
        icon: <FontAwesomeIcon icon={faTicket} />,
        to: "/infor-user/ve",
        title: "Vé",
    },
];

function Header(props) {
    const [searchValue, setSearchValue] = useState("");
    const [formLogin, setFormLogin] = useState(false);
    const [hideSearch, setHideSearch] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const debouncedValue = useDebounce(searchValue, 200);
    const navigate = useNavigate();
    let formLoginRef = useRef();
    const userLogin = useContext(UserContext);
    const isAdmin = useContext(AdminContext);
    const tourId = useContext(TourContext);
    const { dataUserChange, setDataUserChange } = useContext(
        DataUserChangeContext
    );
    const handleLoginClick = () => {
        setSearchResult([]);
        formLogin ? setFormLogin(false) : setFormLogin(true);
    };
    useEffect(() => {
        setHideSearch(false);
    }, [tourId]);
    useEffect(() => {
        // if (props.getUser) props.getUser(userLogin);
        let handle = (e) => {
            try {
                if (!formLoginRef.current.contains(e.target))
                    setFormLogin(false);
            } catch {}
        };
        if (handle) document.addEventListener("mousedown", handle);
    });

    useEffect(() => {
        const fetchData = async () => {
            await requestAxios
                .get(`user`)
                .then((res) => {
                    if (res.data.message == "OK") {
                        setUserName(res.data.user.TenKH);
                        setUserAvatar(
                            `${process.env.REACT_APP_API_IMG_URL}${res.data.user.Img}`
                        );
                    }
                })
                .catch((err) => console.log("Err get user"));
        };
        if (userLogin) fetchData();
    }, [userLogin, dataUserChange]);
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchData = async () => {
            await requestAxios
                .get(`tour/search/${debouncedValue}`)
                .then((res) => {
                    if (res.data.message == "OK") {
                        setFormLogin(false);
                        setHideSearch(true);
                        if (res.data.listSearch)
                            setSearchResult(res.data.listSearch);
                        else setSearchResult([]);
                    } else {
                        setSearchResult([]);
                    }
                })
                .catch(() => console.log("Err"));
        };
        fetchData();

        // setSearchResult(result);
    }, [debouncedValue]);
    const handleSearch = (e) => {
        setHideSearch(true);
        setSearchValue(e.target.value);
    };
    const handleHideSearch = () => {
        setHideSearch(false);
    };
    const handleLogOut = async () => {
        requestAxios
            .get(`auth/logout`)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.log("err loi logout"));
    };
    const handleEnter = (e) => {
        if (e.keyCode == 13) {
            navigate(`/search/${debouncedValue}`);
        }
    };
    const handleClickSearch = () => {
        navigate(`/search/${debouncedValue}`);
    };
    return (
        <div className={cx("header")}>
            <div className={cx("logo")}>
                <img src={"./"} alt="" />
            </div>
            <div className={cx("pages")}>
                <Link className={cx("home")} to="/">
                    <FontAwesomeIcon className={cx("icon")} icon={faHome} />
                    <p>Home</p>
                </Link>
                <Link className={cx("tour")} to="/tour">
                    <FontAwesomeIcon icon={faWalking} />
                    <p>Tour</p>
                </Link>
                <Link className={cx("tour")} to="/fly">
                    <FontAwesomeIcon icon={faPlane} />
                    <p>Vé máy bay</p>
                </Link>
            </div>

            <div className={cx("search")}>
                <HeadlessTippy
                    interactive
                    visible={hideSearch}
                    content="Tìm kiếm"
                    onClickOutside={handleHideSearch}
                    render={(attrs) =>
                        hideSearch ? (
                            <div className={cx("searchResult")}>
                                <div className={cx("titleSearch")}>
                                    Kết quả tìm kiếm : {searchValue}
                                </div>
                                <div
                                    className={cx("listSearchResult")}
                                    tabIndex="-1"
                                    {...attrs}
                                >
                                    {searchResult.length > 0 ? (
                                        searchResult.map((item, index) => {
                                            return (
                                                <SearchItem
                                                    tourId={item.MaTour}
                                                    img={item.HinhAnh[0]}
                                                    key={index}
                                                    title={item.TenTour}
                                                    price={item.Gia}
                                                />
                                            );
                                        })
                                    ) : (
                                        <p>"Ko tìm thấy kết quả"</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p>Ko tìm thấy kết quả</p>
                        )
                    }
                >
                    <input
                        value={searchValue}
                        onKeyDown={handleEnter}
                        onChange={handleSearch}
                        onFocus={() => setHideSearch(false)}
                        className={cx("input")}
                        maxLength={30}
                        placeholder="Search here..."
                    />
                </HeadlessTippy>
                <Tippy
                    content={<span className={cx("tippyLabel")}>Tìm kiếm</span>}
                >
                    <FontAwesomeIcon
                        onClick={handleClickSearch}
                        className={cx("iconSearch")}
                        icon={faMagnifyingGlass}
                    />
                </Tippy>
            </div>
            <div className={cx("account")}>
                {userLogin ? (
                    <>
                        <HeadlessTippy
                            interactive
                            delay={[0, 300]}
                            offset={[12, 8]}
                            hideOnClick={false}
                            render={(attrs) => (
                                <div
                                    className={cx("menuUser")}
                                    tabIndex="-1"
                                    {...attrs}
                                >
                                    <div className={cx("userName")}>
                                        {userName}
                                    </div>
                                    {listMenuItem.map((item, index) => {
                                        return (
                                            <MenuItem
                                                to={item.to}
                                                key={index}
                                                icon={item.icon}
                                                title={item.title}
                                            />
                                        );
                                    })}

                                    {isAdmin ? (
                                        <MenuItem
                                            to={`/admin`}
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faUserGear}
                                                />
                                            }
                                            title={`Admin`}
                                        />
                                    ) : (
                                        ""
                                    )}

                                    <div
                                        className={cx("logOut")}
                                        onClick={handleLogOut}
                                    >
                                        <FontAwesomeIcon
                                            className={cx("iconLogOut")}
                                            icon={faSignOut}
                                        />
                                        <p>Log out</p>
                                    </div>
                                </div>
                            )}
                        >
                            <div className={cx("user")}>
                                <img
                                    className={cx("avatarUser")}
                                    src={userAvatar}
                                    alt=""
                                />
                            </div>
                        </HeadlessTippy>
                        {/* <p className={cx("nameUser")}>{userName}</p> */}
                    </>
                ) : (
                    <>
                        <button
                            className={cx("btnLogin")}
                            onClick={handleLoginClick}
                        >
                            Login
                        </button>
                        {formLogin ? (
                            <>
                                <div className={cx("form")} ref={formLoginRef}>
                                    <Form />
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default memo(Header);
