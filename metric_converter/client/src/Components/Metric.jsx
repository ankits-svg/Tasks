import React, { useState } from "react";
import Footer from "./Footer";
import "./Metric.css";

const Metric = () => {
  const [digit, setDigit] = useState();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [ans, setAns] = useState();

  const handleConvert = () => {
    let obj = {
      digit: +digit,
      from: from,
      to: to,
    };
    
    if(obj.digit!=="" && obj.from!=="" && obj.to!==""){
        fetch("http://localhost:2000/met/", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.msg);
        let newvalue = `${res.data} ${to}`;
        setAns(newvalue);
        setDigit(0);
        setFrom("");
        setTo("");
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
        alert("Please fill out this field")
    }
  };
  return (
    <div className="box1">
      <div className="box2">
        Digit:
        <input
          type="number"
          placeholder="Enter the digit"
          value={digit}
          onChange={(e) => setDigit(e.target.value)}
          required
        />
        From:
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
        To:
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
        <button className="btn" onClick={handleConvert}>
          Convert
        </button>
      </div>
      <div className="answ"><strong style={{color:"blue"}}>Result</strong>: {ans}</div>
      <h2>Supported Units for this application</h2>
      <Footer />
    </div>
  );
};

export default Metric;
