import { useTypedSelector } from "../hooks/use-type-selector";
import CellListItem from "./cell-list-item";
import  AddCell  from "./add-cell";
import { Fragment } from "react";
import { useActions } from "../hooks/use-actions";
import { useEffect } from "react";



function CellList() {

    const cells = useTypedSelector(({ cells }) => cells?.order?.map((id: string) =>  cells.data?.[id]));
   
    const { fetchCells, saveCells } = useActions();
    useEffect(() => {
        fetchCells();
    }, []);
    
   
   
   useEffect(() => {
         saveCells();
    }, [JSON.stringify(cells)]);
    
   
    // this is just to make sure that the state is being used in the component  
// map over the cells array and return a CellListItem component for each cell
    const renderedCells = cells?.map((cell:any) => (
    <Fragment key={cell.id}>
            <CellListItem key={cell.id} cell={cell} />
        <AddCell  nextCellId={cell.id} />
    </Fragment>
    ));
   return (
    
        <div>
              <AddCell forceVisible={cells?.length === 0}  nextCellId={null} />
              {renderedCells}
              
</div>
    )
}

export default CellList;