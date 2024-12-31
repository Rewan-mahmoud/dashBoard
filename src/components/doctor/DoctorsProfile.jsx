import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import starFilled from "../../assests/star.svg";
import doctorPhoto from "../../assests/doctotph.png";
import seal from "../../assests/seal.svg";
import signature from "../../assests/signature.svg";
import { useAuth } from "../../AuthContext";
import { useTranslation } from "react-i18next";

const DoctorsProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`https://naql.nozzm.com/api/show_doctores/${id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            lang: i18n.language,
          },
        });

        const result = await response.json();
        if (result.status) {
          setDoctor(result.data);
        } else {
          console.error("Failed to fetch data:", result.message);
          setError(result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchDoctor();
  }, [id]);

  return (
    <div className="container DoctorsProfile tables bg-white mt-5">
      <div className="tableTitle">
        <h3>{t("doctorProfile.title")}</h3>
      </div>
      <div className="d-flex">
        <div className="imgDr">
          <img src={doctor.image || doctorPhoto} alt={doctor.name || t("doctorProfile.defaultName")} />
        </div>
        <div className="doctorProfileInfo">
          <h2>{doctor.name}</h2>
          <p className="mt-4">
            {doctor.specialties} <span>4.5 <img src={starFilled} alt={t("doctorProfile.ratingAlt")} /></span>
          </p>
          <p className="me-3">{doctor.mobile}</p>
        </div>
      </div>

      <div className="work DoctorsProfileTitle">
        <h2>{t("doctorProfile.workSchedule")}</h2>
        {doctor.Attendance && doctor.Attendance.length > 0 ? (
          doctor.Attendance.map((attendance, index) => (
            <div className="d-flex align-items-center mt-5" key={index}>
              <div className="time">
                <span>{attendance.start_time} {t("doctorProfile.am")}</span>
              </div>
              <p>{t("doctorProfile.to")}</p>
              <div className="time">
                <span>{attendance.end_time} {t("doctorProfile.pm")}</span>
              </div>
            </div>
          ))
        ) : (
          <p>{t("doctorProfile.noSchedule")}</p>
        )}
      </div>

      <div className="pref DoctorsProfileTitle">
        <h2>{t("doctorProfile.biography")}</h2>
        <p>{doctor.details}</p>
      </div>
      <div className="special DoctorsProfileTitle">
        <h2>{t("doctorProfile.specialties")}</h2>
        <div className="description d-flex flex-wrap">
          {doctor.specialties?.split(",").map((specialty, index) => (
            <p key={index}>{specialty}</p>
          ))}
        </div>
      </div>
      <div className="pref DoctorsProfileTitle">
        <h2>{t("doctorProfile.experience")}</h2>
        <p>
          {t("doctorProfile.experienceYears", { years: doctor.exp_num })} {doctor.details}
        </p>
      </div>
      <div className="special DoctorsProfileTitle">
        <h2>{t("doctorProfile.skills")}</h2>
        <div className="description d-flex flex-wrap">
          {doctor.skills?.split(",").map((skill, index) => (
            <p key={index}>{skill}</p>
          ))}
        </div>
      </div>
      <div className="seal DoctorsProfileTitle">
        <h2>{t("doctorProfile.seal")}</h2>
        <div className="text-center">
          <img width="80%" src={doctor.seals || seal} alt={t("doctorProfile.sealAlt")} />
        </div>
      </div>
      <div className="seal DoctorsProfileTitle">
        <h2>{t("doctorProfile.signature")}</h2>
        <div className="text-center">
          <img width="80%" src={doctor.signature || signature} alt={t("doctorProfile.signatureAlt")} />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default DoctorsProfile;
