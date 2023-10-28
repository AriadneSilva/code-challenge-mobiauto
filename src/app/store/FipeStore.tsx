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

interface FipeContextData {
  getMarcas: () => Promise<void>;
  getModelos: (idMarca: string) => Promise<void>;
  getAnos: (idMarca: string, idModelo: string) => Promise<void>;
  getValor: (idMarca: string, idModelo: string, idAno: string) => Promise<void>;
  dataMarcas: MarcasData[];
  dataModelos: ModeloData[];
  dataAnos: AnoData[];
  dataForm: any;
  setDataForm: Dispatch<SetStateAction<any>>;
  buscaValor: () => Promise<void>;
  dataValor: ValorData;
}

interface FipeProviderProps {
  children: ReactNode;
}

const FipeContext = createContext<FipeContextData>({} as FipeContextData);
export const FipeProvider = ({ children }: FipeProviderProps) => {
  const [dataMarcas, setDataMarcas] = useState<MarcasData[]>([]);
  const [dataModelos, setDataModelos] = useState<ModeloData[]>([]);
  const [dataAnos, setDataAnos] = useState<AnoData[]>([]);
  const [dataForm, setDataForm] = useState({
    idMarca: "",
    idModelo: "",
    idAno: "",
  });
  const [dataValor, setDataValor] = useState<ValorData>();

  async function getMarcas() {
    const responseMarcas = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas`
    );

    if (!responseMarcas.ok) {
      throw new Error("Failed to fetch data");
    }
    return responseMarcas.json();
  }
  async function getModelos(idMarca: string) {
    const responseModelos = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos`
    );

    if (!responseModelos.ok) {
      throw new Error("Failed to fetch data");
    }

    return responseModelos.json();
  }

  async function getAnos(idMarca: string, idModelo: string) {
    const responseAnos = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${idModelo}/anos`
    );

    if (!responseAnos.ok) {
      throw new Error("Failed to fetch data");
    }

    return responseAnos.json();
  }

  async function getValor(idMarca: string, idModelo: string, idAno: string) {
    const dataValor = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${idModelo}/anos/${idAno}`
    );

    if (!dataValor.ok) {
      throw new Error("Failed to fetch data");
    }

    return dataValor.json();
  }

  async function fillModelos(idMarca: string) {
    const data = await getModelos(idMarca);
    setDataModelos(data.modelos as ModeloData[]);
  }

  async function fillAnos(idMarca: string, idModelo: string) {
    const data = await getAnos(idMarca, idModelo);
    setDataAnos(data as AnoData[]);
  }

  async function buscaValor() {
    const data = await getValor(
      dataForm.idMarca,
      dataForm.idModelo,
      dataForm.idAno
    );

    setDataValor(data as ValorData);
  }

  // //USE EFFECT HOOKS
  useEffect(() => {
    const hydrate = async () => {
      try {
        setDataMarcas((await getMarcas()) as MarcasData[]);
      } catch (e) {
        console.log("Deu errro");
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

  return (
    <FipeContext.Provider
      value={{
        getMarcas,
        getModelos,
        getAnos,
        getValor,
        dataMarcas,
        dataModelos,
        dataAnos,
        dataForm,
        setDataForm,
        buscaValor,
        dataValor,
      }}
    >
      {children}
    </FipeContext.Provider>
  );
};

export const useFipeStore = (): FipeContextData => {
  return useContext(FipeContext);
};
