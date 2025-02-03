import React from 'react';
import FoodCard from '../../../components/SectionTitle/FoodCard/FoodCard';

const OrderTab = ({items}) => {
    return (
        <div className="grid md:grid-cols-3 gap-6 mb-4 my-16">
        {items.map((item) => (
          <FoodCard key={item._id} item={item} />
        ))}
      </div>
    );
};

export default OrderTab;