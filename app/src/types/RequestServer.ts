export interface ResponseAuth {
  success: boolean;
  error?: string;
  errorList?: {
    location: string;
    msg: string;
    path: string;
    type: string;
  };
  id_chat?: string;
  access?: string;
  refresh: string;
}

export interface RespondVerefyPost {
  stats: boolean;
  message: string;
}

export interface RaspondAuthentication {
  success: boolean;
  message: string;
}
