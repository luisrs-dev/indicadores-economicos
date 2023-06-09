import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { indicators as dataIndicators } from "../data/indicators.jsx";
import { token } from "../data/token.jsx";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function App() {
  
    const [indicators, setIndicators] = useState([]);
  const [allIndicators, setAllIndicators] = useState([]);

  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  const apiGetToken = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userName: "reyes.silva.luis@gmail.com",
        flagJson: true,
      }),
    };
    // fetch("https://postulaciones.solutoria.cl/api/acceso", { requestOptions })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setIndicators(dataIndicators);
    //   })
    //   .catch((error) => console.error(error));
  };

  useEffect(() => {
    apiGetToken();
    setAllIndicators(dataIndicators);
    // const headers = { 'Authorization': `'Bearer ${token}'` };
    // fetch('https://postulaciones.solutoria.cl/api/indicadores', {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: headers}
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    //   })
    // .catch(error => console.error(error))
  }, []);

  const handleSearchIndicators = () => {
    let filteredIndicators = allIndicators.filter((indicator) => {
      let indicatorDate = new Date(indicator.fechaIndicador)
        .toISOString()
        .slice(0, 10);
      return indicatorDate >= startDate && indicatorDate <= endDate;
    });
    setIndicators(filteredIndicators);
  };

  const handleSelect = (date) => {
    let filtered = allIndicators.filter((indicator) => {
      let indicatorDate = new Date(indicator.fechaIndicador);
      return (
        indicatorDate >= date.selection.startDate &&
        indicatorDate <= date.selection.endDate
      );
    });

    console.log(filtered);

    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setIndicators(filtered);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <>
      <div className="container">
        <h1>Indicadores Económicos</h1>
        <div className="row">
          <div className="col">
            <Form.Control
              type="date"
              id="startDate"
              onChange={() =>
                setStartDate(document.getElementById("startDate").value)
              }
              defaultValue={startDate}
            />
          </div>
          <div className="col">
            <Form.Control
              type="date"
              id="endDate"
              onChange={() =>
                setEndDate(document.getElementById("endDate").value)
              }
              defaultValue={endDate}
            />
          </div>
          <div className="col">
            <Button variant="danger" onClick={handleSearchIndicators}>
              Buscar
            </Button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              {indicators
                ? indicators.map((indicator, index) => {
                    return (
                      <p key={index}>
                        {indicator.fechaIndicador} //{" "}
                        {indicator.nombreIndicador}{" "}
                      </p>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>

      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
