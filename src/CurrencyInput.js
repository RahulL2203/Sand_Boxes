import React from 'react'

const CurrencyInput = ({amount, currencies, currency , onAmountChange ,onCurrencyChange }) => {
  return (
    <div className="flex justify-center mt-3">
        <input
        className='border border-black shadow-lg rounded -lg' 
        type="text"
        value ={amount}
        onChange={(e=> onAmountChange(e.target.value ))}/>
        <select 
        value={currency} 
        onChange={(e=>onCurrencyChange(e.target.value))}
        className='border border-black shadow-lg px-2 rounded-md'>
            {currencies.map((currency,i)=>
            (<option key ={i} value={currency}>{currency}</option>))}
        </select>
    </div>
  )
}

export default CurrencyInput;