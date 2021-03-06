# mastercard_ezaccess_for_issuers_api

MastercardEzaccessForIssuersApi - JavaScript client for mastercard_ezaccess_for_issuers_api
[![](https://mstr.cd/320oUJL)](https://developer.mastercard.com)

This is the Mastercard EzAccess for Issuers API.

This API uses OAuth 1.0a for authenticating client applications. For that, please refer to [Using OAuth 1.0a to Access Mastercard APIs](https://mstr.cd/31YcrTi).

The transport between client applications and Mastercard EzAccess service is secured using [TLS/SSL](https://w.wiki/PoA).
This SDK is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

- API version: 1.0.0
- Package version: 1.0.0
- Build package: org.openapitools.codegen.languages.JavascriptClientCodegen
For more information, please visit [https://developer.mastercard.com/support](https://developer.mastercard.com/support)

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/), please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install mastercard_ezaccess_for_issuers_api --save
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

Finally, switch to the directory you want to use your mastercard_ezaccess_for_issuers_api from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

You should now be able to `require('mastercard_ezaccess_for_issuers_api')` in javascript files from the directory you ran the last command above from.

### git

If the library is hosted at a git repository, e.g. https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following the above steps with Node.js and installing browserify with `npm install -g browserify`, perform the following (assuming *main.js* is your entry file, that's to say your javascript file where you actually use this library):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var MastercardEzaccessForIssuersApi = require('mastercard_ezaccess_for_issuers_api');


var api = new MastercardEzaccessForIssuersApi.CardOperationsApi()
var programId = 31PN50K95W; // {String} Program code known to the issuer for enrolling specified cards for Mastercard EzAccess.
var assignCardEaid = new MastercardEzaccessForIssuersApi.AssignCardEaid(); // {AssignCardEaid} 

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.addCardToProgram(programId, assignCardEaid, callback);

```

## Documentation for API Endpoints

All URIs are relative to *https://sandbox.api.mastercard.com/city-key-ezaccess*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*MastercardEzaccessForIssuersApi.CardOperationsApi* | [**addCardToProgram**](docs/CardOperationsApi.md#addCardToProgram) | **PUT** /programs/{program_id}/cards | Associate a card with a program.
*MastercardEzaccessForIssuersApi.CardOperationsApi* | [**getCards**](docs/CardOperationsApi.md#getCards) | **GET** /cards | Fetch a paginated list of cards.
*MastercardEzaccessForIssuersApi.CardOperationsApi* | [**getPrograms**](docs/CardOperationsApi.md#getPrograms) | **GET** /programs | Fetch a paginated list of programs.
*MastercardEzaccessForIssuersApi.CardOperationsApi* | [**registerCards**](docs/CardOperationsApi.md#registerCards) | **POST** /cards | Register list of card EAIDs
*MastercardEzaccessForIssuersApi.CardOperationsApi* | [**removeCard**](docs/CardOperationsApi.md#removeCard) | **DELETE** /programs/{program_id}/cards/{card_eaid} | Remove a card from a program.
*MastercardEzaccessForIssuersApi.CardOperationsApi* | [**replaceCard**](docs/CardOperationsApi.md#replaceCard) | **POST** /cards/{card_eaid} | Replace a card EAID.
*MastercardEzaccessForIssuersApi.CardOperationsApi* | [**updateCard**](docs/CardOperationsApi.md#updateCard) | **PUT** /cards/{card_eaid} | Block or unblock a card.
*MastercardEzaccessForIssuersApi.CardPreparationApi* | [**generateEAIDs**](docs/CardPreparationApi.md#generateEAIDs) | **POST** /eaids | Generate list of Mastercard EzAccess IDs (EAIDs).


## Documentation for Models

 - [MastercardEzaccessForIssuersApi.AssignCardEaid](docs/AssignCardEaid.md)
 - [MastercardEzaccessForIssuersApi.Card](docs/Card.md)
 - [MastercardEzaccessForIssuersApi.CardProgram](docs/CardProgram.md)
 - [MastercardEzaccessForIssuersApi.CardPrograms](docs/CardPrograms.md)
 - [MastercardEzaccessForIssuersApi.CardProgramsAllOf](docs/CardProgramsAllOf.md)
 - [MastercardEzaccessForIssuersApi.CardRange](docs/CardRange.md)
 - [MastercardEzaccessForIssuersApi.EnrolledCard](docs/EnrolledCard.md)
 - [MastercardEzaccessForIssuersApi.EnrolledCardAllOf](docs/EnrolledCardAllOf.md)
 - [MastercardEzaccessForIssuersApi.Error](docs/Error.md)
 - [MastercardEzaccessForIssuersApi.ErrorDetail](docs/ErrorDetail.md)
 - [MastercardEzaccessForIssuersApi.ErrorErrors](docs/ErrorErrors.md)
 - [MastercardEzaccessForIssuersApi.InlineResponse200](docs/InlineResponse200.md)
 - [MastercardEzaccessForIssuersApi.Pagination](docs/Pagination.md)
 - [MastercardEzaccessForIssuersApi.Program](docs/Program.md)
 - [MastercardEzaccessForIssuersApi.ReplaceCardEaid](docs/ReplaceCardEaid.md)
 - [MastercardEzaccessForIssuersApi.UpdateCardStatus](docs/UpdateCardStatus.md)


## Documentation for Authorization

All endpoints do not require authorization.
