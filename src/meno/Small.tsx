import React,{memo} from 'react';

const Small= memo(({value}:any)=>{
    console.log('Me volvi a llamar :(');
        return (
            <small>
                {value}
            </small>
        );
});

export default Small