// import { Email } from './email';

export interface RoleType {
  nom: string;
}

export interface User {
  id: number;
  email: string; // Notez l'utilisation de Email[]
  username: string;
  motDePasse: string;
  roleType: RoleType;
}
