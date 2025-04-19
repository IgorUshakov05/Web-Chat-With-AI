export interface InputData {
  mail: string;
  password: string;
}
export enum InputType {
  LOGIN,
  PASSWORD,
}
export type ActionType = {
  payload: string;
  type: InputType;
};
