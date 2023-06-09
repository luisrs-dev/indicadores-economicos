import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { indicators as dataIndicators } from "../data/allindicators.jsx";
import { token } from "../data/token.jsx";

import { randomColor } from "../utils/colorRandom.js";
import FormIndicators from "./components/FormIndicators.jsx";
import TableIndicators from "./components/TableIndicators.jsx";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ChartBar from "./charts/Bar.jsx";

function App() {
  const [indicator, setIndicator] = useState({
    codigoIndicador: "",
    fechaIndicador: "",
    nombreIndicador: "",
    origenIndicador: "",
    tiempoIndicador: "",
    unidadMedidaIndicador: "",
    valorIndicador: "",
  });
  const [indicators, setIndicators] = useState([]);
  const [indicatorsAPI, setIndicatorsAPI] = useState([]);
  const [registeredIndicators, setRegisteredIndicators] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [dataChart, setDataChart] = useState(null);
  const [labelsChart, setLabelsChart] = useState(null);

  const handleSearchIndicators = () => {
    // TODO
    // Corregir manejo de fechas con Moment
    let filtered = indicators.filter((indicator) => {
      let indicatorDate = new Date(indicator.fechaIndicador)
        .toISOString()
        .slice(0, 10);
      return indicatorDate >= startDate && indicatorDate <= endDate;
    });

    const dates = filtered.map((indicator) =>
      new Date(indicator.fechaIndicador).toISOString().slice(0, 10)
    );

    // Se obtienen labels únicos para gráfico
    const labels = [...new Set(dates)].sort(function (a, b) {
      return new Date(a) - new Date(b);
    });
    setLabelsChart(labels);

    // Se agrupan datos de indicadores por nombre y sus valores por cada fecha
    const dataIndicators = [];
    filtered.map((indicador) => {
      const found = dataIndicators.find(
        (d) => d.nombre == indicador.nombreIndicador
      );
      if (!found) {
        dataIndicators.push({
          nombre: indicador.nombreIndicador,
          valores: [
            {
              valor: indicador.valorIndicador,
              fecha: new Date(indicador.fechaIndicador)
                .toISOString()
                .slice(0, 10),
            },
          ],
        });
      } else {
        found.valores.push({
          valor: indicador.valorIndicador,
          fecha: new Date(indicador.fechaIndicador).toISOString().slice(0, 10),
        });
      }
    });

    // Se genera dataset con los valores por fecha
    dataIndicators.forEach((dataIndicator) => {
      dataIndicator.dataset = [];
      labels.forEach((label) => {
        let found = dataIndicator.valores.find((data) => data.fecha == label);
        dataIndicator.dataset.push(found ? found.valor : 0);
      });
    });

    const dataToChart = dataIndicators.map((d) => {
      return {
        label: d.nombre,
        data: d.dataset,
        backgroundColor: randomColor(),
      };
    });

    setDataChart(dataToChart);
  };

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
            setRegisteredIndicators(data.records);
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
        setIndicators(data.indicators);
        setRegisteredIndicators(data.records);
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
    fetch("https://postulaciones.solutoria.cl/api/acceso", { requestOptions })
      .then((response) => response.json())
      .then((data) => {
        // setIndicators(dataIndicators);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // apiGetToken();
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
    //   })
    // .catch(error => console.error(error))
  }, []);

  return (
    <>
      <div className="container" style={{ padding: "5%" }}>
        <div className="row">
          <h1>Indicadores Económicos</h1>
        </div>
        <div className="row">
          <div className="col m-2">
            {registeredIndicators > 1 ? (
              ""
            ) : (
              <>
                <p>
                  Inicialmente se permite cargar los indicadores en la base de
                  datos.
                </p>

                <Button onClick={loadIndicators} variant="success">
                  Cargar indicadores
                </Button>
              </>
            )}
            <p>{registeredIndicators} indicadores registrados</p>
          </div>
        </div>
        <hr />

        <div className="row">
          <h1>Buscar por rango de fecha</h1>
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

        <div className="row">
          <div className="col-md-12">
            {dataChart && labelsChart ? (
              <ChartBar
                dataChart={dataChart}
                labelsChart={labelsChart}
              ></ChartBar>
            ) : null}
          </div>
        </div>
        <hr />
        <div className="row">
          <h1>Gestión de indicadores</h1>
        </div>
        <div className="row mt-4">
          <div className="col-md-4">
            <FormIndicators
              indicator={indicator}
              setIndicator={setIndicator}
              fetchIndicators={fetchIndicators}
            ></FormIndicators>
          </div>
          <div className="col-md-6">
            Lista de indicadores
            {indicators.length > 0 ? (
              <TableIndicators
                indicator={indicator}
                setIndicator={setIndicator}
                fetchIndicators={fetchIndicators}
                indicators={indicators}
              ></TableIndicators>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
