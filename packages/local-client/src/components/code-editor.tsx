import  Editor, {OnMount} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel'; // parser for babel code  for latest js syntax
import { useRef } from 'react';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

//getValue to get the value of the editor and monacoEditor to get the editor instance 
const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {
    const editorRef = useRef<any>();
    const  handleEditorChange: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => {
            onChange(editor.getValue());
        }
        )
        editor.getModel()?.updateOptions({tabSize: 2});
        // FEATURE: Syntax highlighting
        // const highlighter = new MonacoJSXHighlighter(
        //     //@ts-ignore
        //     window.monaco, // monaco is a global variable that we have access to in the browser // babel is a global variable that we have access to in the browser
        //     editor 
        // );
        // highlighter.highLightOnDidChangeModelContent(
        //     () => {}, // callback function to avoid console logs of multipe errors
        //     () => {}, 
        //     undefined, // we don't want to dispose of the highlighter 
        //     () => {}
        // );
    }
    // FEATURE: Format code
    const onFormatClick = () => {
        // get current value from editor
        const unformatted = editorRef.current.getModel().getValue();
        // format that value
        const formatted = prettier.format(unformatted, {
            parser: 'babel', // parser for babel code  for latest js syntax
            plugins: [parser], // parser for babel code  for latest js syntax
            useTabs: false, // use spaces instead of tabs
            semi: true, // semicolon at the end of the line
            singleQuote: true, // single quote instead of double quote
        }).replace(/\n$/, ''); // remove the last new line
        // set the formatted value back in the editor
        editorRef.current.setValue(formatted);
    }
    return (
        <div className=' relative group  h-full w-[calc(100%-10px)]'> 
        <button className='btn btn-accent absolute top-1 right-1 z-20 opacity-0 transition-opacity group-hover:opacity-100' onClick={onFormatClick}>Format</button>
        <Editor
            height= '100%'
            language="javascript"
            theme='hc-black'
            value={initialValue}
            options = {{ 
                wordWrap: 'on', // word wrap is the ability to wrap the text to the next line
                minimap: {enabled: false}, // minimap is the ability to show a small preview of the code on the right side of the editor
                showUnused: false, // show unused is the ability to show unused variables
                folding: false, // folding is the ability to collapse code blocks
                lineNumbersMinChars: 3, // remove left margin
                fontSize: 16,
                scrollBeyondLastLine: false, // remove scroll bar at the bottom of the editor   
                automaticLayout: true, // automatically adjust the height of the editor to fit the content  
            }}
            onMount={handleEditorChange}
            />
            </div>
    );
};
    export default CodeEditor;
