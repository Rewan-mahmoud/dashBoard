import React, { useState } from "react";
import edit from "../../assests/edit.svg";
import deletee from "../../assests/delete.svg";
import check from "../../assests/check.svg";
import plus from "../../assests/plus.svg";
import "./permission.css";
import { Link, useNavigate } from "react-router-dom";

// import "./mee.css"
const AddPermissions = () => {
  const navigate = useNavigate();
  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between ">
        <h3> اضافة صلاحية </h3>
      </div>

      <div className=" settingForm justify-content-around">
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="formGroupExampleInput">الاسم باللغة العربية:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-3">
            <label htmlFor="formGroupExampleInput">
              الاسم باللغة الانجليزية:
            </label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </div>
      <table className="table borderless table-borderless">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">الوحدة</th>
            <th scope="col">التصريح</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>
              <input type="checkbox" /> <span>انشاء</span>
            </td>
            <td>
              <input type="checkbox" /> <span>تعديل</span>
            </td>
            <td>
              <input type="checkbox" /> <span>حذف</span>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Mark</td>
            <td>
              <input type="checkbox" /> <span>انشاء</span>
            </td>
            <td>
              <input type="checkbox" /> <span>تعديل</span>
            </td>
            <td>
              <input type="checkbox" /> <span>حذف</span>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Mark</td>
            <td>
              <input type="checkbox" /> <span>انشاء</span>
            </td>
            <td>
              <input type="checkbox" /> <span>تعديل</span>
            </td>
            <td>
              <input type="checkbox" /> <span>حذف</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="BottomButtons">
        <button className="save">
          <span> حفظ</span>
        </button>
        <button className="cancel">
          <Link to="/Permissions" >
            <span> الغاء</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default AddPermissions;
