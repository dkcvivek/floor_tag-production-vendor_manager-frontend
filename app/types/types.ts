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

export type Style = {
  vendor_order_id: string;
  order_quantity: number;
  earliest_ship_date: string;
  style_name: string;
};

export type LoginResponseData = {
  name: string,
  company: string,
  role: string,
  token: string,
};


export type TrackingStep = {
  tracking_step_id: string;
  type: string;
  position: number;
  assigned_operators: {
    checker_id: string;
    checker_name: string;
  }[];
  tracking_step_data: {
    step?: string;
    location?: string;
    what_to_check?: string;
    how_to_check?: string;
    value?: string;
  };
};
