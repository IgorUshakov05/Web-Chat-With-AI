export interface InputData {
  email: string;
  password: string;
}

export interface PostVerefy {
  email: string;
  code: number;
}
export enum InputType {
  LOGIN,
  PASSWORD,
}
export type ActionType = {
  payload: string;
  type: InputType;
};
