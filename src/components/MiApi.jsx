import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Filtro from "./Filtro";
import Error from "./Error";
import "../css/MiApi.css";
//importamos los hooks useState y useEffect de react
//importamos componentes de react-bootstrap
//importamos los componentes creados

const Miapi = () => {
  //traemos la api a baseUrl
  const baseUrl = "https://rickandmortyapi.com/api/character/";

  //se crean los useState para la api y filtro
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState("");
  //consumo la api con el hook useEffect y a la vez creo el filtro para los nombres
  //useEffect en fase de montaje y actualizacion
  useEffect(() => {
    const fetchDatos = async () => {
      let urlFiltro = baseUrl;

      if (filtro !== "") {
        urlFiltro = baseUrl + "?name=" + filtro;
      }

      const resp = await fetch(urlFiltro);
      const respDatos = await resp.json();

      setDatos(respDatos.results ? respDatos.results : []);
    };

    fetchDatos();
  }, [filtro]);

  return (
    <>
      <Filtro setFiltro={setFiltro} />
      <div>
        {datos.length > 0 ? (
          <div className="container-galeria">
            {datos
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((dato) => (
                <div className="container-card">
                  <Card
                    className="carta"
                    key={dato.id}
                    style={{ width: "90%" }}
                  >
                    <Card.Img
                      className="img-personaje"
                      variant="top"
                      src={dato.image}
                    />
                    <Card.Body className="carta-cuerpo">
                      <Card.Title className="carta-nombre">
                        {dato.name}
                      </Card.Title>
                      <Card.Text className="carta-info">
                        ESTADO : {dato.status}
                      </Card.Text>
                      <Card.Text className="carta-info">
                        ESPECIE : {dato.species}
                      </Card.Text>
                      <Card.Text className="carta-info">
                        GENERO : {dato.gender}
                      </Card.Text>
                      <Card.Text className="carta-info">
                        ORIGEN : {dato.origin.name}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        ) : (
          <Error />
        )}
      </div>
    </>
  );
};

export default Miapi;
