import React, {useState} from 'react'
import './App.css';
import {Button, TextField} from '@mui/material/';
import { url } from './constants';

function App() {
  const [value, setValue] = React.useState(new Date());
  const [cardNumber, setCardNumber] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardHolderName, setCardHolderName] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  

  const handleSubmit = async () => {
    console.log({
      cardNumber, cvv, cardHolderName, expirationDate
    })
    try{
      let addCardRequest = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cardNumber, cvv, cardHolderName, expirationDate})
      })
      let addCardResponse = await addCardRequest.json()
      alert(addCardResponse.message)
    }catch(ex){
      console.log("ex === ", ex)
      alert("Please Contact Administrator")
    }
  }

  const handleDelete = async () => {
    console.log({
      cardNumber, cvv, cardHolderName, expirationDate
    })
    
    try{
      let addCardRequest = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({cardNumber, cvv, cardHolderName, expirationDate})
      })
      let addCardResponse = await addCardRequest.json()
      alert(addCardResponse.message)
    }catch(ex){
      console.log("ex === ", ex)
      alert("Please Contact Administrator")
    }
  }

  return (
    <div className="App">
       <TextField id="outlined-basic" label="Card Number" variant="outlined" onChange = {(e) => setCardNumber(e.target.value)}/>
      <TextField id="outlined-basic" label="CVV" variant="outlined" onChange = {(e) => setCvv(e.target.value)}/>
      <TextField id="outlined-basic" label="Card Holder Name" variant="outlined" onChange = {(e) => setCardHolderName(e.target.value)}/>
      <TextField
        id="date"
        label="Expiration date"
        type="date"
        // defaultValue={`${new Date()}`}
        onChange = {(e) => setExpirationDate(e.target.value)}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" onClick={handleSubmit}>Submit details</Button>
      <Button color="error" variant="contained" onClick={handleDelete}>Delete Card</Button>
    </div>
  );
}

export default App;
