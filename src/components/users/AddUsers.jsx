import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export default function AddUsers() {
  const navigate = useNavigate();

  return (
    <div className="container DoctorsProfile tables bg-white">
      <div className="tableTitle d-flex justify-content-between">
        <h3>اضافة مستخدمين </h3>
      </div>

      <form>
        <div className=" settingForm justify-content-around">
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="formGroupExampleInput">
                الاسم باللغة العربية:
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label htmlFor="formGroupExampleInput">
                الاسم باللغة الانجليزية:
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label htmlFor="formGroupExampleInput">رقم الهاتف :</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="formGroupExampleInput">البريد الالكتروني :</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label htmlFor="formGroupExampleInput">كلمة المرور :</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label htmlFor="formGroupExampleInput">الصلاحيات :</label>

              <div className="custom-select">
                <select type="text" className="form-control">
                  <option value="option1"> ادمن</option>
                  <option value="option2"> سوبر ادمن</option>
                  <option value="option3"> موظف عادي </option>
                  <option value="option3"> موظف كبير </option>
                </select>
                <div className="arrow-icon">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>
            </div>
          </div>

          <div className="BottomButtons">
            <button className="save">
              <span> حفظ</span>
            </button>
            <button className="cancel" onClick={() => navigate("/Users")}>
              <span> الغاء</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
