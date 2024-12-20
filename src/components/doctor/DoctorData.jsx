import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import trash from "../../assests/trash.svg";
import { useAuth } from "../../AuthContext";
import { useTranslation } from 'react-i18next';
export default function DoctorData() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const doctor = location.state?.doctor || {};
  const [formData, setFormData] = useState({
    nameArabic: doctor.name || "",
    nameEnglish: doctor.nameEnglish || "",
    mobile: doctor.mobile || "",
    gender: doctor.gender || "",
    email: doctor.email || "",
    country: doctor.country || "",
    experience: doctor.exp_num || "",
    bio: doctor.details || "",
    bioEnglish: doctor.bioEnglish || "",
    skills: doctor.skills || "",
    skillsEnglish: doctor.skillsEnglish || "",
    specialties: doctor.specialties || "",
    specialtiesEnglish: doctor.specialtiesEnglish || "",
    work_times: doctor.work_times || [{ id: 1, start: "", end: "" }],
  });
  const [works, setWorks] = useState(
    doctor.work_times || [{ id: 1, start: "", end: "" }]
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  // Refs for the file inputs
  const imageRef = useRef(null);
  const sealsRef = useRef(null);
  const signatureRef = useRef(null);

  useEffect(() => {
    if (doctor.id) {
      setFormData({
        nameArabic: doctor.name || "",
        nameEnglish: doctor.nameEnglish || "",
        mobile: doctor.mobile || "",
        gender: doctor.gender || "",
        email: doctor.email || "",
        country: doctor.country || "",
        experience: doctor.exp_num || "",
        bio: doctor.details || "",
        bioEnglish: doctor.bioEnglish || "",
        skills: doctor.skills || "",
        skillsEnglish: doctor.skillsEnglish || "",
        specialties: doctor.specialties || "",
        specialtiesEnglish: doctor.specialtiesEnglish || "",
        work_times: doctor.Attendance?.map((attendance) => ({
          id: attendance.id,
          start: attendance.start_time,
          end: attendance.end_time,
        })) || [{ id: 1, start: "", end: "" }], // Default value if no Attendance
      });

      setWorks(
        doctor.Attendance?.map((attendance) => ({
          id: attendance.id,
          start: attendance.start_time,
          end: attendance.end_time,
        })) || [{ id: 1, start: "", end: "" }]
      );
    }
  }, [doctor]);
  useEffect(() => {
  const fetchDoctorDetails = async (id) => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/show_doctores/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          'lang': i18n.language,
        },
      });

      const result = await response.json();
      if (result.status) {
        const fetchedDoctor = result.data; // Assuming result.data contains doctor details

        // Update the formData state with the fetched doctor details
        setFormData({
          nameArabic: fetchedDoctor.name || "",
          nameEnglish: fetchedDoctor.nameEnglish || "",
          mobile: fetchedDoctor.mobile || "",
          gender: fetchedDoctor.gender || "",
          email: fetchedDoctor.email || "",
          country: fetchedDoctor.country || "",
          experience: fetchedDoctor.exp_num || "",
          bio: fetchedDoctor.details || "",
          bioEnglish: fetchedDoctor.bioEnglish || "",
          skills: fetchedDoctor.skills || "",
          skillsEnglish: fetchedDoctor.skillsEnglish || "",
          specialties: fetchedDoctor.specialties || "",
          specialtiesEnglish: fetchedDoctor.specialtiesEnglish || "",
          work_times: fetchedDoctor.Attendance?.map((attendance) => ({
            id: attendance.id,
            start: attendance.start_time,
            end: attendance.end_time,
          })) || [{ id: 1, start: "", end: "" }],
        });

        setWorks(
          fetchedDoctor.Attendance?.map((attendance) => ({
            id: attendance.id,
            start: attendance.start_time,
            end: attendance.end_time,
          })) || [{ id: 1, start: "", end: "" }]
        );
      } else {
        setError(result.message || "Failed to fetch doctor details");
      }
    } catch (error) {
      setError("Failed to fetch doctor details. Please try again.");
    }
  };

  if (doctor.id) {
    // Fetch doctor details if doctor ID is available
    fetchDoctorDetails(doctor.id);
  }
}, [doctor.id, token]);

  const addWork = () => {
    setWorks([...works, { id: works.length + 1, start: "", end: "" }]);
  };

  const removeWork = (id) => {
    if (id !== 1) {
      // Ensure the first work item is not removed
      setWorks(works.filter((work) => work.id !== id));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();

      // Append non-file fields
      formDataToSend.append("name_ar", formData.nameArabic || "");
      formDataToSend.append("name_en", formData.nameEnglish || "");
      formDataToSend.append("details_ar", formData.bio || "");
      formDataToSend.append("details_en", formData.bioEnglish || "");
      formDataToSend.append("specialties_ar", formData.specialties || "");
      formDataToSend.append(
        "specialties_en",
        formData.specialtiesEnglish || ""
      );
      formDataToSend.append("gender", formData.gender || "");
      formDataToSend.append("country", formData.country || "");
      formDataToSend.append("skiles_ar", formData.skills || "");
      formDataToSend.append("skiles_en", formData.skillsEnglish || "");
      formDataToSend.append("exp_num", formData.experience || "");
      formDataToSend.append("email", formData.email || "");
      formDataToSend.append("mobile", formData.mobile || "");

      // Append each work time as individual fields
      works.forEach((work, index) => {
        formDataToSend.append(`items[${index}][id]`, work.id);
        formDataToSend.append(`items[${index}][start_time]`, work.start || "");
        formDataToSend.append(`items[${index}][end_time]`, work.end || "");
      });

      // Append files if they are uploaded
      if (imageRef.current && imageRef.current.files[0]) {
        formDataToSend.append("image", imageRef.current.files[0]);
      } else if (doctor.image) {
        formDataToSend.append("image", doctor.image);
      }

      if (sealsRef.current && sealsRef.current.files[0]) {
        formDataToSend.append("seals", sealsRef.current.files[0]);
      } else if (doctor.seals) {
        formDataToSend.append("seals", doctor.seals);
      }

      if (signatureRef.current && signatureRef.current.files[0]) {
        formDataToSend.append("signature", signatureRef.current.files[0]);
      } else if (doctor.signature) {
        formDataToSend.append("signature", doctor.signature);
      }

      const endpoint = doctor.id
        ? `https://naql.nozzm.com/api/update_doctores/${doctor.id}`
        : "https://naql.nozzm.com/api/add_doctores";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          lang: "en",
        },
        body: formDataToSend,
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Failed to add/update doctor");
        setIsLoading(false);
        return;
      }

      // After successful submission, navigate back to the Doctor component and pass a state
      navigate("/Doctor", { state: { updated: true } });
    } catch (error) {
      setError(
        "Failed to fetch. Please check your network connection and try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="container DoctorsProfile tables bg-white">
      <div className="tableTitle d-flex justify-content-between">
        <h3>بيانات الطبيب المعالج</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row settingForm justify-content-around">
          <div className="col-md-6">
            <label htmlFor="nameArabic">الاسم باللغة العربية:</label>
            <input
              type="text"
              className="form-control"
              name="nameArabic"
              value={formData.nameArabic}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="nameEnglish">الاسم باللغة الانجليزية:</label>
            <input
              type="text"
              className="form-control"
              name="nameEnglish"
              value={formData.nameEnglish}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="mobile">رقم الجوال:</label>
            <input
              type="text"
              className="form-control"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="gender">الجنس:</label>
            <input
              type="text"
              className="form-control"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email">الايميل:</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="country">الدولة:</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div id="work-container" className="col-md-12">
            {works.map((work, index) => (
              <div
                className="d-flex justify-content-around work mt-3"
                key={work.id}
              >
                <div className="col-md-5">
                  <label htmlFor={`start-${work.id}`}>بداية دوام:</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`start-${work.id}`}
                    value={work.start}
                    onChange={(e) => {
                      const newWorks = [...works];
                      newWorks[index].start = e.target.value;
                      setWorks(newWorks);
                    }}
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor={`end-${work.id}`}>نهاية دوام:</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`end-${work.id}`}
                    value={work.end}
                    onChange={(e) => {
                      const newWorks = [...works];
                      newWorks[index].end = e.target.value;
                      setWorks(newWorks);
                    }}
                  />
                </div>
                {work.id !== 1 && (
                  <img
                    src={trash}
                    className="trash"
                    alt="Delete"
                    onClick={() => removeWork(work.id)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="col-md-12 mt-3 addAnotherWork">
            <input
              type="button"
              value="اضافة دوام اخر"
              className="form-control text-center addWork"
              onClick={addWork}
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="experience">الخبرة:</label>
            <input
              type="text"
              className="form-control"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="bio">سيرة شحصية:</label>
            <input
              type="text"
              className="form-control py-5"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="bioEnglish">سيرة شحصية باللغة الانجليزية:</label>
            <input
              type="text"
              className="form-control py-5"
              name="bioEnglish"
              value={formData.bioEnglish}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="image">صورة الطبيب:</label>
            {doctor.image && (
              <div className="mb-3">
                <img
                  src={doctor.image}
                  alt="Doctor"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </div>
            )}
            <input
              type="file"
              name="image"
              ref={imageRef}
              className="form-control"
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="skills">المهارات:</label>
            <input
              type="text"
              className="form-control py-5"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="skillsEnglish">المهارات باللغة الانجليزية:</label>
            <input
              type="text"
              className="form-control py-5"
              name="skillsEnglish"
              value={formData.skillsEnglish}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="specialties">التخصصات:</label>
            <input
              type="text"
              className="form-control py-5"
              name="specialties"
              value={formData.specialties}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="specialtiesEnglish">
              التخصصات باللغة الانجليزية:
            </label>
            <input
              type="text"
              className="form-control py-5"
              name="specialtiesEnglish"
              value={formData.specialtiesEnglish}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="seals">الختم:</label>
            {doctor.seals && (
              <div className="mb-3">
                <img
                  src={doctor.seals}
                  alt="Seals"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </div>
            )}
            <input
              type="file"
              name="seals"
              ref={sealsRef}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="signature">التوقيع:</label>
            {doctor.signature && (
              <div className="mb-3">
                <img
                  src={doctor.signature}
                  alt="Signature"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </div>
            )}
            <input
              type="file"
              name="signature"
              ref={signatureRef}
              className="form-control"
            />
          </div>

          <div className="BottomButtons">
            <button className="save" type="submit" disabled={isLoading}>
              <span>{isLoading ? "جاري الحفظ..." : "حفظ"}</span>
            </button>
            <button
              className="cancel"
              type="button"
              onClick={() => navigate("/Doctor")}
            >
              <span> الغاء</span>
            </button>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </form>
    </div>
  );
}
