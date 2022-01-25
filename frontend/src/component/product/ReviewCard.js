import React from 'react'
import ReactStars from 'react-rating-stars-component';
import profilepng from '../../images/user-1.png'
export default function ReviewCard({review}) {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.2)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 15 : 20,
        value:review.rating,
        isHalf: true,
      };
    return (
        <div className="reviewCard">
            <img src={profilepng} alt="user" width="50px" />
            <p>{review.name}</p>
           
            <ReactStars {...options }/>
            <span>{review.comment}</span>
        </div>
    )
}
