import {useState} from "react";


const useCounter=(inicialState=10)=>{
    const [state, setState] = useState(inicialState);

    const increment=()=>{
        setState(state+1);
    }
    const decrement=()=> {
    setState(state-1)
    }

    return {
        state,
        increment,
        decrement,
    };
}
export default useCounter;