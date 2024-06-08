import React from 'react';
import './header.css';
import img from '../../assests/logo.png';
import Vector from '../../assests/Vector.svg';
import star from '../../assests/ic_sharp-star.svg';
import person from '../../assests/gg_profile.svg';
import Verticalcontainer from '../../assests/Vertical container.svg';
import mingcute from '../../assests/mingcute_more-2-fill.svg';
import search from '../../assests/search-normal.svg';
import SideNavbar from '../sideNavbar/SideNavbar';

function Header() {
  return (
    <>
      <div className="Header">
        <nav className='d-flex align-items-center justify-content-between'>
          <div>
            <img src={img} width="100" alt=""/>
            <a className='title'>خبراء النفس</a>
          </div>

          <div className="searchContainer">
            <input
              className="searchInput"
              placeholder="بحث"
              type="search"
              aria-label="Search"
            />
            <img className="searchIcon" src={search} alt="Search" />
          </div>

          <div className='HeaderIcons'>
            <a href=""><img src={Vector} alt=""/></a>
            <a href="/RatingPage"><img src={star} alt=""/></a>  
            <a href=""><img src={person} alt=""/></a>
            <a href=""><img src={Verticalcontainer} alt=""/></a>
            <div className="dropdown">
              <a href=""><img src={mingcute} alt=""/></a>
              <div className="dropdown-content logout">
                <a href="/Login">تسجيل خروج</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
