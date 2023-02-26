import { useEffect, useRef } from "react";
import '../styles/preview.css';
interface PreviewProps {
    code: string;
    err?: string;
}
const html = `
  <html>
    <head>
    </head>
    <body>

      <div id="root"></div>
      <script>  
      const handleError = (err) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
        console.error(err);
        };
        // async error
        window.addEventListener('error', (event) => {
            event.preventDefault(); // prevent the default error message from showing up, so it doesn't show up twice in console
            handleError(event.error); // event.error is the error object  
        });


window.addEventListener('message',(event)  => {
    // sync error
try { 
  eval(event.data); 
} catch (err) {
    handleError(err);
  
}
}, false)      </script>
    </body>

  </html>
`;
const Preview: React.FC<PreviewProps> = ({ code, err }) => {
    const iframe = useRef<any>();
    useEffect(() => {
        iframe.current.srcdoc = html; // srcdoc is a property that we can use to set the html of an iframe
        // we need to wait for the iframe to load before we can send the code to it 
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*') // '*' means send to any domain 
        }, 50);
    }, [code]);
    return (
    <div className="preview-wrapper"><iframe className="h-full bg-slate-500 w-full" title="preview" srcDoc={html} ref={iframe}  sandbox="allow-scripts" />
    {/* bundling error */}
    {err && <div className="absolute top-2 left-2 text-red-400 ">{err}</div>}</div>);
};
export default Preview; 