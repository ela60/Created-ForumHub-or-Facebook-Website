import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const Menucategory = ({items,title,img}) => {
    return (
        <div className='pt-8'>
           { title &&  <Cover img={img} title={title} ></Cover>}
            <div className="grid md:grid-cols-2 gap-6 mb-4 my-16">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
            </div> 
            <div className='flex flex-col items-center'
            >
            <Link to={`/order/${title}`}>
            <button className="btn btn-outline  border-b-8 mt-4 mb-4 ">Order Your Favorite Food </button></Link>
           </div>
        </div>
    );
};

export default Menucategory;
