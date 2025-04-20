export default interface User {
  name: string;
  surname: string;
  email: string;
  code: number;
  password: string;
  isVerefy:boolean;
  day: number;
  month: number;
  year:number;
  retry_password: string;

}
