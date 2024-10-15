import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import deletee from "../../assests/delete.svg";
import add from "../../assests/add.jpeg";
import { useTranslation } from "react-i18next"; // Import translation hook

const AddTreatmentPlans = ({ onSave }) => {
  const { t } = useTranslation(); // Use translation hook
  const location = useLocation();
  const plan = location.state?.plan || {};

  const [formData, setFormData] = useState({
    name_ar: plan.name_ar || "",
    name_en: plan.name_en || "",
    levels_num: plan.levels_num || "",
    details_ar: plan.details_ar || "",
    details_en: plan.details_en || "",
    objectives_ar: plan.objectives_ar || "",
    objectives_en: plan.objectives_en || "",
    price: plan.price || "",
    discount: plan.discount || "",
    file: plan.file || "", // This will hold the file data (URL or base64)
    type: plan.type || "",
    items: plan.level || [{ name_ar: "", name_en: "", session_num: "" }],
    sessionstypes: plan.sessionstypes || [{ type_name: "", num: "" }],
    plandoctores: plan.plandoctores || [
      { doctor_id: "", avalible_time: "", avalible_date: "" },
    ],
  });

  const [doctors, setDoctors] = useState([]);
  const [sessionTypes, setSessionTypes] = useState([]);
  const [levelsList, setLevelsList] = useState([]);
  const [error, setError] = useState(null);
  const [filePreview, setFilePreview] = useState(plan.file || ""); // This will show the image preview for both edit and add mode
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const navigate = useNavigate();
  const imageRef = useRef(null); // Reference for image upload

  // Fetch doctors and session types from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/doctores", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.status) {
          setDoctors(result.data.data || []);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Failed to fetch doctors");
      }
    };

    fetchDoctors();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/planseeions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            lang: "ar",
          },
        });

        const result = await response.json();
        if (result.status) {
          const levels = result.data.data.map((plan) => plan.level).flat();
          setLevelsList(levels);

          const sessions = result.data.data
            .map((plan) => plan.sessionstype.level.name_ar)
            .flat();
          setSessionTypes(sessions);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
      }
    };

    fetchData();
  }, []);

  // Add, remove, and update items and doctors
  const handleAddItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { name_ar: "", name_en: "", session_num: "" }],
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((_, i) => i !== index),
    }));
  };

  const handleAddSessionType = () => {
    setFormData((prevData) => ({
      ...prevData,
      sessionstypes: [...prevData.sessionstypes, { type_name: "", num: "" }],
    }));
  };

  const handleRemoveSessionType = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      sessionstypes: prevData.sessionstypes.filter((_, i) => i !== index),
    }));
  };

  const handleAddDoctor = () => {
    setFormData((prevData) => ({
      ...prevData,
      plandoctores: [
        ...prevData.plandoctores,
        { doctor_id: "", avalible_time: "", avalible_date: "" },
      ],
    }));
  };


  const handleItemChange = (index, field, value) => {
    const newItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prevData) => ({
      ...prevData,
      items: newItems,
    }));
  };

  const handleSessionTypeChange = (index, field, value) => {
    const newSessionTypes = formData.sessionstypes.map((sessionType, i) =>
      i === index ? { ...sessionType, [field]: value } : sessionType
    );
    setFormData((prevData) => ({
      ...prevData,
      sessionstypes: newSessionTypes,
    }));
  };

  const handleDoctorChange = (index, field, value) => {
    const newDoctors = formData.plandoctores.map((doctor, i) =>
      i === index ? { ...doctor, [field]: value } : doctor
    );
    setFormData((prevData) => ({
      ...prevData,
      plandoctores: newDoctors,
    }));
  };

  // Handle saving the form
  // Handle saving the form
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formDataToSend = new FormData();

    // Add file data
    if (imageRef.current && imageRef.current.files[0]) {
      formDataToSend.append("file", imageRef.current.files[0]);
    } else if (plan.file && !imageRef.current.files[0]) {
      formDataToSend.append("file", plan.file);
    }

    // Add basic form data
    formDataToSend.append("name_ar", formData.name_ar);
    formDataToSend.append("name_en", formData.name_en);
    formDataToSend.append("details_ar", formData.details_ar);
    formDataToSend.append("details_en", formData.details_en);
    formDataToSend.append("levels_num", formData.levels_num);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("discount", formData.discount);
    formDataToSend.append("objectives_ar", formData.objectives_ar);
    formDataToSend.append("objectives_en", formData.objectives_en);
    formDataToSend.append("type", formData.type);

    // Add items array
    formData.items.forEach((item, index) => {
      formDataToSend.append(`items[${index}][name_ar]`, item.name_ar || "");
      formDataToSend.append(`items[${index}][name_en]`, item.name_en || "");
      formDataToSend.append(
        `items[${index}][session_num]`,
        item.session_num || 0
      );
    });

    // Add session types array
    formData.sessionstypes.forEach((session, index) => {
      formDataToSend.append(
        `sessionstypes[${index}][type_name]`,
        session.type_name || ""
      );
      formDataToSend.append(`sessionstypes[${index}][num]`, session.num || 0);
    });

    // Add plandoctores array
    formData.plandoctores.forEach((doctor, index) => {
      formDataToSend.append(
        `plandoctores[${index}][doctor_id]`,
        doctor.doctor_id || ""
      );
      formDataToSend.append(
        `plandoctores[${index}][avalible_time]`,
        doctor.avalible_time || ""
      );
      formDataToSend.append(
        `plandoctores[${index}][avalible_date]`,
        doctor.avalible_date || ""
      );
    });

    const endpoint = plan.id
      ? `https://naql.nozzm.com/api/update_planseeions/${plan.id}`
      : "https://naql.nozzm.com/api/add_planseeions";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const result = await response.json();
      if (result.status) {
        onSave(result.data);
        navigate("/TreatmentPlans");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Failed to save the treatment plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image upload and display
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result); // Show the uploaded image
        setFormData((prevData) => ({
          ...prevData,
          file: reader.result, // Save the file data to send to the server
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 React.useEffect(()=>{
  console.log("item?.session_num" , formData)
 },[formData])
  return (
    <div className="container DoctorsProfile tables bg-white">
      <div className="tableTitle d-flex justify-content-between">
        <h3>{t("addTreatmentPlanTitle")}</h3>
      </div>
      <form onSubmit={handleSave}>
        <div className="row settingForm justify-content-around">
          {/* Form fields */}
          <div className="col-md-6">
            <label htmlFor="name_ar">{t("name_ar")}:</label>
            <input
              type="text"
              className="form-control"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="name_en">{t("name_en")}:</label>
            <input
              type="text"
              className="form-control"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="levels_num">{t("levels_num")}:</label>
            <input
              type="text"
              className="form-control"
              name="levels_num"
              value={formData.levels_num}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="price">{t("price")}:</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="discount">{t("discount")}:</label>
            <input
              type="text"
              className="form-control"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="details_ar">{t("details_ar")}:</label>
            <input
              type="text"
              className="form-control py-5"
              name="details_ar"
              value={formData.details_ar}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="details_en">{t("details_en")}:</label>
            <input
              type="text"
              className="form-control py-5"
              name="details_en"
              value={formData.details_en}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="objectives_ar">{t("objectives_ar")}:</label>
            <input
              type="text"
              className="form-control py-5"
              name="objectives_ar"
              value={formData.objectives_ar}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="objectives_en">{t("objectives_en")}:</label>
            <input
              type="text"
              className="form-control py-5"
              name="objectives_en"
              value={formData.objectives_en}
              onChange={handleChange}
            />
          </div>

          {/* Image File Input and Display */}
          <div className="col-md-6">
            <label htmlFor="file">{t("file")}:</label>
            {/* Display existing image if editing and image exists */}
            {plan.file && (
              <div className="mb-3">
                <img
                  src={plan.file}
                  alt="Plan Image"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </div>
            )}
            <input
              type="file"
              name="file"
              ref={imageRef}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="type">{t("select_file_type")}:</label>
            <select
              className="form-control"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">{t("select_file_type")}</option>
              <option value="picture">{t("picture")}</option>
              <option value="video">{t("video")}</option>
            </select>
          </div>

          {/* Treatment Phases */}
          <div className="col-md-12">
            <label>{t("treatment_phases")}:</label>
            {formData.items.map((item, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("enter_phase_ar")}
                    value={item.name_ar}
                    onChange={(e) =>
                      handleItemChange(index, "name_ar", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("enter_phase_en")}
                    value={item.name_en}
                    onChange={(e) =>
                      handleItemChange(index, "name_en", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder={t("session_num")}
                    value={item?.session_num}
                    onChange={(e) =>
                      handleItemChange(index, "session_num", e.target.value)
                    }
                  />
                </div>
                {formData.items.length > 1 && (
                  <div className="col-md-12 text-end mb-4">
                    <button onClick={() => handleRemoveItem(index)}>
                      <img src={deletee} alt="" />
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="col-md-12 text-end mb-4">
              <button className="btn btn-sm" onClick={handleAddItem}>
                <img src={add} style={{ width: "20px" }} />
              </button>
            </div>
          </div>

          {/* Session Types */}
          <div className="col-md-12">
            <label>{t("session_types")}:</label>
            {formData.sessionstypes.map((sessionType, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-6">
                  <select
                    className="form-control"
                    value={sessionType.type_name || ""} // Ensure value binding
                    onChange={(e) =>
                      handleSessionTypeChange(
                        index,
                        "type_name",
                        e.target.value
                      )
                    }
                  >
                    <option value="">{t("select_session_type")}</option>
                    <option value="تامل">تامل</option>
                    <option value="عادي">عادي</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("num_sessions")}
                    value={sessionType?.num || ""}
                    onChange={(e) =>
                      handleSessionTypeChange(index, "num", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Doctors */}
          <div className="col-md-12">
            <label>{t("doctors")}:</label>
            {formData.plandoctores.map((doctor, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-4">
                  <select
                    className="form-control"
                    value={doctor.doctor_id || ""} // Ensure the value is correctly bound
                    onChange={(e) =>
                      handleDoctorChange(index, "doctor_id", e.target.value)
                    }
                  >
                    <option value="">{t("select_doctor")}</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <input
                    type="time"
                    className="form-control"
                    placeholder={t("available_time")}
                    value={doctor.avalible_time || ""}
                    onChange={(e) =>
                      handleDoctorChange(index, "avalible_time", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    placeholder={t("available_date")}
                    value={doctor.avalible_date || ""}
                    onChange={(e) =>
                      handleDoctorChange(index, "avalible_date", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="BottomButtons">
            <button className="save" type="submit" disabled={isLoading}>
              <span>{isLoading ? t("saving") : t("save")}</span>
            </button>

            <button
              type="button"
              className="cancel"
              onClick={() => navigate("/TreatmentPlans")}
            >
              <span>{t("cancel")}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTreatmentPlans;
