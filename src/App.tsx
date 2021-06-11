
import React,{useState} from 'react';
import TreeGrid from "./TreeGrid";
import Ejemplo from "./Ejemplo";

function App() {

  const myfunction=(nombre:string):string=>{
    return 'Hola '+nombre;
  }

  return (
    <div className="App">
      <h1>Esto es el App Main: {myfunction('Juliana')}</h1>
        <Ejemplo/>
      <TreeGrid/>
    </div>
  );
}
export default App;
