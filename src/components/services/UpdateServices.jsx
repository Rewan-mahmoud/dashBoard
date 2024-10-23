import React, { useState, useEffect } from "react";
import plus from "../../assests/Plusss.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import deletee from "../../assests/delete.svg";
import { useAuth } from "../../AuthContext";
import { useLocation } from "react-router-dom";

export default function UpdateServices() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const location = useLocation();
  const { serviceId } = location.state;
  const [dynamicInputs, setDynamicInputs] = useState([
    {
      specialist: "",
      details: [
        { sessions_kind: "", sessions_num: "", sessions_time: "", price: "" },
      ],
    },
  ]);
  const [fixedInputs, setFixedInputs] = useState({
    category: "",
    subCategory: "",
  });
  const [error, setError] = useState(null);
  const { token } = useAuth();

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
          setCategories(result.data.data);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await fetch(
          "https://naql.nozzm.com/api/subcategories",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              lang: "ar",
            },
          }
        );
        const result = await response.json();
        if (result.status) {
          setSubcategories(result.data.data);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "https://naql.nozzm.com/api/show_doctores",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              lang: "ar",
            },
          }
        );
        const result = await response.json();
        if (result.status) {
          setDoctors(result.data);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDoctors();
    // fetchCategories();
    fetchSubcategories();
    fetchData();
  }, [token]);

  useEffect(() => {
    if (serviceId) {
      const fetchServiceData = async () => {
        try {
          const response = await fetch(
            `https://naql.nozzm.com/api/show_service/${serviceId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                lang: "ar",
              },
            }
          );
          const result = await response.json();
          if (result.status) {
            setFixedInputs({
              category: result.data.category?.name_ar || "",
              subCategory: result.data.sub_category?.name_ar || "",
            });
            setDynamicInputs(
              result.data.Service_doctors.map((serviceDoctor) => ({
                specialist: serviceDoctor.doctors?.name || "",
                details: result.data.Service_time.map((detail) => ({
                  sessions_kind: detail.sessions_kind || "",
                  sessions_num: detail.sessions_num || "",
                  sessions_time: detail.sessions_time || "",
                  price: detail.price || "",
                })),
              }))
            );
          } else {
            setError(result.message);
          }
        } catch (error) {
          setError(error.message);
        }
      };
      fetchServiceData();
    }
  }, [serviceId, token]);

  const handleAddService = () => {
    setDynamicInputs([
      ...dynamicInputs,
      {
        specialist: "",
        details: [
          { sessions_kind: "", sessions_num: "", sessions_time: "", price: "" },
        ],
      },
    ]);
  };

  const handleFixedInputChange = (field, value) => {
    setFixedInputs({ ...fixedInputs, [field]: value });
  };

  const handleInputChange = (inputIndex, detailIndex, field, value) => {
    const updatedDynamicInputs = [...dynamicInputs];
    if (field === "specialist") {
      updatedDynamicInputs[inputIndex][field] = value;
    } else {
      updatedDynamicInputs[inputIndex].details[detailIndex][field] = value;
    }
    setDynamicInputs(updatedDynamicInputs);
  };

  const handleAddDetail = (inputIndex) => {
    const updatedDynamicInputs = [...dynamicInputs];
    updatedDynamicInputs[inputIndex].details.push({
      sessions_kind: "",
      sessions_num: "",
      sessions_time: "",
      price: "",
    });
    setDynamicInputs(updatedDynamicInputs);
  };

  const handleDeleteDetail = (inputIndex, detailIndex) => {
    const updatedDynamicInputs = [...dynamicInputs];
    if (updatedDynamicInputs[inputIndex].details.length > 1) {
      updatedDynamicInputs[inputIndex].details.splice(detailIndex, 1);
      setDynamicInputs(updatedDynamicInputs);
    }
  };
  const handleSaveAll = async () => {
    // Find the selected category and subcategory by ID
    const selectedCategory = categories.find(
      (category) => category.id === parseInt(fixedInputs.category)
    );
    const selectedSubCategory = subcategories.find(
      (subcategory) => subcategory.id === parseInt(fixedInputs.subCategory)
    );
  
    // Ensure category and subcategory are selected
    if (!selectedCategory) {
      alert("Please select a valid main category.");
      return;
    }
  
    if (!selectedSubCategory) {
      alert("Please select a valid subcategory.");
      return;
    }
  
    // Validate dynamic inputs to ensure all fields are filled
    const invalidInput = dynamicInputs.some((input) => {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.id === parseInt(input.specialist)
      );
  
      if (!selectedDoctor) {
        alert("Please select a valid doctor.");
        return true;
      }
  
      const sessionInvalid = input.details.some((detail) => {
        return (
          !detail.sessions_kind ||
          !detail.sessions_num ||
          !detail.sessions_time ||
          !detail.price
        );
      });
  
      if (sessionInvalid) {
        alert("Please fill in all session details.");
        return true;
      }
  
      return false;
    });
  
    if (invalidInput) {
      return;
    }
  
    // Create payload based on inputs
    const payload = dynamicInputs
      .map((input) => {
        const selectedDoctor = doctors.find(
          (doctor) => doctor.id === parseInt(input.specialist)
        );
  
        return input.details.map((detail) => ({
          doctors_id: selectedDoctor?.id || 0,
          sessions_kind: detail.sessions_kind,
          sessions_num: detail.sessions_num,
          sessions_time: detail.sessions_time,
          price: detail.price,
        }));
      })
      .flat();
  
    // Build the final servicePayload
    const servicePayload = {
      cat_id: selectedCategory.id, // Category ID
      sub_id: selectedSubCategory.id, // Subcategory ID
      items: payload.map((item) => ({
        doctors_id: item.doctors_id,
      })),
      servicetimes: payload.map((item) => ({
        sessions_kind: item.sessions_kind,
        sessions_num: item.sessions_num,
        sessions_time: item.sessions_time,
        price: item.price,
      })),
    };
  
    try {
      // Make the POST request to the update endpoint
      const response = await fetch(
        `https://naql.nozzm.com/api/update_service/${serviceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            lang: "ar",
          },
          body: JSON.stringify(servicePayload),
        }
      );
      const result = await response.json();
  
      if (result.status) {
        alert("Service updated successfully!");
      } else {
        alert("Failed to update service: " + result.message);
      }
    } catch (error) {
      alert("Error updating service: " + error.message);
    }
  };
  
  return (
    <div className="container settingForm tables bg-white mt-5">
      <div className="tableTitle">
        <h3>الخدمات</h3>
      </div>
      <div className="row mb-3">
        <div className="col-md-3">
          <div className="custom-select">
            <select
              className="form-control"
              value={fixedInputs.category}
              onChange={(e) => handleFixedInputChange("category", e.target.value)}
            >
              <option value="">{fixedInputs.category}</option>
              {subcategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category?.name_ar}
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
            <select
              className="form-control"
              value={fixedInputs.subCategory}
              onChange={(e) =>
                handleFixedInputChange("subCategory", e.target.value)
              }
            >
              <option value="">{fixedInputs.subCategory}</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory?.name_ar}
                </option>
              ))}
            </select>
            <div className="arrow-icon">
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="AddServicesButton">
            <button onClick={handleAddService}>
              <img src={plus} alt="" />
              <span className="pe-3">اضافة</span>
            </button>
          </div>
        </div>
      </div>
      {dynamicInputs.map((input, inputIndex) => (
        <div key={inputIndex} className="dynamic-input-section mt-5">
          <div className="row mb-3">
            <div className="col-md-3">
              <div className="custom-select">
                <select
                  className="form-control"
                  value={input.specialist}
                  onChange={(e) =>
                    handleInputChange(inputIndex, -1, "specialist", e.target.value)
                  }
                >
                  <option value={input.specialist}>{input.specialist}</option>
                  {doctors.map((doctor, id) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
                <div className="arrow-icon">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>
            </div>
          </div>
          {input.details.map((detail, detailIndex) => (
            <div key={detailIndex} className="row mb-3">
              <div className="col-md-3 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="نوع الجلسة"
                  value={detail.sessions_kind}
                  onChange={(e) =>
                    handleInputChange(
                      inputIndex,
                      detailIndex,
                      "sessions_kind",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="col-md-3 mt-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="عدد الجلسات"
                  value={detail.sessions_num}
                  onChange={(e) =>
                    handleInputChange(
                      inputIndex,
                      detailIndex,
                      "sessions_num",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="col-md-3 mt-3">
                <input
                  type="time"
                  className="form-control"
                  placeholder="مدة الجلسات"
                  value={detail.sessions_time}
                  onChange={(e) =>
                    handleInputChange(
                      inputIndex,
                      detailIndex,
                      "sessions_time",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="col-md-3 mt-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="السعر"
                  value={detail.price}
                  onChange={(e) =>
                    handleInputChange(inputIndex, detailIndex, "price", e.target.value)
                  }
                />
              </div>
              <div className="col-md-3 mt-3">
                <button className="btn" onClick={() => handleAddDetail(inputIndex)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                  className="btn"
                  onClick={() => handleDeleteDetail(inputIndex, detailIndex)}
                >
                  <img src={deletee} alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="BottomButtons">
        <button className="save" onClick={handleSaveAll}>
          <span>Save</span>
        </button>
        <Link to="/Services">
          <button className="cancel">
            <span>Cancel</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
