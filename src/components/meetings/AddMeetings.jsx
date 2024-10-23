import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useTranslation } from "react-i18next"; // Import translation hook

const AddMeetings = ({ onSave }) => {
  const { t, i18n } = useTranslation(); // Use translation hook
  const location = useLocation();
  const [doctors, setDoctors] = useState([]);
  const meetingId = location.state?.meeting?.id || null; // Get the meeting ID from location state
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    doctor_id: "",
    encounters_types_id: "",
    seats_num: "",
    price: "",
    date: "",
    time: "", // Handle the time separately
    details_ar: "",
    details_en: "",
    objectives_ar: "",
    objectives_en: "",
    image: "", // This will handle the existing image
  });


  const [encounterTypes, setEncounterTypes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch meeting details if there's a meeting ID
  useEffect(() => {
    const fetchMeetingDetails = async (id) => {
      try {
        const response = await fetch(
          `https://naql.nozzm.com/api/show_ecounters/${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              lang: i18n.language, // Use language dynamically
            },
          }
        );
        const result = await response.json();
        if (result.status) {
          const meetingData = result.data;

          // Set form data from the response
          setFormData({
            name_ar: meetingData.name_ar || "",
            name_en: meetingData.name_en || "",
            doctor_id: meetingData.doctor?.id || "",
            encounters_types_id: meetingData.encounters_type?.id || "",
            seats_num: meetingData.seats_num || "",
            price: meetingData.price || "",
            date: meetingData.date || "",
            time: meetingData.time || "",
            details_ar: meetingData.details_ar || "",
            details_en: meetingData.details_en || "",
            objectives_ar: meetingData.objectives_ar || "",
            objectives_en: meetingData.objectives_en || "",
            image: meetingData.image || "",
          });

          // Set encounter types from the fetched data
          // Include the single encounters_type in an array
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (meetingId) {
      fetchMeetingDetails(meetingId); // Fetch meeting details if id is present
    }
  }, [meetingId, token, i18n.language]);
  useEffect(() => {
    const fetchEncountersType = async () => {
      try {
        const response = await fetch(
          "https://naql.nozzm.com/api/encountertype",
          {
            method: "POST", // Use GET since you're fetching data
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        if (result.status) {
          setEncounterTypes(result.data || []); // Access the `data` array from the response
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Failed to fetch encounter types");
      }
    };

    fetchEncountersType();
  }, [token]);
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
const handleSave = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  // Check if it's a new meeting or update existing
  const endpoint = meetingId 
    ? `https://naql.nozzm.com/api/update_ecounters/${meetingId}` 
    : "https://naql.nozzm.com/api/add_ecounters"; // Use update endpoint if meetingId is present

  try {
    const response = await fetch(endpoint, {
      method: "POST", // Assuming the update uses POST as well
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        lang: i18n.language,
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    console.log("Result status:", result.status); // Debugging to check if status is correct

    if (result.status === true) {
      // Navigate back to meetings list on success
      console.log("Navigating to /Meetings");
      navigate("/Meetings", { state: { updated: true } }); // Navigate and pass a state to signal update
    } else {
      setError(result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    setError(t("addMeetings.saveError"));
  } finally {
    setIsLoading(false);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container DoctorsProfile tables bg-white">
      <div className="tableTitle d-flex justify-content-between">
        <h3>{t("addMeeting")}</h3> {/* Translated title */}
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
            <label htmlFor="doctor_id">{t("host")}:</label>
            <select
              className="form-control"
              name="doctor_id"
              value={formData.doctor_id}
              onChange={handleChange}
            >
              <option value="">{t("selectHost")}</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="encounters_types_id">{t("meetingType")}:</label>
            <select
              className="form-control"
              name="encounters_types_id"
              value={formData.encounters_types_id}
              onChange={handleChange}
            >
              <option value="">{formData.encounters_types_name}</option>
              {encounterTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="seats_num">{t("seats")}:</label>
            <input
              type="text"
              className="form-control"
              name="seats_num"
              value={formData.seats_num}
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
          <div className="col-md-6">
            <label htmlFor="date">{t("date")}:</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="time">{t("time")}:</label>
            <input
              type="time"
              className="form-control"
              name="time"
              value={formData.time}
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
          <div className="col-md-12">
            <label htmlFor="image">{t("image")}:</label>

            {formData.image && (
              <div className="mb-3">
                <img
                  src={formData.image}
                  alt={t("imageAlt")}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            <input
              type="file"
              className="form-control py-5"
              onChange={handleImageChange}
            />
          </div>
          <div className="BottomButtons">
            <button className="save" type="submit" disabled={isLoading}>
              <span>{isLoading ? t("saving") : t("save")}</span>
            </button>
            <button type="button" className="cancel">
              <Link to="/Meetings">
                <span>{t("cancel")}</span>
              </Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMeetings;
