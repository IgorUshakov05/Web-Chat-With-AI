export interface Create_User {
  name: string;
  surname: string;
  email: string;
  code: number;
  password: string;
  day: number;
  month: number;
  year: number;
}

export interface Login_User {
  email: string;
  password: string;
}

export interface result_Create_User {
  success: boolean;
  error?: string;
  name?: string,
  surname?: string;
  email?: string;
  id_chat?: string;
  id?: string;
}
