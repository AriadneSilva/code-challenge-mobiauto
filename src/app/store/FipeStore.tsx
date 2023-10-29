import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";

import { AnoData, MarcasData, ModeloData, ValorData } from "../types/fipe";

import { Backdrop, CircularProgress } from "@mui/material";

interface FipeContextData {
  dataMarcas: MarcasData[];
  dataModelos: ModeloData[];
  dataAnos: AnoData[];
  dataForm: any;
  dataValor: ValorData | undefined;
  setDataForm: Dispatch<SetStateAction<any>>;
  retornaValor: () => Promise<void>;
}

interface FipeProviderProps {
  children: ReactNode;
}

const FipeContext = createContext<FipeContextData>({} as FipeContextData);
export const FipeProvider = ({ children }: FipeProviderProps) => {
  const [isLoading, setLoading] = useState(true);
  const [dataMarcas, setDataMarcas] = useState<MarcasData[]>([]);
  const [dataModelos, setDataModelos] = useState<ModeloData[]>([]);
  const [dataAnos, setDataAnos] = useState<AnoData[]>([]);
  const [dataForm, setDataForm] = useState({
    idMarca: "",
    idModelo: "",
    idAno: "",
  });
  const [dataValor, setDataValor] = useState<ValorData>();

  async function buscaMarcas() {
    const responseMarcas = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas`
    );

    if (!responseMarcas.ok) {
      throw new Error("Falha ao buscar as marcas");
    }
    return responseMarcas.json();
  }
  async function buscaModelos(idMarca: string) {
    const responseModelos = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos`
    );

    if (!responseModelos.ok) {
      throw new Error("Falha ao buscar os modelos");
    }

    return responseModelos.json();
  }

  async function buscaAnos(idMarca: string, idModelo: string) {
    const responseAnos = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${idModelo}/anos`
    );

    if (!responseAnos.ok) {
      throw new Error("Falha ao buscar os anos");
    }

    return responseAnos.json();
  }

  async function buscaValor(idMarca: string, idModelo: string, idAno: string) {
    const responseValor = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${idModelo}/anos/${idAno}`
    );

    if (!responseValor.ok) {
      throw new Error("Falha ao buscar o valor");
    }

    return responseValor.json();
  }

  async function fillMarcas() {
    setLoading(true);
    const data = await buscaMarcas();
    setDataMarcas(data as MarcasData[]);
    setLoading(false);
  }

  async function fillModelos(idMarca: string) {
    const data = await buscaModelos(idMarca);
    setDataModelos(data.modelos as ModeloData[]);
  }

  async function fillAnos(idMarca: string, idModelo: string) {
    const data = await buscaAnos(idMarca, idModelo);
    setDataAnos(data as AnoData[]);
  }

  async function retornaValor() {
    setLoading(true);
    const data = await buscaValor(
      dataForm.idMarca,
      dataForm.idModelo,
      dataForm.idAno
    );

    setDataValor(data as ValorData);
    setLoading(false);
  }

  // //USE EFFECT HOOKS
  useEffect(() => {
    const hydrate = async () => {
      try {
        fillMarcas();
      } catch (e) {
        console.log("Erro ao carregar as marcas");
      }
    };
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataForm.idMarca !== "") {
      fillModelos(dataForm.idMarca);
    }
    if (dataForm.idMarca !== "" && dataForm.idModelo !== "") {
      fillAnos(dataForm.idMarca, dataForm.idModelo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataForm]);

  return isLoading ? (
    <>
      <Backdrop sx={{ color: "#fff" }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  ) : (
    <FipeContext.Provider
      value={{
        dataMarcas,
        dataModelos,
        dataAnos,
        dataForm,
        dataValor,
        setDataForm,
        retornaValor,
      }}
    >
      {children}
    </FipeContext.Provider>
  );
};

export const useFipeStore = (): FipeContextData => {
  return useContext(FipeContext);
};
