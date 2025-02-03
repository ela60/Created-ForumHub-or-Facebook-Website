import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import slider1 from "../../../assets/home/slide1.jpg";
import slider2 from "../../../assets/home/slide2.jpg";
import slider3 from "../../../assets/home/slide3.jpg";
import slider4 from "../../../assets/home/slide4.jpg";
import slider5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Categories = () => {
  return (
    <div className="mt-32 py-10">
      <section>
        <SectionTitle
          subheading={"From 11.00am to 10.00pm"}
          heading={"Order Online"}
        ></SectionTitle>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000, // Adjust the delay time in milliseconds
            disableOnInteraction: false, // Allows autoplay to continue after user interaction
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={slider1} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Salad
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider2} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Pizza
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider3} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Soup
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider4} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Cake
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider5} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Arabic Salad
            </h3>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
};

export default Categories;
