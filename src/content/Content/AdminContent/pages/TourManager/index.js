import classNames from "classnames/bind";
import styles from "./TourManager.module.scss";
import TourItem from "./TourItem/TourItem";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { memo, useState } from "react";
import { useEffect } from "react";
import requestAxios from "../../../../../api/axios";
import CreateTour from "./CreateTour/CreateTour";
import { DaTaChangeContext } from "../..";
import { useContext } from "react";

const cx = classNames.bind(styles);
function TourManager() {
    const [tourList, setTourList] = useState([]);
    const [haveChange, setHaveChange] = useState(0);
    const { changed, setChanged } = useContext(DaTaChangeContext);

    const fetchData = async () => [
        await requestAxios
            .get(`tour`)
            .then((res) => {
                if (res.data.message === "OK") setTourList(res.data.listTour);
                else {
                    setTourList([]);
                }
            })
            .catch((err) => {
                console.log("Errr get all tour");
            }),
    ];

    useEffect(() => {
        fetchData();
    }, [haveChange, changed]);
    const handleDelete = () => {
        setChanged(changed + 1);
        setHaveChange(haveChange + 1);
    };
    return (
        <div className={cx("tourManager")}>
            <h1>Quản Lí Tour</h1>
            <Tabs className={cx("tabs")}>
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
                    <div className={cx("createTour")}>
                        <CreateTour />
                    </div>
                </TabPanel>
            </Tabs>
            <div></div>
        </div>
    );
}

export default memo(TourManager);
