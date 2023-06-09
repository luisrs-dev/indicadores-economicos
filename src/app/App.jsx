import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { indicators as dataIndicators } from "../data/indicators240.jsx";
import { token } from "../data/token.jsx";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ChartBar from './charts/Bar.jsx'

function App() {
  const [filteredIndicators, setFilteredIndicators] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [indicatorsAPI, setIndicatorsAPI] = useState([]);
  const [registeredIndicators, setRegisteredIndicators] = useState(0); 
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [dataChart, setDataChart] = useState(null)
  const [labelsChart, setLabelsChart] = useState(null)

  const handleSearchIndicators = () => {
    let filtered = indicators.filter((indicator) => {
      let indicatorDate = new Date(indicator.fechaIndicador)
        .toISOString()
        .slice(0, 10);
      return indicatorDate >= startDate && indicatorDate <= endDate;
    });
    setFilteredIndicators(filtered);
    const dates = filtered.map(indicator => new Date(indicator.fechaIndicador).toISOString().slice(0, 10) );
    const labels = [...new Set(dates)].sort(function(a,b){
      return new Date(a) - new Date(b)
});
    setLabelsChart(labels)    
    
    const dataIndicators = [];
    filtered.map(indicador => {
      const found = dataIndicators.find( d => d.nombre == indicador.nombreIndicador) 
      if(!found){
        dataIndicators.push({nombre : indicador.nombreIndicador, valores : [{valor : indicador.valorIndicador, fecha : new Date(indicador.fechaIndicador).toISOString().slice(0, 10)} ] }) 
      }else{
        found.valores.push({valor : indicador.valorIndicador, fecha : new Date(indicador.fechaIndicador).toISOString().slice(0, 10)})
      }
    })
    
    dataIndicators.forEach(dataIndicator => {
      dataIndicator.dataset = []
      labels.forEach(label => {
        let found = dataIndicator.valores.find(data => data.fecha == label)
        dataIndicator.dataset.push(found ? found.valor : 0)
      })
      });

      const dataToChart = dataIndicators.map(d => {
        return  {label : d.nombre, data : d.dataset, backgroundColor: randomColor(), }
      })

      setDataChart(dataToChart)

  };

  const randomColor = () => {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    // var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    var bgColor = `rgba(${x},${y},${z},0.5)`;
    return bgColor;
  }

  
  useEffect( () => {
    console.log(dataChart);
    console.log(labelsChart);
  }, [dataChart, labelsChart])

  const loadIndicators = () => {
    try {
      indicatorsAPI.forEach((indicator) => {
        fetch("/api/indicators", {
          method: "POST",
          body: JSON.stringify(indicator),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((data) => data.json())
          .then((data) => {
            // M.toast({html: 'Tarea guardada'})
            // setTask({title : '', description : ''})
            console.log(data);
            setRegisteredIndicators(data.records);
            // fetchTasks()
          })
          .catch((err) => console.error(err));
      }); 
      fetchIndicators();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIndicators = () => {
    fetch("/api/indicators")
      .then((data) => data.json())
      .then((data) => {
        setIndicators(data.indicators)
        setRegisteredIndicators(data.records)
        // setTasks(data)
        // console.log(tasks);
      })
      .catch((err) => console.error(err));
  };

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
    setIndicatorsAPI(dataIndicators);
    fetchIndicators();
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

  return (
    <>
      
        <div className="container">
          <h1>Indicadores Económicos</h1>

          <div className="row">
            <div className="col">
              <h6>{registeredIndicators} indicadores registrados</h6>
              <Button onClick={loadIndicators}>Cargar indicadores</Button>
            </div>
          </div>

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

          {/* <div className="row">
            <div className="col">
              <div className="card">
                {filteredIndicators
                  ? filteredIndicators.map((indicator, index) => {
                      return (
                        <p key={index}>
                          {indicator.fechaIndicador} // {indicator.nombreIndicador} // {indicator.valorIndicador} 
                        </p>
                      );
                    })
                  : null}
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-12">
              
              {dataChart && labelsChart ? <ChartBar dataChart={dataChart} labelsChart={labelsChart}></ChartBar> : null}
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
