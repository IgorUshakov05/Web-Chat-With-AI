export interface create_jwt {
  email: string;
  id: string;
}

export interface token {
  access: string;
  refresh: string;
}
