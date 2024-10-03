import React from 'react'

function Card(props) {
    const { id, name, price, description } = props.product; 
    const { delFunc } = props;
    
    return (
        <div className='w-1/4 p-3 border rounded-md bg-slate-600 text-white'>
            <h2>name  :  {name}</h2>
            <h2>price  :  ${price}</h2>
            <p>desc  :  {description}</p>
            <button 
                onClick={() => { delFunc(id) }} 
                className='bg-red-600 py-2 px-3 text-white cursor-pointer rounded-md'
            >
                Delete
            </button>
        </div>
    );
}

export default Card;
