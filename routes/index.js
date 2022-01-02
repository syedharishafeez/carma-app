const express = require('express');
const { encrypt } = require('../utils/encryption_decryption');
const router = express.Router();

// create a post route to add a card
router.post("/", async (req, res) => {
    console.log("here it is", req.body)
    const {dbCon} = req
    const { cardNumber, cvv, cardHolderName, expirationDate} = req.body
    try{
        let encrypedCardNumber = ""
        if(cardNumber){
            if(cardNumber.length === 16){
                encrypedCardNumber = encrypt(cardNumber)
            }else{
                throw "Invalid Card Number"
            }
        }
        else{
            throw "Card Number is required"
        }

        let encryptedCVV = ""
        if(cvv){
            if(cvv.length === 3){
                encryptedCVV = encrypt(cvv)
            }else{
                throw "Invalid CVV"
            }
        }
        else{
            throw "CVV is required"
        }

        if(!cardHolderName){
            throw "Card Holder Name is required"
        }

        if(expirationDate){
            if(new Date(expirationDate) < new Date()){
                throw "Expiration Date can not be a previous date"
            }
        }
        else{
            throw "Expiration Date is required"
        }

        // check whether this users card is already exist or not
        let fetchUserCardQuery = "SELECT * FROM cards where user_id=1"
        let fetchUserCardDetails = await dbCon.query(fetchUserCardQuery)
        if(fetchUserCardDetails){
            throw "Your card is already exist"
        }

        let addCardQuery = "INSERT INTO cards(card_number, cvv, card_holder_name, expiration_date, user_id) VALUES(?, ?, ?, ?, 1)"
        try{
            let addCrad = await dbCon.query(addCardQuery, [encrypedCardNumber, encryptedCVV, cardHolderName, new Date(expirationDate)])
            res.status(200).json({message: "Card added successfully"})
        }
        catch(ex){
            throw "Failed to add card"
        }
    }
    catch(ex){
        console.log("ex === ", ex)
        res.status(400).json({message: ex})
    }
})

module.exports = router;