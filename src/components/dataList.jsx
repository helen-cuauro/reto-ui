import { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const API_URL = "https://reto-api.onrender.com";

function DataList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((json) => {
        console.log("Datos obtenidos:", json);
        setData(json.data);
        setFilteredData(json.data);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  const options = [...new Set(data.map((item) => item.valor))];

  const handleFilterChange = (event, newValue) => {
    setSelectedValue(newValue);
    if (newValue) {
      setFilteredData(data.filter((item) => item.valor === newValue));
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Valores</h2>

      <Autocomplete
        options={options}
        value={selectedValue}
        onChange={handleFilterChange}
        renderInput={(params) => (
          <TextField {...params} label="Filtrar por valor" variant="outlined" />
        )}
        sx={{ width: 300, marginBottom: 2 }}
        isOptionEqualToValue={(option, value) => option === value}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Valor</b>
              </TableCell>
              <TableCell>
                <b>Derechos</b>
              </TableCell>
              <TableCell>
                <b>Concepto</b>
              </TableCell>
              <TableCell>
                <b>Fecha Acuerdo</b>
              </TableCell>
              <TableCell>
                <b>Fecha Corte</b>
              </TableCell>
              <TableCell>
                <b>Fecha Registro</b>
              </TableCell>
              <TableCell>
                <b>Fecha Entrega</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.valor}</TableCell>
                <TableCell>{item.derechos}</TableCell>
                <TableCell>{item.concepto_ejercicio}</TableCell>
                <TableCell>{item.fecha_acuerdo}</TableCell>
                <TableCell>{item.fecha_corte}</TableCell>
                <TableCell>{item.fecha_registro}</TableCell>
                <TableCell>{item.fecha_entrega}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DataList;
