export interface IRegister {
username: string,
 fullname: string,
 email: string,
 password: string 

}
export interface IUser {
   username: string,
   fullname: string,
   email: string,
   password: string 
  
}
export enum EStastus {
    SUCCESS = "SUCCESS",
    FAIL = "FAILED", 
}

export type AuthMiddlewareData = {
    id: string;
 };

 export interface IProfile {
   fullname? : string;
    username? : string;
    bio? : string;
    avatar? : string;
    cover? : string;
    userId? : number;

 }

 export interface Ithread {
    id? : number;
    content? : string;
    userId : number;
    threadId : number
   }