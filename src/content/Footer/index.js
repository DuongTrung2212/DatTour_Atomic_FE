import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { variableLocal } from "../../varialeLocal";
const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx("footer")}>
            <div className={cx("top")}>
                <div className={cx("list")}>
                    <h3>VỀ ATOMIC</h3>
                    <ul>
                        <li>
                            <Link>Chúng tôi</Link>
                        </li>
                        <li>
                            <Link>Lớp 19CT2</Link>
                        </li>
                        <li>
                            <Link>Kiến trúc Đà Nẵng</Link>
                        </li>
                    </ul>
                </div>
                <div className={cx("list")}>
                    <h3>THÔNG TIN CẦN BIẾT</h3>
                    <ul>
                        <li>
                            <Link>Điều kiện & điều khoản</Link>
                        </li>
                        <li>
                            <Link>Quy chế hoạt động</Link>
                        </li>
                        <li>
                            <Link>Câu hỏi thường gặp</Link>
                        </li>
                    </ul>
                </div>
                <div className={cx("list")}>
                    <h3>ĐỐI TÁC VÀ LIÊN KẾT</h3>
                    <ul>
                        <li>
                            <Link>Shadow Garden</Link>
                        </li>
                        <li>
                            <Link
                                to={
                                    "https://www.facebook.com/duong.trung.122001/"
                                }
                            >
                                Dương Trung
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={
                                    "https://www.facebook.com/profile.php?id=100026817915033"
                                }
                            >
                                Tấn Quốc
                            </Link>
                        </li>
                        <li>
                            <Link to={"https://www.facebook.com/aanhthien96"}>
                                Anh Thiên
                            </Link>
                        </li>

                        <li>
                            <Link
                                to={
                                    "https://www.facebook.com/profile.php?id=100010904075188"
                                }
                            >
                                Quang Huy
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"https://www.facebook.com/truongquangtron"}
                            >
                                Chính Đức
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx("logo")}>
                    <h3>ĐƯỢC CHỨNG NHẬN</h3>
                    <img
                        src="https://webmedia.com.vn/images/2021/09/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png"
                        alt=""
                        width={150}
                    />
                </div>
            </div>
            <div className={cx("bot")}></div>
            <Link to={"https://www.facebook.com/messages/t/100008085704696"}>
                <div className={cx("help")}>
                    <div className={cx("message")}>
                        <FontAwesomeIcon icon={faMessage} flip="horizontal" />
                        <p className={cx("helpText")}>Bạn cần hỗ trợ ?</p>
                    </div>
                    <img src={variableLocal.iconRaiden} alt="" />
                </div>
            </Link>
        </div>
    );
}

export default Footer;
