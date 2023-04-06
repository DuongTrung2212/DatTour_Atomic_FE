import { useContext, useEffect } from "react";
import requestAxios from "../../../../../api/axios";
import TourUserItem from "../../TourUserItem";
import { useState } from "react";
import { DataUserChangeContext } from "../../../../../App";

function AllTour() {
    const [allTicket, setAllTicket] = useState([]);
    const { dataUserChange, setDataUserChange } = useContext(
        DataUserChangeContext
    );
    const fetchDataTicket = async () => {
        await requestAxios
            .get(`datTour/filter/all`)
            .then((res) => {
                if (res.data.data) setAllTicket(res.data.data);
            })
            .catch((err) => {
                console.log("Err loi fetch data all ticket");
            });
    };
    useEffect(() => {
        fetchDataTicket();
    }, [dataUserChange]);

    return (
        <div>
            {allTicket.map((ticket, index) => {
                return (
                    <TourUserItem
                        ticketId={ticket.ticket.MaVe}
                        key={index}
                        date={ticket.ticket.NgayDat}
                        quantity={ticket.ticket.SLNguoi}
                        price={ticket.tour.Gia}
                        name={ticket.tour.TenTour}
                        img={ticket.tour.HinhAnh[0]}
                        status={ticket.ticket.TinhTrang}
                    />
                );
            })}
        </div>
    );
}

export default AllTour;
