import SlideImage from "../../../components/SlideImage";
import classNames from "classnames/bind";
import styles from "./InforTourContent.module.scss";
import { useContext, useEffect, useState } from "react";
import { TourContext } from "../../../layouts/MainLayout/MainLayout";
import { useParams, useSearchParams } from "react-router-dom";
import requestAxios from "../../../api/axios";
import { UserContext } from "../../../App";

const cx = classNames.bind(styles);

function InforTourContent() {
    const userLogin = useContext(UserContext);
    const tourId = useContext(TourContext);
    const [dataTour, setDataTour] = useState({});
    const [moTa, setMoTa] = useState([]);
    const [dataPay, setDataPay] = useState([]);
    const [price, setPrice] = useState(0);
    useEffect(() => {
        requestAxios
            .get(`tour/${tourId.tourId}`)
            .then((res) => {
                if (res.data) {
                    setDataTour(res.data.tour);
                    setMoTa(res.data.tour.MoTa);
                    setPrice(
                        res.data.tour.Gia -
                            (res.data.tour.Gia * res.data.tour.Sale) / 100
                    );
                    setDataPay([
                        {
                            name: "Tên tour",
                            value: res.data.tour.TenTour,
                        },
                        {
                            name: "Điểm đi",
                            value: res.data.tour.DiemDi,
                        },
                        {
                            name: "Điểm đón",
                            value: res.data.tour.DiemDon,
                        },
                        {
                            name: "Giá",
                            value: res.data.tour.Gia,
                        },
                        {
                            name: "Ngày bắt đầu",
                            value: res.data.tour.NgayBD,
                        },
                        {
                            name: "Ngày kết thúc",
                            value: res.data.tour.NgayKT,
                        },
                        {
                            name: "Sale",
                            value: res.data.tour.Sale,
                        },
                        {
                            name: "Số lượng còn",
                            value: res.data.tour.SoLuong,
                        },
                    ]);
                }
            })
            .catch((err) => {
                console.log("Loi");
            });
    }, [tourId]);
    console.log(moTa);
    return (
        <div className={cx("infoTourContent")}>
            <SlideImage slides={dataTour.HinhAnh} />
            <h1 className={cx("nameTour")}>{dataTour.TenTour}</h1>
            <div className={cx("detail")}>
                <div className={cx("description")}>
                    {moTa.map((item, index) => {
                        return (
                            <div key={index} className={cx("introduce")}>
                                <h3 className={cx("title")}>{item.title}</h3>
                                <p className={cx("content")}>{item.content}</p>
                                <img
                                    src={`${process.env.REACT_APP_API_IMG_URL}${item.img}`}
                                    // src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg"
                                    alt=""
                                />
                            </div>
                        );
                    })}
                </div>

                <div className={cx("bookTour")}>
                    <table>
                        <tbody>
                            {dataPay.map((item) => {
                                return (
                                    <tr>
                                        <th>
                                            <p>{item.name}</p>
                                        </th>
                                        <td>
                                            <p>{item.value}</p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className={cx("price")}>
                        <p>{price.toLocaleString()} VND</p>
                        <button
                            onClick={() =>
                                userLogin
                                    ? console.log("Đã đăng nhập")
                                    : console.log("Chưa đăng nhập")
                            }
                        >
                            Đặt vé
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InforTourContent;
