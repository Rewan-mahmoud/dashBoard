import plus from "../../assests/plus.svg";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthContext';
export default function UpdateServices() {
  const [servicesData, setServicesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            lang: "ar",
          },
        });
        const result = await response.json();
        if (result.status) {
          setServicesData(result.data.data);

          // Extract unique categories, subcategories, and doctors
          const categoriesSet = new Set();
          const subCategoriesSet = new Set();
          const doctorsSet = new Set();

          result.data.data.forEach((service) => {
            if (service.category) {
              categoriesSet.add(service.category.name_ar);
            }
            if (service.sub_category) {
              subCategoriesSet.add(service.sub_category.name);
            }
            if (service.Service_doctors) {
              service.Service_doctors.forEach((doctor) => {
                if (doctor.doctors) {
                  doctorsSet.add(doctor.doctors.name);
                }
              });
            }
          });

          setCategories(Array.from(categoriesSet));
          setSubCategories(Array.from(subCategoriesSet));
          setDoctors(Array.from(doctorsSet));
        } else {
          console.error("Failed to fetch data:", result.message);
          setError(result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <div className="container settingForm tables bg-white mt-5">
        <div className="tableTitle">
          <h3>الخدمات</h3>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="custom-select">
              <select className="form-control">
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="arrow-icon">
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="custom-select">
              <select className="form-control">
                {subCategories.map((subCategory, index) => (
                  <option key={index} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
              <div className="arrow-icon">
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="custom-select">
              <select className="form-control">
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor}>
                    {doctor}
                  </option>
                ))}
              </select>
              <div className="arrow-icon">
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
          </div>
        </div>
        <table className="table mt-5 table-borderless">
          <thead>
            <tr>
              <th scope="col">الرقم</th>
              <th scope="col">نوع الجلسة</th>
              <th scope="col">عدد الجلسات</th>
              <th scope="col">مدة الجلسات</th>
              <th scope="col">السعر</th>
            </tr>
          </thead>
          <tbody>
            {servicesData.map((service, index) => (
              <tr key={service.id}>
                <th scope="row">{index + 1}</th>
                <td>{service.category.name_ar}</td>
                <td>{service.Service_time[0]?.sessions_num || "N/A"}</td>
                <td>{service.Service_time[0]?.sessions_time || "N/A"}</td>
                <td>{service.Service_time[0]?.price || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="BottomButtons">
          <button className="save">
            <span>حفظ</span>
          </button>
          <button className="cancel" onClick={() => navigate("/Services")}>
            <span> الغاء</span>
          </button>
        </div>
      </div>
    </>
  );
}
