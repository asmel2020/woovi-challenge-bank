export interface IRequest {
    body: Body
    headers: Headers
    method: string
    query: Query
  }
  
  export interface Body {
    query: string
    operationName: string
    variables: Variables
  }
  
  export interface Variables {}
  
  export interface Headers {
    accept: string
    authenticator?: string
    "content-type": string
    "user-agent": string
    authorization?: string
    host: string
    "content-length": string
    connection: string
  }
  
  export interface Query {}
  