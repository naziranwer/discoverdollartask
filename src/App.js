import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Navabar from "./components/Navabar";
import ProductCard from "./components/Card";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { useDispatch } from "react-redux";
import { addSelectedProducts } from "./redux/action";

const App = () => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        // Work with the JSON data here
        console.log(data);
        dispatch(addSelectedProducts(data.products));

        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);
  console.log("array", data.products);

  console.log("data sent to redux");

  return (
    <>
      <Navabar />
      <Header />
      {/* <Hero/> */}
      <ProductCard />
      <Footer />
    </>
  );
};

export default App;
