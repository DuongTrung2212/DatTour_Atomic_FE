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
                            <Link>AAA</Link>
                        </li>
                        <li>
                            <Link>AAA</Link>
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
                <div>
                    <h3>ĐƯỢC CHỨNG NHẬN</h3>
                    <img />
                </div>
            </div>
            <div className={cx("bot")}>
                <div>
                    <p>asdasds</p>
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
