import { faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Input from "../../../../../../components/Input";
import styles from "./UpdateForm.module.scss";
import Files from "react-files";
import requestAxios from "../../../../../../api/axios";
import Select from "react-select";
import DecriptionForm from "../DecriptionForm/DecriptionForm";
import { ToastContainer, toast } from "react-toastify";
import { variableLocal } from "../../../../../../varialeLocal";
import { useContext } from "react";
import { DaTaChangeContext } from "../../..";
import SelectCustom from "../../../../../../components/SelectCustom/SelectCustom";

const cx = classNames.bind(styles);

let options = [
    { value: true, label: "Mở" },
    { value: false, label: "Đóng" },
];

function UpdateForm({ tourId }) {
    const [nameTour, setNameTour] = useState("");
    const [priceTour, setPriceTour] = useState(0);
    const [showImgSlide, setShowImgSlide] = useState(false);
    const [showMoTa, setShowMoTa] = useState(false);
    const [imgSlide, setImgSlide] = useState([]);
    const [viewNewSlide, setViewNewSlide] = useState([]);
    const [soLuong, setSoLuong] = useState(0);
    const [diemDi, setDiemDi] = useState("");
    const [ngayBD, setNgayBD] = useState("");
    const [ngayKT, setNgayKT] = useState("");
    const [diemDon, setDiemDon] = useState("");
    const [sale, setSale] = useState(0);
    const [tinhTrang, setTinhTrang] = useState(true);
    const [loaiTour, setLoaiTour] = useState([]);
    const [moTa, setMoTa] = useState([]);
    const [viewNewMoTa, setViewNewMoTa] = useState([]);
    const [HDVien, setHDVien] = useState({});
    const [showSelectedLoaiTour, setShowSelectedLoaiTour] = useState(false);
    const [showFormDecription, setShowFormDecription] = useState(false);
    const [dataDecription, setDataDecription] = useState([]);
    const [optionsStaff, setOptionsStaff] = useState([]);
    const [showBtn, setShowBtn] = useState(true);
    const { changed, setChanged } = useContext(DaTaChangeContext);

    const handleSlideFileChange = (files) => {
        let view = [];
        for (let i = 0; i < files.length; i++) {
            view.push(URL.createObjectURL(files[i]));
        }
        setViewNewSlide(view);
        setImgSlide(files);
    };

    const showImgSlideRef = useRef();
    const showMoTaRef = useRef();

    const getNameTour = (data) => {
        setNameTour(data);
    };
    const getPriceTour = (data) => {
        setPriceTour(data);
    };
    const getSoLuongTour = (data) => {
        setSoLuong(data);
    };
    const getDiemDiTour = (data) => {
        setDiemDi(data);
    };
    const getNgayBDTour = (data) => {
        setNgayBD(data);
    };
    const getNgayKTTour = (data) => {
        setNgayKT(data);
    };
    const getDiemDonTour = (data) => {
        setDiemDon(data);
    };
    const getSaleTour = (data) => {
        setSale(data);
    };

    const fetchDataAllStaff = async () => {
        await requestAxios
            .get(`nhanVien/freetime`)
            .then((res) => {
                if (res.data.message === "OK") {
                    console.log(res.data.listNhanVien.length);
                    var listDataOptions = [];
                    for (var i = 0; i < res.data.listNhanVien.length; i++) {
                        listDataOptions.push({
                            value: res.data.listNhanVien[i].MaHDVien,
                            label: res.data.listNhanVien[i].TenHDVien,
                        });
                    }
                    setOptionsStaff(listDataOptions);
                }
            })
            .catch((err) => console.log("Loi fecth dat all staff"));
    };
    useEffect(() => {
        const fetchData = async () => {
            await requestAxios
                .get(`tour/${tourId}`)
                .then((res) => {
                    if (res.data.message === "OK") {
                        var dataLoaiTour = [];
                        setNameTour(res.data.tour.TenTour);
                        setPriceTour(res.data.tour.Gia);
                        setImgSlide(res.data.tour.HinhAnh);
                        setMoTa(res.data.tour.MoTa);
                        setSoLuong(res.data.tour.SoLuong);
                        setDiemDi(res.data.tour.DiemDi);
                        setNgayBD(
                            res.data.tour.NgayBD.split("/")
                                .reverse()
                                .toString()
                                .replace(/,/g, "-")
                        );
                        setNgayKT(
                            res.data.tour.NgayKT.split("/")
                                .reverse()
                                .toString()
                                .replace(/,/g, "-")
                        );
                        for (
                            let index = 0;
                            index < res.data.tour.LoaiTour.length;
                            index++
                        ) {
                            var label = "";
                            switch (res.data.tour.LoaiTour[index]) {
                                case "TTN":
                                    label = "Tour tự nhiên";
                                    break;
                                case "TB":
                                    label = "Tour biển";
                                    break;
                                case "TTQ":
                                    label = "Tour tham quan";
                                    break;

                                default:
                                    break;
                            }
                            dataLoaiTour.push({
                                value: res.data.tour.LoaiTour[index],
                                label: label,
                            });
                        }
                        var labelTinhTrang = "";
                        switch (res.data.tour.TinhTrang) {
                            case true:
                                labelTinhTrang = "Mở";
                                break;
                            case false:
                                labelTinhTrang = "Đóng";
                                break;
                            default:
                                break;
                        }

                        setLoaiTour(dataLoaiTour);
                        setDiemDon(res.data.tour.DiemDon);
                        setSale(res.data.tour.Sale);

                        setTinhTrang({
                            value: res.data.tour.TinhTrang,
                            label: labelTinhTrang,
                        });

                        setHDVien({
                            value: res.data.HDVien.MaHDVien,
                            label: res.data.HDVien.TenHDVien,
                        });
                        // setIdHDVien(res.data.tour.MaHDVien);
                    }
                })
                .catch((err) => console.log("Err fetch data Updateform"));
        };
        fetchData();
        fetchDataAllStaff();
    }, [changed, tourId]);

    useEffect(() => {
        let handleSlide = (e) => {
            try {
                if (!showImgSlideRef.current.contains(e.target))
                    setShowImgSlide(false);
            } catch {}
        };
        let handleMoTa = (e) => {
            try {
                if (!showMoTaRef.current.contains(e.target)) setShowMoTa(false);
            } catch {}
        };
        if (handleSlide) document.addEventListener("mousedown", handleSlide);
        if (handleMoTa) document.addEventListener("mousedown", handleMoTa);
    });
    const handleClickShowImgSlide = () => {
        if (showImgSlide) setShowImgSlide(false);
        else setShowImgSlide(true);
    };
    const handleClickShowMoTa = () => {
        if (showImgSlide) setShowMoTa(false);
        else setShowMoTa(true);
    };

    const handleClickShowLoaiTour = () => {
        if (showSelectedLoaiTour) setShowSelectedLoaiTour(false);
        else setShowSelectedLoaiTour(true);
    };
    const handleClickShowAddMoTa = () => {
        if (showFormDecription) setShowFormDecription(false);
        else setShowFormDecription(true);
    };

    const handleAddMoTa = (data) => {
        const newData = [...dataDecription, data];
        const newMoTa = [];
        newData.forEach((item) => {
            newMoTa.push(item.dataDecription);
        });
        // console.log(data);
        const view = window.URL.createObjectURL(data.dataDecription.file);
        const newView = [...viewNewMoTa, view];
        setViewNewMoTa(newView);
        setMoTa(newMoTa);
        setDataDecription(newData);
        setShowFormDecription(false);
        // console.log(newData);
    };
    const handleSubmitUpdate = async () => {
        setShowBtn(false);
        let formData = new FormData();
        if (viewNewMoTa.length > 0) {
            moTa.forEach((item) => {
                formData.append("titleMoTa", item.title);
                formData.append("imgMoTa", item.file);
                formData.append("contentMoTa", item.content);
            });
        }
        if (viewNewSlide.length > 0) {
            // console.log(moTa);
            imgSlide.forEach((item) => {
                formData.append("HinhAnh", item);
            });
        }

        formData.append("TenTour", nameTour);
        formData.append("TinhTrang", tinhTrang.value);
        formData.append("Gia", priceTour);
        formData.append("SoLuong", soLuong);
        formData.append("DiemDi", diemDi);
        formData.append(
            "NgayBD",
            ngayBD.split("-").reverse().toString().replace(/,/g, "/")
        );
        formData.append(
            "NgayKT",
            ngayKT.split("-").reverse().toString().replace(/,/g, "/")
        );
        formData.append("MaHDVien", HDVien.value);
        formData.append("Sale", sale);
        formData.append("DiemDon", diemDon);
        loaiTour.forEach((item) => {
            formData.append("LoaiTour", item.value);
        });

        await requestAxios
            .patch(`tour/${tourId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                if (res.data.message === "OK") {
                    setShowBtn(true);
                    toast.success("Thành công");
                    setChanged(changed + 1);
                }
            })
            .catch((err) => console.log("Err update tour"));
    };
    // console.log(moTa);
    return (
        <div className={cx("updateForm")}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <Input
                onChangeValue={getNameTour}
                value={nameTour}
                label={"Tên tour"}
            />
            <Input
                onChangeValue={getPriceTour}
                value={priceTour}
                label={"Giá"}
            />

            <div className={cx("imgSlide")}>
                <b>Slide</b>
                <div className={cx("action")}>
                    <p>
                        {`${imgSlide.length} ${
                            viewNewSlide.length > 0 ? "Items mới" : "Items"
                        }`}
                    </p>
                    <Files
                        accepts={["image/*"]}
                        multiple
                        onChange={handleSlideFileChange}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </Files>
                    <div
                        className={cx("icon")}
                        onClick={handleClickShowImgSlide}
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </div>
                    {showImgSlide ? (
                        <div ref={showImgSlideRef}>
                            <div className={cx("showImgSlide")}>
                                {imgSlide.map((img, index) => {
                                    return (
                                        <div key={index}>
                                            <p>{`Ảnh ${index + 1}`}</p>
                                            <img
                                                src={
                                                    viewNewSlide.length > 0
                                                        ? viewNewSlide[index]
                                                        : `${process.env.REACT_APP_API_IMG_URL}${img}`
                                                }
                                                alt=""
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div className={cx("decription")}>
                <b>Mô tả</b>
                <div className={cx("action")}>
                    <p>{`${moTa.length} Items`}</p>
                    <FontAwesomeIcon
                        onClick={handleClickShowAddMoTa}
                        icon={faPen}
                    />
                    <div className={cx("icon2")} onClick={handleClickShowMoTa}>
                        <FontAwesomeIcon icon={faEye} />
                    </div>
                    {showMoTa ? (
                        <div ref={showMoTaRef}>
                            <div className={cx("showMoTa")}>
                                {moTa.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <b>{item.title}</b>
                                            <img
                                                src={
                                                    viewNewMoTa.length > 0
                                                        ? viewNewMoTa[index]
                                                        : `${process.env.REACT_APP_API_IMG_URL}${item.img}`
                                                }
                                                alt=""
                                            />
                                            <p>{item.content}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                {showFormDecription ? (
                    <div className={cx("decriptionForm")}>
                        <DecriptionForm onSubmit={handleAddMoTa} />
                    </div>
                ) : (
                    ""
                )}
            </div>

            <SelectCustom
                label={"Tình trạng"}
                className={cx("select")}
                value={tinhTrang}
                onChange={(e) => {
                    setTinhTrang(e);
                }}
                options={options}
            />

            <Input
                onChangeValue={getSoLuongTour}
                value={soLuong}
                label={"Số Lượng"}
            />
            <Input
                onChangeValue={getDiemDiTour}
                value={diemDi}
                label={"Điểm đi"}
            />
            <Input
                onChangeValue={getNgayBDTour}
                type="date"
                value={ngayBD}
                label={"Ngày bắt đầu"}
            />
            <Input
                onChangeValue={getNgayKTTour}
                type="date"
                value={ngayKT}
                label={"Ngày kết thúc"}
            />
            <div>
                <Select
                    className={cx("select")}
                    value={HDVien}
                    onChange={(e) => {
                        // setSelectedHDVien(e);
                        setHDVien(e);
                    }}
                    options={optionsStaff}
                />
            </div>
            <Input
                onChangeValue={getDiemDonTour}
                value={diemDon}
                label={"Điểm đón"}
            />
            <Input
                onChangeValue={getSaleTour}
                min={0}
                type="number"
                value={sale}
                label={"Sale"}
            />
            <b>
                Loại tour
                <FontAwesomeIcon
                    onClick={handleClickShowLoaiTour}
                    icon={faPen}
                />
            </b>
            <div>
                <Select
                    isMulti
                    className={cx("select")}
                    value={loaiTour}
                    onChange={(item) => {
                        // var data = [];
                        // for (let index = 0; index < item.length; index++) {
                        //     data.push(item[index].value);
                        // }
                        // dataTour.LoaiTour = data;
                        setLoaiTour(item);
                    }}
                    options={variableLocal.dataLoaiTour}
                />
            </div>

            <button onClick={showBtn ? handleSubmitUpdate : null}>
                Submit
            </button>
        </div>
    );
}

export default UpdateForm;
