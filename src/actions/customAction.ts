import { Action } from "redux";

export interface ICustomAction extends Action {
    payload: boolean;
}