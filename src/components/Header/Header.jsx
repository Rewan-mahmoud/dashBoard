import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n"; // Ensure i18n is set up properly
import "./header.css";
import img from "../../assests/logo.png";
import Vector from "../../assests/Vector.svg";
import star from "../../assests/ic_sharp-star.svg";
import person from "../../assests/gg_profile.svg";
import Verticalcontainer from "../../assests/Vertical container.svg";
import mingcute from "../../assests/mingcute_more-2-fill.svg";
import search from "../../assests/search-normal.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Switch between Arabic and English
  const switchLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  useEffect(() => {
    const path = location.pathname;
    setActiveLink(path);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update document direction (RTL/LTR) based on the language
  useEffect(() => {
    if (currentLanguage === "ar") {
      document.body.setAttribute("dir", "rtl");
    } else {
      document.body.setAttribute("dir", "ltr");
    }
  }, [currentLanguage]);

  return (
    <div className={`Header ${isScrolled ? "scrolled" : ""} ${currentLanguage === "ar" ? "rtl" : "ltr"}`}>
      <nav className="d-flex align-items-center justify-content-between">
        <div>
          <img src={img} width="100" alt="logo" />
          <Link to="/Dashboard" className="title">
            {t("SelfExpert")}
          </Link>
        </div>

        <div className="searchContainer">
          <input
            className="searchInput"
            placeholder={t("Search")}
            type="search"
            aria-label={t("Search")}
          />
          <img className="searchIcon" src={search} alt="Search" />
        </div>

        <div className="HeaderIcons">
          <a href="">
            <img src={Vector} alt="Vector" />
          </a>
          <a href="/RatingPage">
            <img src={star} alt="Star" />
          </a>
          <a href="">
            <img src={person} alt="Person" />
          </a>
          <a href="">
            <img src={Verticalcontainer} alt="Vertical Container" />
          </a>

          {/* Language Switch Button */}
          <FontAwesomeIcon
            icon={faGlobe}
            onClick={switchLanguage}
            style={{ cursor: "pointer" }}
            color="#299ECC"
          />
          <span style={{ marginLeft: "10px", cursor: "pointer" }} onClick={switchLanguage}>
            {currentLanguage === "en" ? "العربية" : "English"}
          </span>

          <div className="dropdown">
            <a href="">
              <img src={mingcute} alt="Mingcute" />
            </a>
            <div className="dropdown-content logout">
              <a href="/Login">{t("logout")}</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
