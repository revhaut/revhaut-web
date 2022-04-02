const HttpStatusCode = require('../../shared/utils/response-formatter.util');
const countrySchema = require('./schema/country.schema');
const schemaValidator = require('../../shared/utils/schema-validator.util');
const CountryStateService = require('./country.service');

class CountryStateController {

    async getCountryApi(request, response) {
        try {
            const result  = await CountryStateService.getCountries();
            return HttpStatusCode.SUCCESS({ response, data: result });
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                message: error.message,
            });
        }
    }
    async getCountryStateApi(request, response) {
      const { body } = request;
      try {
          const { errors, data } = schemaValidator(countrySchema.stateSchema, {...body});
          if (errors) {
              return HttpStatusCode.INVALID_REQUEST({ response, errors });
          }
          const result = await CountryStateService.getCountryState(data);
          return HttpStatusCode.SUCCESS({ response, data: result });
      } catch (error) {
          return HttpStatusCode.UNPROCCESSABLE_ENTITY({
              response,
              message: error.message,
          });
      }
    }

}

module.exports = new CountryStateController();