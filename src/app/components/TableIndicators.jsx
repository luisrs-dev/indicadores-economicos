import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


function TableIndicators({fetchIndicators, indicator, setIndicator, indicators}) {


    const deleteIndicator = (id) =>{
        if(confirm('Esta seguro')){
    
            fetch(`/api/indicators/${id}`, {
                method : 'DELETE',
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

    }

    const editIndicator = (id) => {
        fetch(`/api/indicators/${id}`)
        .then(data => data.json())
        .then(data => {
            setIndicator({...data, fechaIndicador: new Date(data.fechaIndicador).toISOString().slice(0, 10) })
        })
        .catch(err => console.error(err))
    }


  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Código</th>
          <th>Fecha</th>
          <th>Nombre</th>
          <th>Origen</th>
          <th>Unidad</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {indicators
          .sort((a, b) => b.id - a.id)
          .map((indicator) => (
            <tr>
              <td>{indicator.id}</td>
              <td>{indicator.codigoIndicador}</td>
              <td>{new Date(indicator.fechaIndicador).toISOString().slice(0, 10)}</td>
              <td>{indicator.nombreIndicador}</td>
              <td>{indicator.origenIndicador}</td>
              <td>{indicator.unidadMedidaIndicador}</td>
              <td>{indicator.valorIndicador}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => editIndicator(indicator._id)}>Editar</Button>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => deleteIndicator(indicator._id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default TableIndicators