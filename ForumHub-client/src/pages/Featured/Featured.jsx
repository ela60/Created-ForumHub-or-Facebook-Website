import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import './Featured.css'

const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white pt-6 my-16">
      <SectionTitle subheading={"check it out"} heading={"From Our Menu"} />
      <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-40 pb-20 pt-12  px-36">
        <div>
          <img src={featuredImg} alt="Featured dish" />
        </div>

        <div className="md:ml-10">
          <p>Aug 20, 2029</p>
          <p className="uppercase">Where can I get some?</p>
          <p>
            The "Featured" section highlights special items from the menu,
            giving users a glimpse of standout dishes. With an inviting heading
            like "From Our Menu" and a catchy subheading "Check it Out," this
            section draws attention to a specific feature or promotion. Visual
            Appeal: Includes a captivating image of the featured dish to entice
            food lovers. Purpose: Creates excitement and encourages users to
            explore more of the menu or try the highlighted items.
          </p>
          <button className="btn btn-warning border-b-8 mt-4">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
