import React, { useState } from "react";
import edit from "../../assests/edit.svg";
import deletee from "../../assests/delete.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import plus from "../../assests/plus.svg";
import { useTranslation } from "react-i18next";
const Permissions = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([
    {
      id: 1,
      NameArabic: "احمد محمد ",
      NameEnglish: "Ahmed  ",
      Number: "تعديل",
    },
    { id: 2, NameArabic: "احمد محمد ", NameEnglish: "Ahmed ", Number: "تعديل" },
    { id: 3, NameArabic: "احمد محمد ", NameEnglish: "Ahmed ", Number: "انشاء" },
    { id: 4, NameArabic: "احمد محمد ", NameEnglish: "Ahmed ", Number: "تعديل" },
    { id: 5, NameArabic: "احمد محمد ", NameEnglish: "Ahmed ", Number: "انشاء" },
    { id: 6, NameArabic: "احمد محمد ", NameEnglish: "Ahmed ", Number: "تعديل" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});

  const handleEdit = (id) => {
    setEditingId(id);
    const rowToEdit = data.find((row) => row.id === id);
    const newRowDataCopy = { ...rowToEdit };
    setNewRowData(newRowDataCopy);
  };

  const handleDelete = (id) => {
    const newData = data.filter((row) => row.id !== id);
    setData(newData);
  };

  const handleChange = (e, key) => {
    const { value } = e.target;
    setNewRowData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSave = () => {
    const newData = data.map((row) => {
      if (row.id === editingId) {
        return newRowData;
      }
      return row;
    });
    setData(newData);
    setEditingId(null);
    setNewRowData({});
  };

  const toggleActive = (id) => {
    const newData = data.map((row) => {
      if (row.id === id) {
        return { ...row, active: !row.active };
      }
      return row;
    });
    setData(newData);
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between ">
        <h3> {t('permission')} </h3>
        <Link to="/AddPermissions">
          <button>
            <img src={plus} alt="" />
            <span className="pe-3"> اضافة </span>
          </button>
        </Link>
      </div>

      <table className=" table borderless TableDr text-center ">
        <thead>
          <tr>
          <th scope="col">{t('number')}</th>
            <th scope="col">{t('name_ar')}</th>
            <th scope="col">{t('name_en')}</th>
            <th scope="col">{t('permission')}</th>
            <th scope="col">{t('controls')}</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    value={newRowData.NameArabic}
                    onChange={(e) => handleChange(e, "NameArabic")}
                  />
                ) : (
                  row.NameArabic
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    value={newRowData.NameEnglish}
                    onChange={(e) => handleChange(e, "NameEnglish")}
                  />
                ) : (
                  row.NameEnglish
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    value={newRowData.Number}
                    onChange={(e) => handleChange(e, "Number")}
                  />
                ) : (
                  row.Number
                )}
              </td>

              <td>
                {editingId === row.id ? (
                  <React.Fragment>
                    <button className="save-btn" onClick={handleSave}>
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="drTableIcon">
                      {/* Apply conditional class based on active state */}

                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={row.active ? "activeIcon" : "inactive"}
                        onClick={() => toggleActive(row.id)}
                      />
                      <Link>
                        <img src={edit} alt="" />
                      </Link>

                      <img
                        src={deletee}
                        alt=""
                        onClick={() => handleDelete(row.id)}
                      />
                    </div>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
