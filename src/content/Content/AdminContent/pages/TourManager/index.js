import classNames from "classnames/bind";
import styles from "./TourManager.module.scss";
import TourItem from "./TourItem/TourItem";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { memo, useState } from "react";
import { useEffect } from "react";
import { async } from "@firebase/util";
import requestAxios from "../../../../../api/axios";
import CreateTour from "./CreateTour/CreateTour";
import { useMemo } from "react";

const cx = classNames.bind(styles);
function TourManager() {
    const [tourList, setTourList] = useState([]);
    const [haveChange, setHaveChange] = useState(0);

    const fetchData = async () => [
        await requestAxios
            .get(`tour`)
            .then((res) => {
                setTourList(res.data.listTour);
            })
            .catch((err) => {
                console.log("Errr get all tour");
            }),
    ];

    useEffect(() => {
        fetchData();
    }, [haveChange]);
    const handleDelete = () => {
        setHaveChange(haveChange + 1);
    };
    return (
        <div className={cx("tourManager")}>
            <h1>Quản lí tour</h1>
            <Tabs>
                <TabList>
                    <Tab>Tour</Tab>
                    <Tab>Tạo tour</Tab>
                </TabList>

                <TabPanel>
                    <div className={cx("tourList")}>
                        {tourList.length > 0
                            ? tourList.map((tour, index) => {
                                  return (
                                      <TourItem
                                          onDelete={handleDelete}
                                          data={tour}
                                          key={index}
                                          index={index + 1}
                                      />
                                  );
                              })
                            : "Ko co du lieu"}
                    </div>
                </TabPanel>
                <TabPanel>
                    <CreateTour />
                </TabPanel>
            </Tabs>
            <div></div>
        </div>
    );
}

export default memo(TourManager);
