import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import deletee from "../../assests/delete.svg";
import add from "../../assests/add.jpeg";
const AddTreatmentPlans = ({ onSave }) => {
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
    sessionstypes: plan.sessionstype || [{ type_name: "", num: "" }],
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
            .map((plan) => plan.sessionstype)
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

  const handleRemoveDoctor = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      plandoctores: prevData.plandoctores.filter((_, i) => i !== index),
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
  const handleSave = async (e) => {
    setIsLoading(true);
    setError("");

    e.preventDefault();
    const formDataToSend = new FormData();

    // Add new image or use the existing one if no new image is selected
    if (imageRef.current && imageRef.current.files[0]) {
      formDataToSend.append("file", imageRef.current.files[0]);
    } else if (plan.file) {
      formDataToSend.append("file", plan.file); // Use existing file
    }

    // Add other form data
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
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
          "Content-Type": "application/json",
          lang: "ar",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.status) {
        onSave(result.data);
        navigate("/treatment-plans");
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

  return (
    <div className="container DoctorsProfile tables bg-white">
      <div className="tableTitle d-flex justify-content-between">
        <h3>اضافة خطة علاجية</h3>
      </div>
      <form onSubmit={handleSave}>
        <div className="row settingForm justify-content-around">
          {/* Form fields */}
          <div className="col-md-6">
            <label htmlFor="name_ar">الاسم باللغة العربية:</label>
            <input
              type="text"
              className="form-control"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="name_en">الاسم باللغة الانجليزية:</label>
            <input
              type="text"
              className="form-control"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="levels_num">عدد المراحل:</label>
            <input
              type="text"
              className="form-control"
              name="levels_num"
              value={formData.levels_num}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="price">السعر:</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="discount">الخصم:</label>
            <input
              type="text"
              className="form-control"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="details_ar">التفاصيل بالعربية:</label>
            <input
              type="text"
              className="form-control py-5"
              name="details_ar"
              value={formData.details_ar}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="details_en">التفاصيل بالانجليزية:</label>
            <input
              type="text"
              className="form-control py-5"
              name="details_en"
              value={formData.details_en}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="objectives_ar">الأهداف بالعربية:</label>
            <input
              type="text"
              className="form-control py-5"
              name="objectives_ar"
              value={formData.objectives_ar}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="objectives_en">الأهداف بالانجليزية:</label>
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
            <label htmlFor="file">الصورة:</label>
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
            <label htmlFor="type">نوع الملف:</label>
            <select
              className="form-control"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">اختر نوع الملف</option>
              <option value="picture">صورة</option>
              <option value="video">فيديو</option>
            </select>
          </div>

          {/* Treatment Phases */}
          <div className="col-md-12">
            <label>مراحل العلاج:</label>
            {formData.items.map((item, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-4">
                  <select
                    className="form-control"
                    value={item.name_ar}
                    onChange={(e) =>
                      handleItemChange(index, "name_ar", e.target.value)
                    }
                  >
                    <option value="">اختر المرحلة بالعربية</option>
                    {levelsList.map((level) => (
                      <option key={level.id} value={level.name_ar}>
                        {level.name_ar}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-control"
                    value={item.name_en}
                    onChange={(e) =>
                      handleItemChange(index, "name_en", e.target.value)
                    }
                  >
                    <option value="">اختر المرحلة بالانجليزية</option>
                    {levelsList.map((level) => (
                      <option key={level.id} value={level.name_en}>
                        {level.name_en}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="عدد الجلسات"
                    value={item.session_num}
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
            <label>أنواع الجلسات:</label>
            {formData.sessionstypes.map((sessionType, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-6">
                  <select
                    className="form-control"
                    value={sessionType.type_name}
                    onChange={(e) =>
                      handleSessionTypeChange(
                        index,
                        "type_name",
                        e.target.value
                      )
                    }
                  >
                    <option value="">اختر نوع الجلسات</option>
                    {sessionTypes.map((type) => (
                      <option key={type.id} value={type.type}>
                        {type.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="عدد الجلسات"
                    value={sessionType.num}
                    onChange={(e) =>
                      handleSessionTypeChange(index, "num", e.target.value)
                    }
                  />
                </div>
                {formData.sessionstypes.length > 1 && (
                  <div className="col-md-12 text-end">
                    <button
                      type="button"
                      className="btn "
                      onClick={() => handleRemoveSessionType(index)}
                    >
                      <img src={deletee} alt="" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="col-md-12 text-end mb-4">
              <button className="btn btn-sm" onClick={handleAddSessionType}>
                <img src={add} style={{ width: "20px" }} />
              </button>
            </div>
          </div>

          {/* Doctors */}
          <div className="col-md-12">
            <label>المختصون:</label>
            {formData.plandoctores.map((doctor, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-4">
                  <select
                    className="form-control"
                    value={doctor.doctor_id}
                    onChange={(e) =>
                      handleDoctorChange(index, "doctor_id", e.target.value)
                    }
                  >
                    <option value="">اختر المختص</option>
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
                    placeholder="الوقت المتاح"
                    value={doctor.avalible_time}
                    onChange={(e) =>
                      handleDoctorChange(index, "avalible_time", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="التاريخ المتاح"
                    value={doctor.avalible_date}
                    onChange={(e) =>
                      handleDoctorChange(index, "avalible_date", e.target.value)
                    }
                  />
                </div>
                {formData.plandoctores.length > 1 && (
                  <div className="col-md-12 text-end">
                    <button
                      type="button"
                      className="btn "
                      onClick={() => handleRemoveDoctor(index)}
                    >
                      <img src={deletee} alt="" />
                    </button>
                  </div>
                )}
              </div>
            ))}
           <div className="col-md-12 text-end mb-4">
              <button className="btn btn-sm" onClick={handleAddDoctor}>
                <img src={add} style={{ width: "20px" }} />
              </button>
            </div>
          </div>

          <div className="BottomButtons">
            <button className="save" type="submit" disabled={isLoading}>
              <span>{isLoading ? "جاري الحفظ..." : "حفظ"}</span>
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => navigate("/TreatmentPlans")}
            >
              <span>الغاء</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTreatmentPlans;
