import MDEditor  from "@uiw/react-md-editor"
import { useState, useEffect, useRef } from "react";
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import '../styles/text-editor.css';
interface TextEditorProps {
    cell: Cell;
}

function TextEditor( {cell}: TextEditorProps) {
    const [editMode, setEditMode] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const { updateCell } = useActions();
    useEffect (() => {
        const listener = (event: MouseEvent) => {
            // event.target is the element that was clicked on  and 
            //event.target.closest('.container') is the container element that was clicked on 
            if(ref.current && event.target && ref.current.contains(event.target as Node)) {
                console.log('clicked inside');
                return;
            }
            console.log('clicked outside');
            setEditMode(false);
        }
        // capture: true means that the event listener will be called before the event is bubbled up to the parent element 
        document.addEventListener('click', listener, {capture: true});
        return () => {
            document.removeEventListener('click', listener, {capture: true});
        }
    }, []);


    if(editMode) {
        return (
            <div className="text-editor" ref = {ref}>
                <MDEditor
                value={cell?.content}
                onChange={(value) => updateCell(cell.id,value || '')}
                />
            </div>
        );
    }
// react markdown editor onclick shows the editor and onblur shows the markdown

    return (
        <div className="text-editor card " onClick={() => setEditMode(true)}>
            <div className="card-body">
            <MDEditor.Markdown className="p-10 bg-[#0d1b2a] border text-white" source={cell?.content || 'Click to Edit'} style={{ whiteSpace: 'pre-wrap' }} /></div>
        </div>
    );
}

export default TextEditor