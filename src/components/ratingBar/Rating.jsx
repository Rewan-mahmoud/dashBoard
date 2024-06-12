import React, { useState } from 'react';
import './rating.css'; 

const RatingBar = ({ rating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const handleMouseOut = () => {
    setHoverRating(0);
  };

  const handleClick = (clickedRating) => {
    onRate(clickedRating);
  };

  const stars = [];
  for (let i = 0; i < 5; i++) {
    const starRating = hoverRating === 0 ? rating : hoverRating;
    const filledStar = i < starRating ? "filled" : "";
    stars.push(
      <span
        key={i}
        className={`star ${filledStar}`}
        onMouseOver={() => handleMouseOver(i + 1)}
        onMouseOut={handleMouseOut}
        onClick={() => handleClick(i + 1)}
      >
        &#9733;
      </span>
    );
  }
  return <div className="rating">{stars}</div>;
};

const Rating = () => {
  const [doctorRatings, setDoctorRatings] = useState({
    "Dr. Smith": 0,
    "Dr. Johnson": 0
  });

  const handleRateDoctor = (doctorName, rating) => {
    setDoctorRatings({
      ...doctorRatings,
      [doctorName]: rating
    });
  };

  return (
    <div className="container tables bg-white mt-5">
        <h3 className='ratingTitle' >اعلي تقييما</h3>
    <table className='table borderless '>
      
      <tbody>
        <tr>
            <td>1#</td>
          <td>د/رانيا بشر </td>
          <td>طبيب بشري</td>
          <td>250 تقييما</td>
          
          <td>
            <RatingBar rating={doctorRatings["Dr. Smith"]} onRate={(rating) => handleRateDoctor("Dr. Smith", rating)} />
          </td>
        </tr>
        <tr>
        <td>2#</td>
        <td>د/رانيا بشر </td>
          <td>طبيب بشري</td>
          <td>250 تقييما</td>
          
          <td>
            <RatingBar rating={doctorRatings["Dr. Johnson"]} onRate={(rating) => handleRateDoctor("Dr. Johnson", rating)} />
          </td>
        </tr>
        <tr>
        <td>3#</td>
        <td>د/رانيا بشر </td>
          <td>طبيب بشري</td>
          <td>250 تقييما</td>
          
          <td>
            <RatingBar rating={doctorRatings["Dr. adel"]} onRate={(rating) => handleRateDoctor("Dr. adel", rating)} />
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  );
};

export default Rating;
