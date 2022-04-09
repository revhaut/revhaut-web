const csc = require('country-state-city');
class CountryStateService {
    async getCountries() {
        return csc.Country.getAllCountries();
    }
    async getCountryState(countryCode) {
        const { country_code } = countryCode;
        return csc.State.getStatesOfCountry(country_code);
    }
    async getCountryByCode(countryCode) {
        const { country_code } = countryCode;
        const result = csc.Country.getCountryByCode(country_code);
        return result;
    }
}

module.exports = new CountryStateService();