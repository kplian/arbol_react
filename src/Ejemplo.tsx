import React, {useState} from 'react';

const Ejemplo =()=> {
    const [contador, setContador] = useState(0);
     const handleContador=()=>{
         console.log('Funcion contador');
         setContador(contador+2);
     };
    return (
        <>
            <div>
                <h1 onClick={handleContador} >I am Example component</h1>
                <h2>Esto el el contador: {contador}</h2>
            </div>
        </>
    );
};

export default Ejemplo;