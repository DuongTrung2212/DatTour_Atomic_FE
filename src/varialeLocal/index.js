import img from "../assets/img/bg.jpg";
import imgNotFound from "../assets/img/imgNotFound.webp";
import logoAtomic from "../assets/img/logoAtomic.png";
import iconRaiden from "../assets/img/iconRaiden.png";
const variableLocal = {
    dataLoaiTour: [
        {
            value: "TTN",
            label: "Tour tự nhiên",
        },
        {
            value: "TTQ",
            label: "Tour tham quan",
        },
        {
            value: "TB",
            label: "Tour biển",
        },
    ],
    dataGender: [
        {
            value: "Nam",
            label: "Nam",
        },
        {
            value: "Nữ",
            label: "Nữ",
        },
    ],
    dataStatus: [
        {
            value: "CD",
            label: "Đang chờ duyệt",
        },
        {
            value: "DD",
            label: "Đã duyệt",
        },
        {
            value: "HT",
            label: "Hoàn Thành",
        },
    ],
    dataStatusUpdateTour: [
        {
            value: "CD",
            label: "Đang chờ duyệt",
        },
        {
            value: "DD",
            label: "Đã duyệt",
        },
        {
            value: "TC",
            label: "Từ chối",
        },
    ],

    mainBackground: img,
    imgNotFound: imgNotFound,
    logoAtomic,
    iconRaiden,
};
export { variableLocal };
