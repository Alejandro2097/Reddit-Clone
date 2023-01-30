import { atom } from "recoil";
 
export interface AuthModalState {
    open: boolean;
    view: "login" | "signup" | "resetPassword"; 
}