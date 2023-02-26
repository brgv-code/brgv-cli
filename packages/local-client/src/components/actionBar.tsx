
import { useActions } from "../hooks/use-actions";

interface ActionBarProps {
    id: string;
}
function ActionBar({ id }: ActionBarProps) {

    const { moveCell, deleteCell } = useActions();
    return (
      
        <div className="absolute top-0 right-0 opacity-25 hover:opacity-100 transition-opacity">
            <button className="btn btn-circle btn-accent btn-sm" onClick={() => moveCell(id, 'up')}>            
            <span className="icon"><i className="fas fa-arrow-up"></i></span></button>

            <button className="btn btn-circle btn-accent btn-sm" onClick={() => moveCell(id, 'down')}>            
            <span className="icon"><i className="fas fa-arrow-down"></i></span></button>
            <button className="btn btn-circle btn-accent btn-sm" onClick={() => deleteCell(id)}>  
            <span className="icon"><i className="fas fa-times"></i></span></button>
        </div>
    )
}

export default ActionBar