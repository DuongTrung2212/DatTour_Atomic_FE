import Tour from "../../../../components/Tour";
import classNames from "classnames/bind";
import styles from "./CategoryTour.module.scss";
const cx = classNames.bind(styles);
function CategoryTour(props) {
    return (
        <div className={cx("tour")}>
            <p className={cx("titleTour")}>{props.category}</p>
            <div className={cx("tourList")}>
                {props.listTour.map((tour, index) => {
                    return (
                        <Tour
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

export default CategoryTour;
