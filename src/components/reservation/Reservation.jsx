import React, { useState, useEffect } from "react";
import deletee from "../../assests/delete.svg";
import clock from "../../assests/clock-rewind.svg";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../AuthContext';

const Reservation = () => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(""); 
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [show, setShow] = useState(false);

  const timeSlots = ["1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm"];

  const [selectedHour, setSelectedHour] = useState('--');
  const [selectedMinute, setSelectedMinute] = useState('--');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/appointment", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${token}`,
            lang: i18n.language,
          }
        });

        const result = await response.json();
        if (result.status) {
          setData(result.data.data);
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
  }, [token, i18n.language]);

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
    const fetchPatients = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/patients", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.status) {
          setPatients(result.data.data || []);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Failed to fetch patients");
      }
    };

    fetchPatients();
  }, [token]);

  const handleShow = async (id) => {
    try {
      const response = await fetch(`https://naql.nozzm.com/api/show_appointment/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.status) {
        setAppointmentDetails(result.data); // Store the fetched data in state
        setSelectedDoctor(result.data.doctor_name); // Prefill doctor name
        setSelectedPatient(result.data.patient_name); // Prefill patient name
        setSelectedDate(result.data.date); // Prefill date
        const [hour, minute] = result.data.time.split(':'); // Prefill hour and minute
        setSelectedHour(hour);
        setSelectedMinute(minute);
        setSelectedTime(result.data.time); // Prefill time
        setShow(true); // Show the modal
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error fetching appointment details:", error);
      setError(error.message);
    }
  };

  const handleDelete = (id) => {
    const newData = data.filter((row) => row.id !== id);
    setData(newData);
  };

  const handleClose = () => {
    setShow(false);
    setAppointmentDetails(null); // Reset appointment details when closing the modal
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    const [hour, minute] = time.split(':');
    setSelectedHour(hour);
    setSelectedMinute(minute.replace(' pm', '').replace(' am', '')); // Remove am/pm for display
  };

  const handleSave = () => {
    // Perform save logic here (API call to save changes)
    console.log("Save clicked");
    handleClose(); // Close the modal after saving
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className=" tableTitle  d-flex justify-content-between">
        <h3>الحجوزات</h3>
      </div>

      <table className="table borderless">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">اسم المريض</th>
            <th scope="col">العمر</th>
            <th scope="col">الجنس</th>
            <th scope="col">اسم الجلسة</th>
            <th scope="col">اسم الدكتور</th>
            <th scope="col">مدة الجلسة</th>
            <th scope="col">نوع الجلسة</th>
            <th scope="col">الوقت و التاريخ</th>
            <th scope="col">الاعدادات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.patient_name}</td>
              <td>{row.age}</td>
              <td>{row.gender}</td>
              <td>{row.sessions_title}</td>
              <td>{row.doctor_name}</td>
              <td>{`${row.sessions_num} دقيقة`}</td>
              <td>{row.sessions_kind}</td>
              <td>{`${row.date} ${row.time}`}</td>
              <td>
                <div className="icons">
                  <img
                    variant="primary"
                    onClick={() => handleShow(row.id)} // Pass the row ID to handleShow
                    src={clock}
                    alt=""
                  />
                  <img src={deletee} alt="" onClick={() => handleDelete(row.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reschedule Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>إعادة جدولة الموعد</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {appointmentDetails ? (
            <>
              <div className="settingForm mb-3">
                <label htmlFor="patientSelect">اسم المريض:</label>
                <select
                  id="patientSelect"
                  className="form-control reservationSelect"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)} // Allow user to change patient
                >
                  <option value="">{t("select_patient")}</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.name}>
                      {patient.name}
                    </option>
                  ))}
                </select>
                <div className="ReservationArrow-icon">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>

              <div className="settingForm mb-3">
                <label htmlFor="doctorSelect">الطبيب المعالج:</label>
                <select
                  id="doctorSelect"
                  className="form-control reservationSelect"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)} // Allow user to change doctor
                >
                  <option value="">{t("select_doctor")}</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name}
                    </option>
                  ))}
                </select>
                <div className="ReservationArrow-icon">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>

              <div className="settingForm mb-3">
                <label htmlFor="dateSelect">تحديد تاريخ :</label>
                <input
                  type="date"
                  id="dateSelect"
                  className="form-control reservationSelect"
                  value={selectedDate} // Prefill date value
                  onChange={(e) => setSelectedDate(e.target.value)} // Allow user to change date
                />
              </div>

              {/* Time display */}
              <div className="settingForm mb-3">
                <label>تحديد موعد جديد:</label>
                <div className="time-display d-flex justify-content-around">
                  <div className="time-box">
                    <div className="time-label">الدقائق</div>
                    <div className="time-placeholder">{selectedMinute || '--'}</div>
                  </div>
                  <div className="time-box">
                    <div className="time-label">الساعة</div>
                    <div className="time-placeholder">{selectedHour || '--'}</div>
                  </div>
                </div>
              </div>

              {/* Time selection using buttons */}
              <div className="settingForm mb-3">
                <label>اختيار الوقت:</label>
                <div className="d-flex flex-wrap">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`btn ${selectedTime === time ? 'btn-primary' : 'btn-secondary'} m-2`}
                      onClick={() => handleTimeSelection(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            حفظ
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            الغاء
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reservation;
