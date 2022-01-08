import "./App.css";

import { useEffect, useState } from "react";
import Select from "react-select";
import CarouselCom from "./Component/carousel";
import Responsive from "./Component/slider";
import SimpleSlider from "./Component/slider";

function App() {
  const [data, setData] = useState();
  const [product, setProduct] = useState([{ value: "all", label: "Product" }]);
  const [state, setState] = useState([{ value: "all", label: "State" }]);
  const [city, setCity] = useState([{ value: "all", label: "City" }]);
  const [filter, setFilter] = useState();

  useEffect(async () => {
    let response = await fetch("https://assessment-edvora.herokuapp.com");
    let datapre = await response.json();
    setData(datapre);

    let ref = [];
    datapre.map((element) => {
      ref.push({ value: element.product_name, label: element.product_name });
    });
    setProduct(ref);
  }, []);

  function myTheme(theme) {
    return {
      ...theme,
      borderRadius: 5,

      colors: {
        ...theme.colors,
        primary25: "gray",
        primary: "green",
      },
    };
  }
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      background: "#292929",
      overflow: "hidden",
      color: "black !important",
      border: "none",
    }),
    option: (styles) => ({
      ...styles,
      overflow: "hidden",
      color: "black !important",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "white",
    }),
  };

  function filterFun(source, ref) {
    if (ref) {
      if (source == "product") {
        let output = [];
        data.forEach((element) => {
          if (element.product_name == ref) {
            output.push(element);
          }
        });
        setFilter(output);

        let dummy = [];
        output.map((element) => {
          dummy.push({
            value: element.address.state,
            label: element.address.state,
          });
        });
        setState(dummy);
      } else if (source == "state") {
        let output = [];
        data.forEach((element) => {
          if (element.address.state == ref) {
            output.push(element);
          }
        });
        setFilter(output);

        let dummy = [];
        output.map((element) => {
          dummy.push({
            value: element.address.city,
            label: element.address.city,
          });
        });
        setCity(dummy);
      } else if (source == "city") {
        let output = [];
        data.forEach((element) => {
          if (element.address.city == ref) {
            output.push(element);
          }
        });
        setFilter(output);
      }
    }
  }

  // console.log("data", data);
  return (
    <div className="App">
      <div className="filter">
        <p>Filter</p>
        <div className="select">
          <Select
            options={product}
            defaultValue={{ label: "Product", value: "0" }}
            onChange={(e) => filterFun("product", e.value)}
            styles={colourStyles}
            theme={myTheme}
          />
        </div>
        <div className="select">
          <Select
            options={state}
            defaultValue={{ label: "State", value: "0" }}
            onChange={(e) => filterFun("state", e.value)}
            styles={colourStyles}
            theme={myTheme}
          />
        </div>
        <div className="select">
          <Select
            options={city}
            defaultValue={{ label: "City", value: "0" }}
            onChange={(e) => filterFun("city", e.value)}
            styles={colourStyles}
            theme={myTheme}
          />
        </div>
      </div>
      <div className="body">
        <div className="header">
          <h1>Edvora</h1>
          <p>Products</p>
        </div>
        <div>
          <CarouselCom data={data} />
          {filter && <CarouselCom data={filter} />}
        </div>
      </div>
    </div>
  );
}

export default App;
