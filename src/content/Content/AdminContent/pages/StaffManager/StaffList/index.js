import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import styles from "./StaffList.module.scss";
import StaffItem from "./StaffItem";
import requestAxios from "../../../../../../api/axios";
import { DaTaChangeContext } from "../../..";
const cx = classNames.bind(styles);
function StaffList() {
    const [listStaff, setListStaff] = useState([]);
    const [haveChange, setHaveChange] = useState(0);
    const { changed } = useContext(DaTaChangeContext);
    const deleted = () => {
        setHaveChange(haveChange + 1);
    };
    const fetchDataAllStaff = async () => {
        await requestAxios
            .get("nhanVien")
            .then((res) => {
                if (res.data.message === "OK") {
                    setListStaff(res.data.listNhanVien);
                }
            })
            .catch((err) => console.log("Err fetch all staff"));
    };
    useEffect(() => {
        fetchDataAllStaff();
    }, [haveChange, changed]);
    return (
        <div className={cx("staffList")}>
            <h1>Danh sách nhân viên</h1>
            <div className={cx("staff")}>
                {listStaff.map((staff, index) => {
                    return (
                        <StaffItem
                            deleted={deleted}
                            key={index}
                            index={index + 1}
                            staffId={staff.MaHDVien}
                            nameStaff={staff.TenHDVien}
                            genderStaff={staff.GioiTinh}
                            phoneStaff={staff.SdtNV}
                            emailStaff={staff.Email}
                            workDate={staff.NgayLV}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default StaffList;
