/**
 * Mastercard Ezaccess For Issuers API
 * [![](https://mstr.cd/320oUJL)](https://developer.mastercard.com)  This is the Mastercard EzAccess for Issuers API.  This API uses OAuth 1.0a for authenticating client applications. For that, please refer to [Using OAuth 1.0a to Access Mastercard APIs](https://mstr.cd/31YcrTi).  The transport between client applications and Mastercard EzAccess service is secured using [TLS/SSL](https://w.wiki/PoA).
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: apisupport@mastercard.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 *
 * OpenAPI Generator version: 5.4.0
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.MastercardEzaccessForIssuersApi) {
      root.MastercardEzaccessForIssuersApi = {};
    }
    root.MastercardEzaccessForIssuersApi.CardRange = factory(root.MastercardEzaccessForIssuersApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';



  /**
   * The CardRange model module.
   * @module model/CardRange
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>CardRange</code>.
   * @alias module:model/CardRange
   * @class
   */
  var exports = function() {
    var _this = this;

  };

  /**
   * Constructs a <code>CardRange</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CardRange} obj Optional instance to populate.
   * @return {module:model/CardRange} The populated <code>CardRange</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('rangeId')) {
        obj['rangeId'] = ApiClient.convertToType(data['rangeId'], 'Number');
      }
      if (data.hasOwnProperty('startNumber')) {
        obj['startNumber'] = ApiClient.convertToType(data['startNumber'], 'Number');
      }
      if (data.hasOwnProperty('endNumber')) {
        obj['endNumber'] = ApiClient.convertToType(data['endNumber'], 'Number');
      }
      if (data.hasOwnProperty('showUnused')) {
        obj['showUnused'] = ApiClient.convertToType(data['showUnused'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * The range ID of a group of card EAIDs. Range IDs are assigned by an issuer to help identify card EAIDs associated with a particular Mastercard EzAccess program.
   * @member {Number} rangeId
   */
  exports.prototype['rangeId'] = undefined;
  /**
   * The starting card number to be included for generating an EAID.
   * @member {Number} startNumber
   */
  exports.prototype['startNumber'] = undefined;
  /**
   * The ending card number to be included for generating an EAID.
   * @member {Number} endNumber
   */
  exports.prototype['endNumber'] = undefined;
  /**
   * If this value is set to true, only unused EAID values will be returned. If this value is set to false, both used and unused EAIDs will be returned. Acceptable values are: true, false
   * @member {Boolean} showUnused
   * @default false
   */
  exports.prototype['showUnused'] = false;



  return exports;
}));


