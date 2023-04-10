import classNames from "classnames/bind";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styles from "./TicketManager.module.scss";

import TicketItem from "./TicketItem";
import requestAxios from "../../../../../api/axios";
import { useEffect, useState } from "react";
import Item from "antd/es/list/Item";
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
                        <div key={index}>
                            <span>{data.tour.TenTour}</span>
                            <div>
                                <TicketItem
                                    index={1}
                                    tourId={1}
                                    userId={1}
                                    userName={"Abc"}
                                    bookDate={"1021"}
                                    userSum={3}
                                />
                                ;
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TicketManager;
