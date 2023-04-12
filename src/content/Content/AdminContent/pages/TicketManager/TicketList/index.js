import classNames from "classnames/bind";
import styles from "./TicketList.module.scss";

import { useEffect, useState } from "react";
import TicketItem from "../TicketItem";
import { useContext } from "react";
import { DaTaChangeContext } from "../../..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareCaretDown,
    faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function TicketList({ tourData, listTicketData }) {
    const [ticketList, setTicketList] = useState([]);
    const [showListTicket, setShowListTicket] = useState(false);
    useEffect(() => {
        setTicketList(listTicketData);
    });
    const handleHideList = () => {
        showListTicket ? setShowListTicket(false) : setShowListTicket(true);
    };
    return (
        <div className={cx("ticketList")}>
            <div className={cx("tour")}>
                <h2>{tourData.TenTour}</h2>

                <FontAwesomeIcon
                    className={cx("btnHideList")}
                    onClick={handleHideList}
                    icon={showListTicket ? faSquareCaretUp : faSquareCaretDown}
                />

                <button>Xác nhận hoàn thành</button>
            </div>
            {showListTicket ? (
                <div className={cx("list")}>
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
                                status={ticket.ticket.TinhTrang}
                            />
                        );
                    })}
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default TicketList;
