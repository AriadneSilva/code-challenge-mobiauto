import * as React from "react";
import {
  SelectChangeEvent,
  InputLabel,
  FormControl,
  FormGroup,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CardResult from "../components/CardResult";
import CardSearch from "../components/CardSearch";
import Select from "../components/Select";
import Button from "../components/Button";
import { useFipeStore } from "../store/FipeStore";

export default function Home() {
  const {
    dataMarcas,
    dataModelos,
    dataAnos,
    dataForm,
    setDataForm,
    retornaValor,
    dataValor,
  } = useFipeStore();

  const [selectedValue] = React.useState<string[]>([]);

  const handleSelectChange = (e: SelectChangeEvent<typeof selectedValue>) => {
    const formObj = {
      ...dataForm,
      [e.target.name]: e.target.value !== "" ? e.target.value : null,
    };

    setDataForm({ ...formObj });
  };

  return (
    <>
      <h1>Tabela Fipe</h1>
      <h2>Consulte o valor de um veículo de forma gratuita</h2>
      <CardSearch>
        <FormGroup>
          <FormControl>
            <InputLabel id="labelMarca">Marca</InputLabel>
            <Select
              labelId="labelMarca"
              id="marca"
              data-testid="selectMarca"
              value={dataForm.idMarca}
              label="Marca"
              name="idMarca"
              onChange={handleSelectChange}
            >
              {dataMarcas !== undefined &&
                dataMarcas.map((marcas) => (
                  <MenuItem key={marcas.codigo} value={marcas.codigo}>
                    {marcas.nome}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="labelModelo">Modelo</InputLabel>
            <Select
              labelId="labelModelo"
              id="modelo"
              value={dataForm.idModelo}
              label="Modelo"
              name="idModelo"
              data-testid="selectModelo"
              onChange={handleSelectChange}
            >
              {dataModelos !== undefined &&
                dataModelos.map((modelos) => (
                  <MenuItem key={modelos.codigo} value={modelos.codigo}>
                    {modelos.nome}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {dataForm.idModelo !== "" && (
            <FormControl>
              <InputLabel id="labelAno">Ano</InputLabel>
              <Select
                labelId="labelAno"
                id="ano"
                value={dataForm.idAno}
                label="Ano"
                name="idAno"
                data-testid="selectAno"
                onChange={handleSelectChange}
              >
                {dataAnos !== undefined &&
                  dataAnos.map((ano) => (
                    <MenuItem key={ano.codigo} value={ano.codigo}>
                      {ano.nome}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </FormGroup>

        <Button
          variant="contained"
          color="primary"
          data-testid="btnBusca"
          disabled={
            dataForm.idMarca == "" ||
            dataForm.idModelo == "" ||
            dataForm.idAno == ""
          }
          onClick={retornaValor}
        >
          Consultar preço
        </Button>
      </CardSearch>

      {dataValor !== undefined && (
        <CardResult>
          <h2>
            Tabela Fipe: Preço {dataValor.Marca} {dataValor.Modelo}{" "}
            {dataValor.AnoModelo}
          </h2>
          <div>
            <h2>{dataValor.Valor}</h2>
          </div>
          <Typography variant="caption" display="block" gutterBottom>
            Este é o preço de compra do veículo
          </Typography>
        </CardResult>
      )}
    </>
  );
}
