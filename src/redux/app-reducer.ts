import { Dispatch } from "redux";
import { authAPI } from "../api/api";
import { getAuthUserDataThunkCreator } from "./auth-reducer";
import { AppActionsType, AppThunkType } from "./store";

let INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type AppInitializedState = {
  initialized: boolean;
};

let initialState: AppInitializedState = {
  initialized: false,
};

export const appReducer = (
  state = initialState,
  action: AppReducerActionsType
): AppInitializedState => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return { ...state, initialized: true };
    }
    default:
      return state;
  }
};

export type AppReducerActionsType = initializedSuccessType;

type initializedSuccessType = ReturnType<typeof initializedSuccess>;

export const initializedSuccess = () => {
  return {
    type: INITIALIZED_SUCCESS,
  };
};

export const initializeApp = () => {
  return (dispatch: Dispatch<any>) => {
    let promise = dispatch(getAuthUserDataThunkCreator());
    Promise.all([promise]).then(() => {
      dispatch(initializedSuccess());
    });
  };
};