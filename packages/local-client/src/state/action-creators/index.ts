import { RootState } from './../reducers/index';
import { ActionType } from "../action-types";
import {
  Action,
  BundleCompleteAction,
  BundleStartAction,
  DeleteCellAction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
  Direction,
} from "../actions";
import { Cell, CellType } from "../cell";
import { Dispatch } from "redux";
import bundle from "../../bundler";
import  axios  from "axios";
export const moveCell = (
  id: string,
  direction: Direction
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const insertCellAfter = (
  id: string | null,
  type: CellType
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};


export const bundleStart = (cellId: string): BundleStartAction => {
  return {
    type: ActionType.BUNDLE_START,
    payload: {
      cellId,
    },
  };
};

export const bundleComplete = (
  cellId: string,
  bundle: {
    code: string;
    err: string;
  }
): BundleCompleteAction => {
  return {
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
      cellId,
      bundle,
    },
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");

      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
}

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState :() => RootState ) => {
    
    // const cells = useTypedSelector(({ cells }) => cells?.order?.map((id: string) =>  cells.data?.[id]));
const { data, order } = getState().cells as { data: { [key: string]: Cell }, order: string[] };;
// const data = getState().cells?.data;
// const order = getState().cells?.order;
// const { data, order } = getState().cells as { data:  CellState.data; order: string[] };

// const cells = order?.map((id: string) => data?.[id]);
const cells = order.map((id: string | number) => data[id]);
    try {
      await axios.post("/cells", { cells });
    } catch (err: any) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: err.message,

      });
    }
  };
};