require('dotenv').config({ path: '../.env' })

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const forge = require('node-forge')
const fs = require('fs')
const oauth = require('mastercard-oauth1-signer')
const apiSdk = require('mastercard_ezaccess_for_issuers_api')

const { consumerKey, signingKey } = loadKeys()
const clientInstance = apiSdk.ApiClient.instance

clientInstance.applyAuthToRequest = request => {
  const _end = request._end
  request._end = function () {
    request.req.setHeader('Client-Id', 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454')
    _end.call(request)
  }
  return request
}

configApiClient(consumerKey, signingKey)

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
    if (response.error) {
      console.log('**** Error ****')
      console.log(response.error)
    }
    console.log(response.body)

    const resp = response.body.data || response.body

    res.status(response.status).send(response.error ? JSON.parse(response.error.text) : resp)
  }
}
