import SlideImage from "../../../components/SlideImage";
import classNames from "classnames/bind";
import styles from "./InforTourContent.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { TourContext } from "../../../layouts/MainLayout/MainLayout";
import { useParams, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import requestAxios from "../../../api/axios";
import { UserContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import Input from "../../../components/Input";
import { InputNumber } from "antd";

const cx = classNames.bind(styles);

function InforTourContent() {
    const userLogin = useContext(UserContext);
    const tourId = useContext(TourContext);
    const [dataTour, setDataTour] = useState({});
    const [moTa, setMoTa] = useState([]);
    const [dataBuy, setDataBuy] = useState([]);
    const [price, setPrice] = useState(0);
    const [formBuy, setFormBuy] = useState(false);
    const [CCCD, setCCCD] = useState("");
    const [soLuongDat, setSoLuongDat] = useState(1);
    const [soLuongCon, setSoLuongCon] = useState(0);
    let formBuyRef = useRef();
    const getValueCCCD = (cccd) => {
        setCCCD(cccd);
    };
    const getValueSoLuong = (sl) => {
        setSoLuongDat(sl);
    };
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
                    setSoLuongCon(res.data.tour.SoLuong);
                    setDataBuy([
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
                            value: `${res.data.tour.Gia.toLocaleString()} VND`,
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
                            value: `${res.data.tour.Sale} %`,
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
    }, [tourId, soLuongCon]);
    useEffect(() => {
        // if (props.getUser) props.getUser(userLogin);
        let handle = (e) => {
            try {
                if (!formBuyRef.current.contains(e.target)) setFormBuy(false);
            } catch {}
        };
        if (handle) document.addEventListener("mousedown", handle);
    });
    const handleBuyClick = () => {
        userLogin
            ? setFormBuy(true)
            : toast.warn("Bạn chưa đăng nhập!", {
                  icon: <FontAwesomeIcon icon={faUndo} />,
              });
    };
    const handleSubmit = async () => {
        if (CCCD.length <= 5 || isNaN(CCCD) || soLuongDat <= 0) {
            toast.warn("Hãy nhập đầy đủ", {
                icon: <FontAwesomeIcon icon={faUndo} />,
            });
        } else {
            await requestAxios
                .post("datTour", {
                    MaTour: dataTour.MaTour,
                    MaNV: dataTour.MaTour,
                    NgayBD: dataTour.NgayBD,
                    NgayKT: dataTour.NgayKT,
                    SLNguoi: soLuongDat,
                })
                .then((res) => {
                    setSoLuongCon(res.data.SoLuongCon);
                    setFormBuy(false);
                    toast.success("Đã đặt");
                    console.log(res.data.newTicket);
                })
                .catch((err) => console.log("Err dat tour "));
        }
    };
    return (
        <div className={cx("infoTourContent")}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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
                            {dataBuy.map((item, index) => {
                                return (
                                    <tr key={index}>
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
                        <button onClick={handleBuyClick}>Đặt vé</button>
                    </div>
                </div>
            </div>
            {formBuy ? (
                <div className={cx("formBuy")} ref={formBuyRef}>
                    <h2>Thông tin</h2>
                    <Input
                        onChangeValue={getValueCCCD}
                        notNull={true}
                        label="CCCD"
                        placeholder="Nhập CCCD"
                    />

                    <Input
                        onChangeValue={getValueSoLuong}
                        minLength={0}
                        maxLength={dataTour.SoLuong}
                        isNumber
                        notNull={true}
                        label="Số lượng người"
                        placeholder="SL"
                    />
                    <button onClick={handleSubmit} className={cx("btnFormBuy")}>
                        Xác nhận
                    </button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default InforTourContent;
