# MastercardEzaccessForIssuersApi.CardPreparationApi

All URIs are relative to *https://sandbox.api.mastercard.com/city-key-ezaccess*

Method | HTTP request | Description
------------- | ------------- | -------------
[**generateEAIDs**](CardPreparationApi.md#generateEAIDs) | **POST** /eaids | Generate list of Mastercard EzAccess IDs (EAIDs).



## generateEAIDs

> InlineResponse200 generateEAIDs(cardRange)

Generate list of Mastercard EzAccess IDs (EAIDs).

Generate list of Mastercard EzAccess IDs (EAIDs), each with its own Luhn checksum. An EAID may be used for card production in EMV tag 9F6E. Numbers in between startNumber and endNumber are the actual number of EAIDs generated including the startNumber and the endNumber. The maximum number of EAIDs that can be generated per request is 500.

### Example

```javascript
var MastercardEzaccessForIssuersApi = require('mastercard_ezaccess_for_issuers_api');

var apiInstance = new MastercardEzaccessForIssuersApi.CardPreparationApi();
var cardRange = new MastercardEzaccessForIssuersApi.CardRange(); // CardRange | 
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.generateEAIDs(cardRange, callback);
```

### Parameters



Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cardRange** | [**CardRange**](CardRange.md)|  | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

