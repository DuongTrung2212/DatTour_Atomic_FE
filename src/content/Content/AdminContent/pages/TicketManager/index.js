import classNames from "classnames/bind";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styles from "./TicketManager.module.scss";

import TicketItem from "./TicketItem";
import requestAxios from "../../../../../api/axios";
import { useEffect, useState } from "react";
import TicketList from "./TicketList";

const cx = classNames.bind(styles);

function TicketManager() {
    const [dataTicket, setDataTicket] = useState([]);
    useEffect(() => {
        fetchDataTicket();
    }, []);
    const fetchDataTicket = async () => {
        await requestAxios
            .get("datTour")
            .then((res) => {
                if (res.data.message == "OK") setDataTicket(res.data.data);
            })
            .catch((err) => {
                console.log("err");
            });
    };
    return (
        <div className={cx("ticketManager")}>
            <h1>Quản lí vé</h1>
            <div>
                {dataTicket.map((data, index) => {
                    return (
                        <TicketList
                            key={index}
                            tourData={data.tour}
                            listTicketData={data.listTicket}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default TicketManager;
