import * as React from "react";
import {
  Button,
  Container,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  FormGroup,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function Home() {
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const [marca, setMarca] = React.useState<string[]>([]);
  const [modelo, setModelo] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof marca>) => {
    const {
      target: { value },
    } = event;
    setMarca(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Container>
      <h1>Tabela Fipe</h1>
      <h2>Consulte o valor de um veículo de forma gratuita</h2>
      <FormGroup>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Marca</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={marca}
            label="Marca"
            onChange={handleChange}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
            {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label2">Modelo</InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select2"
            value={modelo}
            label="Modelo"
            onChange={handleChange}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
            {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </FormGroup>

      <Button variant="contained" disabled={true}>
        Consultar preço
      </Button>
    </Container>
    // <div>
    //   <h1>Hello, Home page!</h1>
    //   <Button variant="contained" color="secondary">
    //     Testando o botão
    //   </Button>
    // </div>
  );
}
