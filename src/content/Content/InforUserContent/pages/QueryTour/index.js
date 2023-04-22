import { useState, useContext, useEffect } from "react";
import requestAxios from "../../../../../api/axios";
import TourUserItem from "../../TourUserItem";

import { DataUserChangeContext } from "../../../../../App";
import classNames from "classnames/bind";
import styles from "./QueryTour.module.scss";
const cx = classNames.bind(styles);
function QueryTour({ verifyPass, verified, typeQuery }) {
    const [allTicket, setAllTicket] = useState([]);
    const { dataUserChange } = useContext(DataUserChangeContext);

    useEffect(() => {
        const fetchDataTicket = async () => {
            await requestAxios
                .get(`datTour/filter/${typeQuery}`)
                .then((res) => {
                    if (res.data.message === "OK") setAllTicket(res.data.data);
                })
                .catch((err) => {
                    console.log("Err loi fetch data all ticket");
                });
        };
        fetchDataTicket();
    }, [dataUserChange, typeQuery]);

    return (
        <div className={cx("queryTour")}>
            {allTicket.length > 0 ? (
                allTicket.map((ticket, index) => {
                    return (
                        <TourUserItem
                            verifyPass={verifyPass}
                            verified={verified}
                            ticketId={ticket.MaVe}
                            key={index}
                            date={ticket.NgayDat}
                            quantity={ticket.SLNguoi}
                            price={ticket.Tour.Gia}
                            name={ticket.Tour.TenTour}
                            img={ticket.Tour.HinhAnh[0]}
                            status={ticket.TinhTrang}
                            sale={ticket.Tour.Sale}
                        />
                    );
                })
            ) : (
                <p className={cx("message")}>Không có dữ liệu</p>
            )}
        </div>
    );
}

export default QueryTour;
