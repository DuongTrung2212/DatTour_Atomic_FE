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
import requestAxios from "../../../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { confirmCustom } from "../../../../../../components/ConfirmCustom";

const cx = classNames.bind(styles);
function TicketList({ tourData, listTicketData }) {
    const [ticketList, setTicketList] = useState([]);
    const [showListTicket, setShowListTicket] = useState(false);
    const { changed, setChanged } = useContext(DaTaChangeContext);
    useEffect(() => {
        setTicketList(listTicketData);
    });
    const handleHideList = () => {
        showListTicket ? setShowListTicket(false) : setShowListTicket(true);
    };
    const onYes = async () => {
        await requestAxios
            .post(`datTour/manager`, {
                MaTour: tourData.MaTour,
                TinhTrang: "HT",
            })
            .then((res) => {
                if (res.data.message == "OK") {
                    toast.success("Thành công");
                    setChanged(changed + 1);
                } else {
                    toast.warning(res.data.message);
                }
            })
            .catch((err) => toast.err("Lỗi"));
    };
    const handleComplete = () => {
        confirmCustom("Xác nhận", "Xác nhận tour này đã hoàn thành hết", onYes);
    };
    return (
        <div className={cx("ticketList")}>
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
            <div className={cx("tour")}>
                <h2>{tourData.TenTour}</h2>

                <FontAwesomeIcon
                    className={cx("btnHideList")}
                    onClick={handleHideList}
                    icon={showListTicket ? faSquareCaretUp : faSquareCaretDown}
                />

                <button className={cx("btn")} onClick={handleComplete}>Xác nhận hoàn thành</button>
            </div>
            {showListTicket ? (
                <div className={cx("label")}>
                    <span className={cx("index")}>Stt</span>
                    <span className={cx("ticketId")}>Mã vẽ</span>
                    <span className={cx("userName")}>Người đặt</span>
                    <span className={cx("userPhone")}>SDT</span>
                    <span className={cx("bookDate")}>Ngày đặt</span>
                    <span className={cx("userSum")}>Số lượng</span>
                    <span className={cx("priceSum")}>Tổng tiền</span>
                    <span className={cx("labelStatus")}>Tình trạng</span>
                </div>
            ) : (
                ""
            )}
            {showListTicket ? (
                <div className={cx("list")}>
                    {ticketList.map((ticket, index) => {
                        return (
                            <TicketItem
                                key={index}
                                index={index + 1}
                                ticketId={ticket.ticket.MaVe}
                                userName={ticket.user.TenKH}
                                userPhone={ticket.user.Sdt}
                                tourId={tourData.MaTour}
                                bookDate={ticket.ticket.NgayDat}
                                userSum={ticket.ticket.SLNguoi}
                                status={ticket.ticket.TinhTrang}
                                priceSum={`${(
                                    ticket.ticket.SLNguoi * tourData.Gia -
                                    (ticket.ticket.SLNguoi *
                                        tourData.Gia *
                                        tourData.Sale) /
                                        100
                                ).toLocaleString()} VND`}
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
