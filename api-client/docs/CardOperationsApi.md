# MastercardEzaccessForIssuersApi.CardOperationsApi

All URIs are relative to *https://sandbox.api.mastercard.com/city-key-ezaccess*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addCardToProgram**](CardOperationsApi.md#addCardToProgram) | **PUT** /programs/{program_id}/cards | Associate a card with a program.
[**getCards**](CardOperationsApi.md#getCards) | **GET** /cards | Fetch a paginated list of cards.
[**getPrograms**](CardOperationsApi.md#getPrograms) | **GET** /programs | Fetch a paginated list of programs.
[**registerCards**](CardOperationsApi.md#registerCards) | **POST** /cards | Register list of card EAIDs
[**removeCard**](CardOperationsApi.md#removeCard) | **DELETE** /programs/{program_id}/cards/{card_eaid} | Remove a card from a program.
[**replaceCard**](CardOperationsApi.md#replaceCard) | **POST** /cards/{card_eaid} | Replace a card EAID.
[**updateCard**](CardOperationsApi.md#updateCard) | **PUT** /cards/{card_eaid} | Block or unblock a card.



## addCardToProgram

> EnrolledCard addCardToProgram(programId, assignCardEaid)

Associate a card with a program.

Associate an existing card with the given Mastercard EzAccess program. The card will be allowed to access facilities participating in the associated Mastercard EzAccess program.

### Example

```javascript
var MastercardEzaccessForIssuersApi = require('mastercard_ezaccess_for_issuers_api');

var apiInstance = new MastercardEzaccessForIssuersApi.CardOperationsApi();
var programId = 31PN50K95W; // String | Program code known to the issuer for enrolling specified cards for Mastercard EzAccess.
var assignCardEaid = new MastercardEzaccessForIssuersApi.AssignCardEaid(); // AssignCardEaid | 
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.addCardToProgram(programId, assignCardEaid, callback);
```

### Parameters



Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **programId** | **String**| Program code known to the issuer for enrolling specified cards for Mastercard EzAccess. | 
 **assignCardEaid** | [**AssignCardEaid**](AssignCardEaid.md)|  | 

### Return type

[**EnrolledCard**](EnrolledCard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getCards

> Object getCards(opts)

Fetch a paginated list of cards.

Fetch a paginated list of cards registered for Mastercard EzAccess for the given program code.

### Example

```javascript
var MastercardEzaccessForIssuersApi = require('mastercard_ezaccess_for_issuers_api');

var apiInstance = new MastercardEzaccessForIssuersApi.CardOperationsApi();
var opts = {
  'programId': 31PN50K95W, // String | Program code known to the issuer for enrolling specified cards for Mastercard EzAccess.
  'offset': 0, // Number | The number of items you asked the start of the list to be offset from.
  'limit': 10 // Number | The number of items you asked the list to be limited to.
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getCards(opts, callback);
```

### Parameters



Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **programId** | **String**| Program code known to the issuer for enrolling specified cards for Mastercard EzAccess. | [optional] 
 **offset** | **Number**| The number of items you asked the start of the list to be offset from. | [optional] [default to 0]
 **limit** | **Number**| The number of items you asked the list to be limited to. | [optional] [default to 10]

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getPrograms

> Object getPrograms(opts)

Fetch a paginated list of programs.

Fetch a paginated list of programs associated with issuer in Mastercard EzAccess

### Example

```javascript
var MastercardEzaccessForIssuersApi = require('mastercard_ezaccess_for_issuers_api');

var apiInstance = new MastercardEzaccessForIssuersApi.CardOperationsApi();
var opts = {
  'offset': 0, // Number | The number of items you asked the start of the list to be offset from.
  'limit': 10 // Number | The number of items you asked the list to be limited to.
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getPrograms(opts, callback);
```

### Parameters



Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **Number**| The number of items you asked the start of the list to be offset from. | [optional] [default to 0]
 **limit** | **Number**| The number of items you asked the list to be limited to. | [optional] [default to 10]

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## registerCards

> registerCards(cardProgram)

Register list of card EAIDs

Register multiple Mastercard EzAccess IDs (EAIDs) to be enabled for Mastercard EzAccess. Registered cards are allowed to access the selected facilities participating in Mastercard EzAccess.

### Example

```javascript
var MastercardEzaccessForIssuersApi = require('mastercard_ezaccess_for_issuers_api');

var apiInstance = new MastercardEzaccessForIssuersApi.CardOperationsApi();
var cardProgram = new MastercardEzaccessForIssuersApi.CardProgram(); // CardProgram | 
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.registerCards(cardProgram, callback);
```

### Parameters



Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cardProgram** | [**CardProgram**](CardProgram.md)|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## removeCard

> EnrolledCard removeCard(programId, cardEaid)

Remove a card from a program.

Unassociate a card for a specific Mastercard EzAccess program.The card will not be allowed to access facilities participating in the Mastercard EzAccess program.

### Example

```javascript
var MastercardEzaccessForIssuersApi = require('mastercard_ezaccess_for_issuers_api');

var apiInstance = new MastercardEzaccessForIssuersApi.CardOperationsApi();
var programId = 31PN50K95W; // String | Program code known to the issuer for enrolling specified cards for Mastercard EzAccess.
var cardEaid = 0000010001000022; // String | The Mastercard EzAccess ID (EAID) for the given card.
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.removeCard(programId, cardEaid, callback);
```

### Parameters



Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **programId** | **String**| Program code known to the issuer for enrolling specified cards for Mastercard EzAccess. | 
 **cardEaid** | **String**| The Mastercard EzAccess ID (EAID) for the given card. | 

### Return type

[**EnrolledCard**](EnrolledCard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## replaceCard

> EnrolledCard replaceCard(cardEaid, replaceCardEaid)

Replace a card EAID.

Transfer an existing card&#39;s associated programs to a new EAID for use in Mastercard EzAccess. The current card EAID will be disabled from being used in Mastercard EzAccess.

### Example

```javascript
var MastercardEzaccessForIssuersApi = require('mastercard_ezaccess_for_issuers_api');

var apiInstance = new MastercardEzaccessForIssuersApi.CardOperationsApi();
var cardEaid = 0000010001000022; // String | The Mastercard EzAccess ID (EAID) for the given card.
var replaceCardEaid = new MastercardEzaccessForIssuersApi.ReplaceCardEaid(); // ReplaceCardEaid | 
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.replaceCard(cardEaid, replaceCardEaid, callback);
```

### Parameters



Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cardEaid** | **String**| The Mastercard EzAccess ID (EAID) for the given card. | 
 **replaceCardEaid** | [**ReplaceCardEaid**](ReplaceCardEaid.md)|  | 

### Return type

[**EnrolledCard**](EnrolledCard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateCard

> EnrolledCard updateCard(cardEaid, updateCardStatus)

Block or unblock a card.

Update a card&#39;s status in Mastercard EzAccess as Blocked or Active. Blocked cards are disabled from being used for Mastercard EzAaccess. Active cards are enabled for use in Mastercard EzAccess.

### Example

```javascript
var MastercardEzaccessForIssuersApi = require('mastercard_ezaccess_for_issuers_api');

var apiInstance = new MastercardEzaccessForIssuersApi.CardOperationsApi();
var cardEaid = 0000010001000022; // String | The Mastercard EzAccess ID (EAID) for the given card.
var updateCardStatus = new MastercardEzaccessForIssuersApi.UpdateCardStatus(); // UpdateCardStatus | 
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateCard(cardEaid, updateCardStatus, callback);
```

### Parameters



Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cardEaid** | **String**| The Mastercard EzAccess ID (EAID) for the given card. | 
 **updateCardStatus** | [**UpdateCardStatus**](UpdateCardStatus.md)|  | 

### Return type

[**EnrolledCard**](EnrolledCard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

