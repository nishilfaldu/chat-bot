const express = require("express");
const cors = require("cors");
const path = require("path");
const {WebhookClient} = require('dialogflow-fulfillment');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 80;

let email = ''
let last_name = ''
let given_name = ''

app.post('/dialogflow-fulfillment', (request, response) => {
  console.log(request.body.queryResult.parameters.email);
  if(request.body.queryResult.parameters.email){
    email = request.body.queryResult.parameters.email;
    last_name  = request.body.queryResult.parameters['last-name'];
    given_name = request.body.queryResult.parameters['given-name'];
    // console.log(given_name);
  }
  details(request, response);

})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const details = (request, response) => {
  const agent = new WebhookClient({request, response})
  console.log(email);
  function giveDetails(agent){
      agent.add(`User First Name: ${given_name}, \n User Last Name: ${last_name}, \n User Email: ${email}, \n  Creator First Name: Nishil, \n Creator Last Name: Faldu,  \n Creator Email: faldund@mail.uc.edu`);
    }

  let intentMap = new Map();
  intentMap.set("Details", giveDetails);
  agent.handleRequest(intentMap);
}

exports.app = functions.https.onRequest(app);