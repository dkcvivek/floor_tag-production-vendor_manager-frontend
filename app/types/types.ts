export type FormEvent = React.FormEvent<HTMLFormElement>;
export type ChangeHandlerEvent = React.ChangeEventHandler<HTMLFormElement>;

export type LoginFormData = {
  username: string;
  password: string;
};

export type CreateCheckerFormError = {
  mobile?: string;
  name?: string;
};

export type StageStatus = "PASSED" | "FAILED";

export interface Stage {
  id: number;          
  name: string;        
  status: StageStatus; 
}

export interface StatesData {
  styleName: string;
  qrCode: string;
  size: string;
  stages: Stage[];
}