export type MarcasData = {
  codigo: string;
  nome: string;
};

export type ModeloData = {
  codigo: string;
  nome: string;
};

export type AnoData = {
  codigo: string;
  nome: string;
};

export type ValorData = {
  Marca: string;
  Modelo: string;
  AnoModelo: string;
  Valor: string;
};

export interface ConsultaFormValues {
  marca: string[] | undefined;
  modelo: string;
  idAno: string;
}
