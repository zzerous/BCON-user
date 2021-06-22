const express = require('express')
const Caver= require('caver-js')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')

const port = 3001
const FD_URL = 'https://wallet-api.klaytnapi.com/v2/tx/fd/rlp'
const FD_CHAIN_ID = '1001'
const FD_AUTH = {
  username: "KASKOZWA271H516DN6NFNVQI",
  password: "OvSb8pQdT8fH8WLdk16vWgSEHDF6f7sAGILDhGjD",
  Authorization:"Basic S0FTS09aV0EyNzFINTE2RE42TkZOVlFJOk92U2I4cFFkVDhmSDhXTGRrMTZ2V2dTRUhERjZmN3NBR0lMRGhHakQ=",
}

app.use(cors());
app.use(bodyParser.json());

app.post('/metaFD', async (req, res) => {
	const metaUploadRawTransaction = req.body.senderRawTransaction;
	const errMsg = await feeDelegation(metaUploadRawTransaction);
	if(errMsg == '') res.send('success');
	else res.send(errMsg);
});

app.post('/storeCertFD', async (req, res) => {
	const storeCertRawTransaction = req.body.senderRawTransaction;
	const errMsg = await feeDelegation(storeCertRawTransaction);
	if(errMsg == '') res.send('success');
	else res.send(errMsg);
});

app.post('/deleteCertFD', async (req, res) => {
	const deleteCertRawTransaction = req.body.senderRawTransaction;
	const errMsg = await feeDelegation(deleteCertRawTransaction);
	if(errMsg == '') res.send('success');
	else res.send(errMsg);
});

app.listen(port, ()=>{
    console.log(`fee-delegation-server is running on ${port}`);
})

async function feeDelegation(senderRawTransaction){
	try{
	  const res = await axios({
        	url: FD_URL,// RLP 직렬화된 트랜잭션의 대납
        	method: "POST",
        	headers: {
            		"x-chain-id": FD_CHAIN_ID,
            		"Content-Type": "application/json",
           
        	},
        	auth: FD_AUTH,
        	data: {
            	rlp: senderRawTransaction,
            	submit: true,
            	feeRatio: 0
        	},
        	json: true
      	  });
      	  console.log(res);
      	  return '';
	}catch(e){
	  return e;
	}	
}
