import './App.css';
import axios from "axios";
import {format} from "date-fns"; 
import CurrencyInput from './CurrencyInput';
import { useState,useEffect } from 'react';
const API_KEY = "PT1jKKKA6fshZR4CiqFwQ78HKiZ5XHdn 'clearme'";
const CURRENCY_API ='https://api.apilayer.com/fixer/latest?base=USD&apikey='+ API_KEY;


function App() { 

  const [amountOne,setAmountOne] = useState(1);
  const [amountTwo,setAmountTwo] = useState(1);
  const [currencyOne,setCurrencyOne] = useState("USD");
  const [currencyTwo,setCurrencyTwo] = useState("INR");
  const [currencyRates , SetCurrencyRates] = useState([]);

  useEffect(()=>{
    axios.get(CURRENCY_API)
    .then((response)=>SetCurrencyRates(response.data.rates)
    )
    
    .catch((err)=>{
      console.log(err);
      SetCurrencyRates(null);
    })

  },[])

  useEffect(()=>{
      if(!!currencyRates){
        handleAmountOneChange(1);
      }
  },[currencyRates ]);

  const formatCurrency = (number)=>{
      return number.toFixed(2);
  }

  const handleAmountOneChange = (amountOne)=>{
    setAmountTwo(formatCurrency((amountOne  * currencyRates[currencyTwo]/ currencyRates[currencyOne]))); 
    setAmountOne(amountOne);
  }
 
  const handleAmountTwoChange = (amountTwo)=>{
    setAmountOne (formatCurrency((amountTwo* currencyRates[currencyOne]/ currencyRates[currencyTwo]))); 
    setAmountTwo(amountTwo );
  }

  const handleCurrencyOneChange = (currencyOne)=>{
    setAmountTwo(formatCurrency((amountOne * currencyRates[currencyTwo]/ currencyRates[currencyOne]))); 
    setCurrencyOne(currencyOne);
  }

  const handleCurrencyTwoChange = (currencyTwo)=>{
    setAmountOne(formatCurrency((amountTwo * currencyRates[currencyOne]/ currencyRates[currencyTwo]))); 
    setCurrencyTwo(currencyTwo );
  }

  if(!currencyRates) return <p>Something went wrong.....!</p>
  if(currencyRates.length ===0) return <p className='font-bold text-9xl '>Loading..... </p>
  
  return (
    <>    
    <div className='flex justify-center p-2 m-2'>
        
       <span className="App font-extrabold bg-gray-700 text-white rounded-lg p-3 m-1">
          React Currency Converter
      </span>
        
    </div>
      <div className='flex justify-center p-2 m-2'>
      <p>1 {currencyOne} equals to </p>

      <p>  {formatCurrency(amountTwo/amountOne)} {currencyTwo}  </p>

      <p>{format(new Date(), "dd/mm/yyyy h:mm ")}</p>
      </div>
  
    <div>
    <CurrencyInput 
    amount={amountOne} 
    currency ={currencyOne}
    currencies ={Object.keys(currencyRates)}
    onAmountChange= {handleAmountOneChange}
    onCurrencyChange = {handleCurrencyOneChange}/> 
    <CurrencyInput 
    amount={amountTwo} 
    currency={currencyTwo }
    currencies ={Object.keys(currencyRates)}
    onAmountChange= {handleAmountTwoChange}
    onCurrencyChange = {handleCurrencyTwoChange}/>
    </div> 
    </>


  );
}

export default App;
