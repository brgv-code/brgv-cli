import { useEffect } from "react"
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-type-selector";
import '../styles/code-cell.css'

interface CodeCellProps {
     cell: Cell;
}


function CodeCell({cell}: CodeCellProps) {
  // const ref = useRef<any>(); // ref gives us reference to any js element not only components
// const [code, setCode] = useState('');
// const [err, setErr] = useState('');

const { updateCell, createBundle } = useActions();
const bundle = useTypedSelector((state) => state.bundles ? state.bundles[cell.id] : null);
// const startService = async () => {
//   ref.current = 
// }

// useEffect(() => {
//   startService();
// }, []); // empty array means run only once
// FEATURE: debouncing for bundling code after 0.75s of user input 
useEffect(() => {


    if(!bundle) {
        createBundle(cell.id, cell.content);
        return;
    }


    const timer = setTimeout(async () => {
        // const output = await bundle(cell.content)
        // setCode(output.code);
        // setCode(output.err);
      createBundle(cell.id, cell.content);
    }, 750);
    return () => {
        clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [cell.content, cell.id, createBundle]);

// const onClick = async () => {
//   const output = await bundle(text)
  // if(!ref.current) {
  //   return; // if ref.current is undefined return
  // }
// const resultCode = await ref.current.transform(text, {
//   loader: 'jsx', // jsx is a loader for react code and tsx is for typescript react code
//   target: 'es2015' // es2015 is a version of javascript that we want to compile our code to 
//   })
//   setCode(resultCode.code);


// const resultCode = 
// })
//     if(!output) {
//         return;
//     }


//   setCode(output);
// }

  return (
    <Resizable direction="vertical">
    <div className="h-[calc(100%-10px)]  flex flex-row">
        <Resizable direction="horizontal">
      <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)}/>
      </Resizable>
      {/* <textarea
      value={text}
      onChange={ obj => {setText(obj.target.value)}} ></textarea> */}
      {/* <div>
        <button className="btn btn-primary m-4" onClick={onClick}>Submit</button>
      </div> */}
      {/* <pre>{code}</pre> */}
      <div className="progress-wrapper">
      {
        !bundle || bundle.loading ? 
       <div className=" progress-bar ">       
        <progress className="progress progress-secondary w-full"  max="100">Loading</progress></div>
        :
        <Preview  code={bundle.code} err={bundle.err}/>
      }
      </div> 
{/* {bundle && <Preview  code={bundle.code} err={bundle.err}/>    } */}
</div> 
     </Resizable>

  );
}

export default CodeCell;
