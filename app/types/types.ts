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
