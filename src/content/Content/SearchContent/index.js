import { useContext, useEffect, useState } from "react";
import { TourContext } from "../../../layouts/MainLayout/MainLayout";
import requestAxios from "../../../api/axios";
import SearchItem from "../../../components/SearchItem";
import TourItem from "../../../components/TourItem";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
const cx = classNames.bind(styles);
function SearchContent() {
    const { valueSearch } = useContext(TourContext);
    const [resDataSearch, setResDataSearch] = useState([]);
    const fetchDataSearch = async () => {
        await requestAxios
            .get(`tour/search/${valueSearch}`)
            .then((res) => {
                if (res.data.message == "OK") {
                    setResDataSearch(res.data.listSearch);
                } else {
                    setResDataSearch([]);
                }
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchDataSearch();
    });
    return (
        <div className={cx("searchContent")}>
            <h2>Kết quả tìm kiếm : {valueSearch}</h2>
            <div className={cx("listSearch")}>
                {resDataSearch.map((tour, index) => {
                    return (
                        <TourItem
                            tourId={tour.MaTour}
                            key={index}
                            img={tour.HinhAnh[0]}
                            title={tour.TenTour}
                            start={tour.NgayBD}
                            end={tour.NgayKT}
                            location={tour.DiemDi}
                            price={tour.Gia}
                            sale={tour.Sale}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default SearchContent;
