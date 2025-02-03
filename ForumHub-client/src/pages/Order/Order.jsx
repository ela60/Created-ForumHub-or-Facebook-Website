import React, { useState } from "react";
import orderImg from "../../assets/shop/banner2.jpg";
import Cover from "../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../hooks/useMenu";
import FoodCard from "../../components/SectionTitle/FoodCard/FoodCard";
import OrderTab from "./Ordertab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
    <Helmet>
        <title>Bistro Boss | Order </title>
    </Helmet>
    const categories = ['salad', 'pizza', 'soup', 'desserts', 'drinks'];
    const { category } = useParams(); 
    const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
   
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");

  console.log("Salad items:", salad);

  return (
    <div>
      <Cover img={orderImg} title={"Order Food"} />
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Desserts</Tab>
          <Tab>Drinks</Tab>
        </TabList>

        <TabPanel>
         <OrderTab items={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={dessert}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={drinks}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
