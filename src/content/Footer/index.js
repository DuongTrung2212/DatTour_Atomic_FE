import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
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
                            <Link>Dương Trung</Link>
                        </li>
                    </ul>
                </div>
                <div className={cx("logo")}>
                    <h3>ĐƯỢC CHỨNG NHẬN</h3>
                    <img src="https://webmedia.com.vn/images/2021/09/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png" width={150}/>
                </div>
            </div>
            <div className={cx("bot")}>
                <div>
                    <p>@@@atomic.com</p>
                    <p>adasdsad</p>
                    <p>asdad</p>
                </div>
                <div>
                    <h3>Ket noi</h3>
                </div>
            </div>
        </div>
    );
}

export default Footer;
