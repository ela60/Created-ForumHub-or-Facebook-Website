import React from 'react';
import { Helmet }
from 'react-helmet-async'
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';

import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import Menucategory from '../MenuCategory/Menucategory';

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered= menu.filter(item => item.category === 'offered');
    return (
        <div>
            <Helmet >
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menuImg} title={"Our menu"}></Cover>
            {/* main cover */}
            <SectionTitle subheading={"Don't Miss"} heading={"Today's offer"} ></SectionTitle>
            {/* offered menu items */}
            <Menucategory items={offered}></Menucategory>
            {/* dessert menu items */}
            <Menucategory
                
                items={dessert}
                title={'Dessert'}
                img={dessertImg}
            ></Menucategory>
            <Menucategory
                
                items={pizza}
                title={'pizza'}
                img={pizzaImg}
            ></Menucategory>
            <Menucategory
                
                items={salad}
                title={'salad'}
                img={saladImg}
            ></Menucategory>
            <Menucategory
                
                items={soup}
                title={'soup'}
                img={soupImg}
            ></Menucategory>
           
        </div>
    );
};

export default Menu;