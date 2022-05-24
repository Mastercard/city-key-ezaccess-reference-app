require('dotenv').config({ path: '../.env' })

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const forge = require('node-forge')
const fs = require('fs')
const oauth = require('mastercard-oauth1-signer')
const apiSdk = require('mastercard_ezaccess_for_issuers_api')

const clientInstance = apiSdk.ApiClient.instance

clientInstance.applyAuthToRequest = request => {
  const _end = request._end
  request._end = function () {
    request.req.setHeader('Client-Id', 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454')
    _end.call(request)
  }
  return request
}

try {
  const { consumerKey, signingKey } = loadKeys()
  configApiClient(consumerKey, signingKey)
} catch (e) {
  console.warn('WARNING!: cannot create config based on .env file.  error: ' + e.message + '\n . Assume connecting to local development server.')
}

const app = express()
app.use(bodyParser.json())
app.use(cors())

// API 1: Prepare EAIDs
app.post('/eaids', (req, res) => {
  const api = new apiSdk.CardPreparationApi()
  const body = apiSdk.CardRange.constructFromObject(req.body)
  api.generateEAIDs(body, handleApiCallback(res))
})

// API 2: Register cards
app.post('/cards', (req, res) => {
  const api = new apiSdk.CardOperationsApi()
  const body = apiSdk.CardProgram.constructFromObject(req.body)
  api.registerCards(body, handleApiCallback(res))
})

// API 3: Get cards
app.get('/cards', (req, res) => {
  const api = new apiSdk.CardOperationsApi()
  api.getCards(req.query, handleApiCallback(res))
})

// API 4: Block / unblock card
app.put('/cards/:cardEaid', (req, res) => {
  const api = new apiSdk.CardOperationsApi()
  const body = apiSdk.UpdateCardStatus.constructFromObject(req.body)
  api.updateCard(req.params.cardEaid, body, handleApiCallback(res))
})

// API 5: Replace card
app.post('/cards/:cardEaid', (req, res) => {
  const api = new apiSdk.CardOperationsApi()
  const body = apiSdk.AssignCardEaid.constructFromObject(req.body)
  api.replaceCard(req.params.cardEaid, body, handleApiCallback(res))
})

// API 6: Associate card to program
app.put('/programs/:programId/cards', (req, res) => {
  const api = new apiSdk.CardOperationsApi()
  const body = apiSdk.AssignCardEaid.constructFromObject(req.body)
  api.addCardToProgram(req.params.programId, body, handleApiCallback(res))
})

// API 7: Remove card from program
app.delete('/programs/:programId/cards/:cardEaid', (req, res) => {
  const api = new apiSdk.CardOperationsApi()
  api.removeCard(req.params.programId, req.params.cardEaid, handleApiCallback(res))
})

// API 8: Get programs assigned to issuer
app.get('/programs', (req, res) => {
  const api = new apiSdk.CardOperationsApi()
  api.getPrograms(req.query, handleApiCallback(res))
})

const serverPort = process.env.REFERENCE_SERVER_PORT
app.listen(serverPort, () => console.log(`Reference server listening on port ${serverPort}!`))

function loadKeys() {
  const p12Content = fs.readFileSync(process.env.MCAPI_P12_PATH, 'binary')
  const p12Asn1 = forge.asn1.fromDer(p12Content, false)
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, process.env.MCAPI_KEYSTORE_PASSWORD)
  const keyObj = p12.getBags({
    friendlyName: process.env.MCAPI_KEY_ALIAS,
    bagType: forge.pki.oids.pkcs8ShroudedKeyBag
  }).friendlyName[0]

  return {
    consumerKey: process.env.MCAPI_CONSUMER_KEY,
    signingKey: forge.pki.privateKeyToPem(keyObj.key)
  }
}

function configApiClient(consumerKey, signingKey) {
  clientInstance.basePath = process.env.BASE_PATH || clientInstance.basePath
  clientInstance.applyAuthToRequest = request => {
    const _end = request._end
    request._end = function () {
      const authHeader = oauth.getAuthorizationHeader(request.url, request.method, JSON.stringify(request._data), consumerKey, signingKey)
      request.req.setHeader('Authorization', authHeader)
      _end.call(request)
    }
    return request
  }
}

function handleApiCallback(res) {
  return function (_1, _2, response) {
  var resp = ''
  
  if (response.error) {
  
  console.log('**** Error flow ****')
  
  resp = response.error.text
  
  } else {
  
  console.log('**** Positive Flow ****')
  
  resp = response.body.data || response.body
  
  }
  
  console.log("Testing "+response.request.method)
  
  console.log(response.request.url)
  
  if (response.request.method != 'GET') {
  
  console.log("Request Sent :")
  
  console.log(response.request._data)
  
  }
  
  console.log("Respone Received:")
  
  console.log(JSON.stringify(resp))
  
  res.status(response.status).send(resp)
  
  }
}