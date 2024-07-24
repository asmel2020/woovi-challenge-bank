import { IRequest } from "./IRequest.interfaces";



export interface IContext {
    isAuthApiKey: boolean;
    req:IRequest
  }