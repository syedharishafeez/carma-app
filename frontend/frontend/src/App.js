import React, {useState} from 'react'
import './App.css';
import {Button, TextField} from '@mui/material/';


function App() {
  const [value, setValue] = React.useState(new Date());
  const [accountNumber, setAccountNumber] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardHolderName, setCardHolderName] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  

  const handleSubmit = () => {
    console.log({
      accountNumber, cvv, cardHolderName, expirationDate
    })
    let url = "http://localhost:3000/card"
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({accountNumber, cvv, cardHolderName, expirationDate})
    })
  }

  return (
    <div className="App">
       <TextField id="outlined-basic" label="Account Number" variant="outlined" onChange = {(e) => setAccountNumber(e.target.value)}/>
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
      <Button variant="contained" onClick={handleSubmit}>Contained</Button>
    </div>
  );
}

export default App;
