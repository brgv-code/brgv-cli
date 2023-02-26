import { ResizableBox, ResizableBoxProps } from "react-resizable"
import "../styles/resizable.css"
import { useEffect, useState } from "react";

interface ResizableProps  {
    direction: 'horizontal' | 'vertical';  
}
export default function Resizable ({direction, children}: React.PropsWithChildren<ResizableProps>) {
const [innerWidth, setInnerWidth] = useState(window.innerWidth);
const [innerHeight, setInnerHeight] = useState(window.innerHeight);
const [width, setWidth] = useState(window.innerWidth * 0.75);
    useEffect(() => {
        let timer: any; 
        //debouncing
        const listener = () => {
            if (timer) { 
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setInnerWidth(window.innerWidth);
                setInnerHeight(window.innerHeight);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
        }
        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener);
        }
    }, []);
     
let resizableProps: ResizableBoxProps;
if (direction === 'horizontal') {
    resizableProps = {
        className: 'resize-horizontal',
        minConstraints: [innerWidth*0.2,Infinity],
        maxConstraints: [innerWidth * 0.75, Infinity],
        height: Infinity,
        width,
        resizeHandles: ['e'],
        onResizeStop: (event, data) => {
            const width = data.size.width;
            setWidth(width);
        }
    }
} else {
    resizableProps = {
        minConstraints: [Infinity, 24],
        maxConstraints: [Infinity, innerHeight * 0.9],
        height: 500,
        width: Infinity,
        resizeHandles: ['s'],
    }
}

// FEATURE: resizable box
    return (
        <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>
    )

}