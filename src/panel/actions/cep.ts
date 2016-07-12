import { actions as sync } from "../constants";

export const cepRunning = (cepCommand: string, handler: string,
  message?: string): IAction<IActionCEPRunning> => {
  return {
    payload: { cepCommand, handler, message },
    type: sync.CEP_RUNNING,
  };
};

export const cepError = (err: CEPError): IAction<CEPError> => {
  return {
    payload: err,
    type: sync.CEP_ERROR,
  };
};
