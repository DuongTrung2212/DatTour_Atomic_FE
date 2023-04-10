import classNames from "classnames/bind";
import styles from "./TicketList.module.scss";

import { useEffect, useState } from "react";
import TicketItem from "../TicketItem";

const cx = classNames.bind(styles);
function TicketList({ tourData, listTicketData }) {
    const [ticketList, seTicketList] = useState([]);
    useEffect(() => {
        seTicketList(listTicketData);
    }, []);
    return (
        <div>
            <h2>{tourData.TenTour}</h2>
            <div>
                {ticketList.map((ticket, index) => {
                    return (
                        <TicketItem
                            key={index}
                            index={index + 1}
                            ticketId={ticket.ticket.MaVe}
                            userName={ticket.user.TenKH}
                            tourId={tourData.MaTour}
                            bookDate={ticket.ticket.NgayDat}
                            userSum={ticket.ticket.SLNguoi}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default TicketList;
