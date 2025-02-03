import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Rating from "react-rating-stars-component";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div>
      <section>
        <SectionTitle
          subheading="What Our Clients Say?"
          heading="Testimonials"
        ></SectionTitle>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          spaceBetween={30}
          slidesPerView={1}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
                  <div className=" flex flex-col items-center mx-24 my-16">
                       {/* React Rating Component */}
                  <Rating
                    count={5}
                    value={review.rating} // 
                    size={24}
                    activeColor="#ffd700"
                    isHalf={true}
                    edit={false} 
                  />
                <p className="my-4 text-lg text-gray-700">{review.details}</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl text-orange-400 font-semibold">
                    {review.name}
                  </h3>
                 
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Testimonials;
