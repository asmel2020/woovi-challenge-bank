export interface IUserLoginRespond {
  userLogin: Respond
}


export interface IUserRegisterRespond {
    userRegister: Respond
  }

export interface Respond {
    token: string | null;
    success: string | null;
    error: string | null;
    clientMutationId:string | null;
}