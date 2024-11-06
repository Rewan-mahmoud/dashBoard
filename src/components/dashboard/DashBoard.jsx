import dr from "../../assests/SVGRepo_iconCarrier (1).svg";
import patient from "../../assests/colorPatient.svg";
import colorUsers from "../../assests/colorUsers.svg";
import Chart from "../../assests/Chart 1.png";
import Table from "../Table/Table";
import Rating from "../ratingBar/Rating";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import "./dashboard.css";
import Reservation from "../../components/reservation/Reservation";
import Charts from "../../components/DashboardCharts/Charts";
import RatingPage from "../RatingsPage/RatingPage";

function DashBoard() {
  const { t } = useTranslation(); // Initialize t function for translations

  return (
    <>
      <div className="DashBoard px-4 col-m-10">
        <div className="container">
          <div className="row cardContainer">
            <div className="dashBoardCard d-flex ">
              <div className="circle">
                <img src={dr} alt={t("alt.doctorsIcon")} />
              </div>
              <div className="titles">
                <h4>{t("dashboard.doctors")}</h4>
                <span>{t("dashboard.doctorsCount")}</span>
                <p>
                  <span className="number">
                    {t("dashboard.newDoctorsCount")}
                  </span>{" "}
                  {t("dashboard.joinedThisWeek")}
                </p>
              </div>
            </div>

            <div className="dashBoardCard d-flex ">
              <div className="circle">
                <img src={patient} alt={t("alt.patientsIcon")} />
              </div>
              <div className="titles">
                <h4>{t("dashboard.patients")}</h4>
                <span>{t("dashboard.patientsCount")}</span>
                <p>
                  <span className="number">
                    {t("dashboard.newPatientsCount")}
                  </span>{" "}
                  {t("dashboard.joinedThisWeek")}
                </p>
              </div>
            </div>

            <div className="dashBoardCard d-flex ">
              <div className="circle">
                <img src={colorUsers} alt={t("alt.staffIcon")} />
              </div>
              <div className="titles">
                <h4>{t("dashboard.staff")}</h4>
                <span>{t("dashboard.staffCount")}</span>
                <p>
                  <span className="number">{t("dashboard.newStaffCount")}</span>{" "}
                  {t("dashboard.joinedThisWeek")}
                </p>
              </div>
            </div>
          </div>
          <Charts />
          <Reservation />
          <RatingPage />
        </div>
      </div>
    </>
  );
}

export default DashBoard;
