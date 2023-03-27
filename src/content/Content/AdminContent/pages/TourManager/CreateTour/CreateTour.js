import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import requestAxios from "../../../../../../api/axios";
import Input from "../../../../../../components/Input";
import DecriptionForm from "../DecriptionForm/DecriptionForm";
import styles from "./CreateTour.module.scss";
const cx = classNames.bind(styles);
function CreateTour() {
    const [imgSlide, setImgSlide] = useState([]);
    const [imgView, setImgView] = useState([]);
    const [decriptionForm, setDecriptionForm] = useState(false);
    const [dataDecription, setDataDecription] = useState([]);
    const [tenTour, setTenTour] = useState(0);
    const [gia, setGia] = useState(0);
    const [soLuong, setSoLuong] = useState(0);
    const [diemDi, setDiemDi] = useState(0);
    const [loaiTour, setLoaiTour] = useState("");
    const [sale, setSale] = useState("");
    const [diemDon, setDiemDon] = useState("");
    const [maHDVien, setMaHDVien] = useState("");
    const [ngayKT, setNgayKT] = useState("");
    const [ngayBD, setNgayBD] = useState("");

    const onChangeTentour = (value) => {
        setTenTour(value);
    };
    const onChangeGia = (value) => {
        setGia(value);
    };
    const onChangeSoLuong = (value) => {
        setSoLuong(value);
    };
    const onChangeLoaiTour = (value) => {
        setLoaiTour(value);
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
        setMaHDVien(value);
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
        // console.log(dataDecription);
        setDecriptionForm(false);
    };
    const handleSubmit = async () => {
        let formData = new FormData();
        // console.log(imgSlide);
        const dateBD = ngayBD.split("-");
        const dateKT = ngayKT.split("-");
        imgSlide.forEach((item) => {
            formData.append("HinhAnh", item);
        });

        dataDecription.forEach((item) => {
            // console.log(item.dataDecription.title);
            formData.append("titleMoTa", item.dataDecription.title);
            formData.append("imgMoTa", item.dataDecription.file);
            formData.append("contentMoTa", item.dataDecription.content);
        });
        formData.append("TenTour", tenTour);
        formData.append("Gia", gia);
        formData.append("SoLuong", soLuong);
        formData.append("DiemDi", diemDi);
        formData.append("DiemDon", diemDon);
        formData.append("LoaiTour", loaiTour);
        formData.append("Sale", sale);
        formData.append("MaHDVien", maHDVien);
        formData.append("NgayBD", `${dateBD[2]}/${dateBD[1]}/${dateBD[0]}`);
        formData.append("NgayKT", `${dateKT[2]}/${dateKT[1]}/${dateKT[0]}`);
        await requestAxios
            .post("tour", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log("Err asdad");
            });
    };
    return (
        <div className={cx("createTour")}>
            <div>
                <h3>Ảnh slide</h3>
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
                <Input onChangeValue={onChangeGia} notNull label={"Giá"} />

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
                <button onClick={() => setDecriptionForm(true)}>
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
                <Input
                    onChangeValue={onChangeLoaiTour}
                    notNull
                    label={"Loại tour"}
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
                <Input
                    onChangeValue={onChangeMaHDVien}
                    notNull
                    label={"Mã HDVien"}
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

                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default CreateTour;
