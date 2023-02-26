import { saveCells } from './../action-creators/index';
import { ActionType } from "./../action-types/index";
import { Dispatch } from "redux";
import { Action } from "../actions";
import { RootState } from '../reducers';

// BUG FIX 2: data persistence is not working

export const persistMiddleware = ({
  dispatch,
  getState
}: {
  dispatch: Dispatch<Action>;
    getState: () => RootState;

}) => {
    let timer: any;

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        if(timer){
            clearTimeout(timer);
        }
            // BUG FIX: 1. POST call is twice when adding new cell
        timer =setTimeout(() => {
            saveCells()(dispatch, getState);
        }, 250);
    }
    };
  };
};
