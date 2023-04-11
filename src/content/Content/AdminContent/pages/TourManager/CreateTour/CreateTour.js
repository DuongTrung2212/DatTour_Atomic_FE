import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useContext, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import requestAxios from "../../../../../../api/axios";
import Input from "../../../../../../components/Input";
import DecriptionForm from "../DecriptionForm/DecriptionForm";
import styles from "./CreateTour.module.scss";
import Select from "react-select";
import SelectCustom from "../../../../../../components/SelectCustom/SelectCustom";
import { variableLocal } from "../../../../../../varialeLocal";
import { DaTaChangeContext } from "../../..";

const cx = classNames.bind(styles);

function CreateTour() {
    const [imgSlide, setImgSlide] = useState([]);
    const [imgView, setImgView] = useState([]);
    const [decriptionForm, setDecriptionForm] = useState(false);
    const [dataDecription, setDataDecription] = useState([]);
    const [tenTour, setTenTour] = useState("");
    const [gia, setGia] = useState(0);
    const [soLuong, setSoLuong] = useState(0);
    const [diemDi, setDiemDi] = useState("");
    const [loaiTour, setLoaiTour] = useState([]);
    const [sale, setSale] = useState("");
    const [diemDon, setDiemDon] = useState("");
    const [HDVien, setHDVien] = useState(null);
    const [dataOptionsNhanVien, setDataOptionsNhanVien] = useState([]);
    const [ngayKT, setNgayKT] = useState("");
    const [ngayBD, setNgayBD] = useState("");
    const [showBtn, setShowBtn] = useState(true);
    const { changed, setChanged } = useContext(DaTaChangeContext);

    const fetchDataStaff = async () => {
        await requestAxios
            .get("nhanVien/freetime")
            .then((res) => {
                if (res.data.message == "OK") {
                    const respon = res.data.listNhanVien;
                    let dataOptions = [];
                    for (let index = 0; index < respon.length; index++) {
                        dataOptions.push({
                            value: respon[index].MaHDVien,
                            label: respon[index].TenHDVien,
                        });
                    }

                    setDataOptionsNhanVien(dataOptions);
                }
            })
            .catch((err) => {
                console.log("Err get all Staff at creatTour");
            });
    };

    useEffect(() => {
        fetchDataStaff();
    }, [changed]);
    const onChangeTentour = (value) => {
        setTenTour(value);
    };
    const onChangeGia = (value) => {
        setGia(value);
    };
    const onChangeSoLuong = (value) => {
        setSoLuong(value);
    };
    const onChangeSale = (value) => {
        setSale(value);
    };
    const onChangeDiemDi = (value) => {
        setDiemDi(value);
    };
    const onChangeDiemDon = (value) => {
        setDiemDon(value);
    };
    const onChangeMaHDVien = (value) => {
        setHDVien(value);
    };
    const onChangeNgayKT = (value) => {
        setNgayKT(value);
    };
    const onChangeNgayBD = (value) => {
        setNgayBD(value);
    };

    const handleUploadSlide = (e) => {
        // formData.append(e.target.files[0]);
        let view = [];
        let imgList = [];

        for (var i = 0; i < e.target.files.length; i++) {
            view.push(URL.createObjectURL(e.target.files[i]));
            imgList.push(e.target.files[i]);
        }
        setImgSlide(imgList);
        setImgView(view);
        // console.log(e.target.files);
    };
    const decriptionRef = useRef();
    useEffect(() => {
        let handle = (e) => {
            try {
                if (!decriptionRef.current.contains(e.target))
                    setDecriptionForm(false);
            } catch {}
        };
        if (handle) document.addEventListener("mousedown", handle);
    });
    const handleAddDecription = (data) => {
        const newData = [...dataDecription, data];
        setDataDecription(newData);
        setDecriptionForm(false);
    };
    const handleSubmit = async () => {
        if (
            imgSlide.length < 2 ||
            dataDecription.length == 0 ||
            tenTour.trim() == "" ||
            gia == 0 ||
            soLuong == 0 ||
            diemDi.trim() == "" ||
            diemDon.trim() == "" ||
            loaiTour.length == 0 ||
            HDVien == null ||
            ngayBD == "" ||
            ngayKT == ""
        ) {
            toast.warning("Bro vui lòng kiểm tra lại các trường");
            return;
        }
        setShowBtn(false);
        let formData = new FormData();
        // console.log(imgSlide);
        const dateBD = ngayBD.split("-");
        const dateKT = ngayKT.split("-");
        imgSlide.forEach((item) => {
            formData.append("HinhAnh", item);
        });
        loaiTour.forEach((item, index) => {
            formData.append("LoaiTour", item.value);
        });

        dataDecription.forEach((item) => {
            formData.append("titleMoTa", item.dataDecription.title);
            formData.append("imgMoTa", item.dataDecription.file);
            formData.append("contentMoTa", item.dataDecription.content);
            console.log(formData.get("contentMoTa"));
        });

        formData.append("TenTour", tenTour);
        formData.append("Gia", gia);
        formData.append("SoLuong", soLuong);
        formData.append("DiemDi", diemDi);
        formData.append("DiemDon", diemDon);
        formData.append("Sale", sale);
        formData.append("MaHDVien", HDVien.value);
        formData.append("NgayBD", `${dateBD[2]}/${dateBD[1]}/${dateBD[0]}`);
        formData.append("NgayKT", `${dateKT[2]}/${dateKT[1]}/${dateKT[0]}`);
        await requestAxios
            .post("tour", formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                if (res.data.message == "OK") {
                    toast.success("OK");

                    setChanged(changed + 1);
                }
                setShowBtn(true);
            })
            .catch((err) => {
                console.log("Err asdad");
                setShowBtn(true);
            });
    };
    return (
        <div className={cx("createTour")}>
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
            <h2>THÊM TOUR</h2>
            <div>
                <h4>Ảnh slide</h4>
                <div className={cx("slideList")}>
                    {imgView.map((src, index) => {
                        return (
                            <img
                                key={index}
                                className={cx("slideImg")}
                                src={src}
                            />
                        );
                    })}
                </div>

                <input
                    onChange={handleUploadSlide}
                    type={"file"}
                    accept="image/*"
                    multiple
                />
                <Input
                    onChangeValue={onChangeTentour}
                    notNull
                    label={"Tên tour"}
                />
                <Input
                    onChangeValue={onChangeGia}
                    type="number"
                    min={0}
                    notNull
                    label={"Giá"}
                />

                {dataDecription.length > 0 ? (
                    <div>{`${dataDecription.length} được chọn`}</div>
                ) : (
                    ""
                )}
                {decriptionForm ? (
                    <div ref={decriptionRef}>
                        <DecriptionForm onSubmit={handleAddDecription} />
                    </div>
                ) : (
                    ""
                )}
                <label className={cx("ct")}>Thêm nội dung</label>
                <button
                    onClick={() => setDecriptionForm(true)}
                    className={cx("plus")}
                >
                    <FontAwesomeIcon icon={faAdd} />
                </button>
                <Input
                    onChangeValue={onChangeSoLuong}
                    min={1}
                    type="number"
                    label={"Số lượng"}
                />
                <Input
                    onChangeValue={onChangeDiemDi}
                    notNull
                    label={"Điểm đi"}
                />
                <SelectCustom
                    isMulti
                    label={"Loại Tour"}
                    options={variableLocal.dataLoaiTour}
                    onChange={(e) => {
                        setLoaiTour(e);
                    }}
                />

                <Input
                    onChangeValue={onChangeSale}
                    notNull
                    min={0}
                    defaultValue={0}
                    type="number"
                    label={"Sale"}
                />
                <Input
                    onChangeValue={onChangeDiemDon}
                    notNull={true}
                    label={"Điểm đón"}
                />
                <SelectCustom
                    label={"Hướng dẫn viên"}
                    options={dataOptionsNhanVien}
                    onChange={(e) => {
                        setHDVien(e);
                    }}
                />

                <Input
                    onChangeValue={onChangeNgayBD}
                    type="date"
                    label={"Ngày bắt đầu"}
                />
                <Input
                    onChangeValue={onChangeNgayKT}
                    type="date"
                    label={"Ngày kết thúc"}
                />

                {showBtn ? (
                    <button className={cx("btnSubmit")} onClick={handleSubmit}>
                        Submit
                    </button>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default CreateTour;
