import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";

interface FipeContextData {
  getMarcas: () => Promise<void>;
  getModelos: (idMarca: string) => Promise<void>;
  getAnos: (idMarca: string, idModelo: string) => Promise<void>;
  getValor: (idMarca: string, idModelo: string, idAno: string) => Promise<void>;
}

interface FipeProviderProps {
  children: ReactNode;
}

const FipeContext = createContext<FipeContextData>({} as FipeContextData);
export const FipeProvider = ({ children }: FipeProviderProps) => {
  async function getCarros() {
    const dataCarros = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas`
    );

    if (!dataCarros.ok) {
      throw new Error("Failed to fetch data");
    }

    return dataCarros.json();
  }
  async function getMarcas() {
    const dataMarcas = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas`
    );

    if (!dataMarcas.ok) {
      throw new Error("Failed to fetch data");
    }

    return dataMarcas.json();
  }
  async function getModelos(idMarca: string) {
    const dataModelos = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos`
    );

    if (!dataModelos.ok) {
      throw new Error("Failed to fetch data");
    }

    return dataModelos.json();
  }

  async function getAnos(idMarca: string, idModelo: string) {
    const dataAnos = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${idModelo}/anos`
    );

    if (!dataAnos.ok) {
      throw new Error("Failed to fetch data");
    }

    return dataAnos.json();
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

  // //USE EFFECT HOOKS
  useEffect(() => {
    const hydrate = async () => {
      try {
        const data = await getMarcas();
        console.log("Meu data:", data);
      } catch (e) {
        console.log("Deu errro");
      }
    };
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FipeContext.Provider
      value={{
        getMarcas,
        getModelos,
        getAnos,
        getValor,
      }}
    >
      {children}
    </FipeContext.Provider>
  );
};

export const useFipeStore = (): FipeContextData => {
  return useContext(FipeContext);
};
