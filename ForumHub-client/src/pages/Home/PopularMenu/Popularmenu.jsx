import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const Popularmenu = () => {
    const [menu] = useMenu([]);
    const popular = menu.filter(item => item.category === 'popular');
  // const [menu, setMenu] = useState([]);
  // useEffect(() => {
  //     fetch('menu.json')
  //         .then(res => res.json())
  //         .then(data => {
  //             const popularItems = data.filter(item => item.category === 'popular');
  //             setMenu(popularItems)
  //         })
  // },[])
  return (
    <section className="mb-12">
      <SectionTitle
        subheading={"Check it out"}
        heading={"From Our Menu"}
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-6">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center mt-6">
        <button className="btn btn-outline border-b-8 mt-4 uppercase text-center ">
          View Full menu
        </button>
      </div>
    </section>
  );
};

export default Popularmenu;
