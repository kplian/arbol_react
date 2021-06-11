import React, {useState} from 'react';
import useCounter from "../useCounter";
import Small from "./Small";

const Memorize =()=>{
    const {state,increment}=useCounter(0);
    const [show, setShow] = useState(true);
    return (
            <div>
                <h1>Memorize</h1><hr/>
                {show && <h2><Small value={state}/></h2>}
                <button onClick={increment}>Incrementar</button>
                <button
                    className="btn btn-primary"
                    onClick={()=>{
                        setShow(!show);
                    }}>
                    Show/Hide {JSON.stringify(show)}</button>
            </div>
        );
}

export default Memorize;