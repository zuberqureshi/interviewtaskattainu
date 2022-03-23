import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
const _ = require("lodash");  

const Home = () => {
   const [Text, setText] = useState("");
  const [ProductDetail, setProductDetail] = useState([]);
  const [pricefilter, setpricefilter] = useState([]);


  const getallrestaurant =   () => {
  
    UserService.getallrestaurant(Text).then(
      (response) => {
         setProductDetail(response.data);
const data =response.data;
 
 var clean = data.filter((data, index, self) =>
index === self.findIndex((t) => (t.place === data.place && t.place === data.place)))
setpricefilter(clean);

 


      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

       // setContent(_content);
      }

    );

  };
  useEffect(() => {
    getallrestaurant();
  }, []);
 

  function handleChange(e) {
    setText(e.target.value);
    console.log(Text);
    getallrestaurant();

   }

  function filterbyplace(e) {
    console.log(e.target.value);
   var fild=  ProductDetail.filter(function(item){
      return item.place == e.target.value;         
  });
console.log(fild);
  setProductDetail(fild);

   }
  return (
    <>
    <div className="container">
      <header className="jumbotron">
         


      <h2> All Restaurant </h2>
<input type="text"  placeholder="Search Here by name "  className="form-control" onChange={handleChange} />

<h3> Filter by Place </h3>
<select  class="form-control" onChange={filterbyplace} >

{pricefilter &&   pricefilter.map((pf, i) => { 
  return(
<option  value={pf.place} > {pf.place }    </option>
  );
      })}

</select>


      <div className="container row">

      {ProductDetail &&   ProductDetail.map((exhibition, i) => {
                return (
 
<div className="col-md-4"> 

<div class="card img-fluid" style={{"width":"500px"}}>
    <img className="card-img-top" src={ exhibition.img} alt="Card image" style={{"width":"100%"}} />
    <h4 className="card-title">{exhibition.name} -  Location: {exhibition.place} </h4>
    <a href="#" className="btn btn-primary"> Price {exhibition.price }  </a>

   
  </div>

</div>

 
                 );
              })}


 

</div>


      </header>
    </div>

    </>

  );
};

export default Home;
