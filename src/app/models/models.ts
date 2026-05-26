export interface User {
    id: string;
    email: string;
    role?:string;
}

export interface Usuario {
  id: number;
  username: string;
}

export interface Mensaje {
  id: number;
  user_id: number;
  contenido: string;
  created_at: string;
  usuarios?: Usuario; 
}

export interface PartidaAhorcado {
  id: number;
  username: string;
  cant_letras: number;
  tiempo: string
  created_at: string;
}

export interface PartidaMayorMenor {
  id: number;
  username: string;
  aciertos: number;
  created_at: string;
}

export interface PartidaPreguntados {
  id: number;
  username: string;
  aciertos: number;
  puntaje: number;
  created_at: string;
}

export interface PartidaDobles {
  id: number;
  username: string;
  tiradas: number;
  created_at: string;
}