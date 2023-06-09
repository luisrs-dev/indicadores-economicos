import React, {useState} from 'react'
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

function FormIndicators({fetchIndicators, indicator, setIndicator}) {


  const handleChange = (e) => {
    const {name, value} = e.target;   
    setIndicator({...indicator, [name]: value})
}

  const addIndicator = (e) => {
    e.preventDefault();

    // Actualizar
    if(indicator._id){
        fetch(`/api/indicators/${indicator._id}`, {
            method : 'PUT',
            body : JSON.stringify(indicator),
            headers : {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        })
        .then(data => data.json())
        .then(data => {
            setIndicator({
                codigoIndicador: "",
                fechaIndicador: "",
                nombreIndicador: "",
                origenIndicador: "",
                unidadMedidaIndicador: "",
                valorIndicador: "",
              });
            fetchIndicators()
        })
        .catch(err => console.error(err))
    }
    // Tarea nueva
    else{
    fetch("/api/indicators/add", {
      method: "POST",
      body: JSON.stringify(indicator),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setIndicator({
          codigoIndicador: "",
          fechaIndicador: "",
          nombreIndicador: "",
          origenIndicador: "",
          unidadMedidaIndicador: "",
          valorIndicador: "",
        });
        fetchIndicators();
      })
      .catch((err) => console.error(err));
    }
  };

  return (
    <Form onSubmit={addIndicator}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Código</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: DOLAR"
          value={indicator.codigoIndicador}
          name="codigoIndicador"
          onChange={handleChange}
        />

        <Form.Label>Fecha</Form.Label>
        <Form.Control
          type="date"
          placeholder="dd/mm/YYYY"
          value={indicator.fechaIndicador}
          name="fechaIndicador"
          onChange={handleChange}
        />

        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Dólar"
          value={indicator.nombreIndicador}
          name="nombreIndicador"
          onChange={handleChange}
        />

        <Form.Label>Origen</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: mindicador.cl"
          value={indicator.origenIndicador}
          name="origenIndicador"
          onChange={handleChange}
        />

        <Form.Label>Unidad de medida</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Dólar"
          value={indicator.unidadMedidaIndicador}
          name="unidadMedidaIndicador"
          onChange={handleChange}
        />

        <Form.Label>Valor</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: 731.28"
          value={indicator.valorIndicador}
          name="valorIndicador"
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit" variant="success">
        Registrar
      </Button>
    </Form>
  );
}

export default FormIndicators;
