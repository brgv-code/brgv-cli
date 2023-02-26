import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { useMemo } from "react";


export const useActions = () => {
    const dispatch = useDispatch();
    
    // return bindActionCreators(actionCreators, dispatch); 
    // this is the same as the code below but the code below is memoized so that it doesn't get recreated every time the component re-renders
    // this is a performance optimization that will prevent the component from re-rendering when it doesn't need to re-render 


    return useMemo(() => {
        return bindActionCreators(actionCreators, dispatch);

    }, [dispatch]);
    };
    
