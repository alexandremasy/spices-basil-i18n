/**
 * ISO639 is about the languages codes.
 * Expressed usually in two or three characters.
 * @see https://www.loc.gov/standards/iso639-2/php/English_list.php
 */
const ISO639_2 = 'ISO639-2'; // en
const ISO639_3 = 'ISO639-3'; // eng

/**
 * ISO3166 is about the country codes.
 * Expressed usually in two or three characters.
 * @see https://www.iso.org/obp/ui#iso:pub:PUB500001:en
 */
const ISO3166_2 = 'ISO3166-2'; // US
const ISO3166_3 = 'ISO3166-3'; // USA

/**
 * The combinations of the two sets is described in 
 * the RFC 5646 from the IETF
 * @see https://tools.ietf.org/html/rfc5646
 */

import BasilCountry from './country'
import BasilLang from './lang'

/**
 * Locale
 * 
 * @class
 */
export default class BasilLocale {

  /**
   * @constructor
   * @param {String} value 
   */
  constructor(value) {
    this.value = value;

    let parts = this.value.split(/[-_]/);
    this._lang = new BasilLang(parts[0]);
    this._country = new BasilCountry(parts[1]);
  }

  /**
   * The country associated with the current locale
   * 
   * @readonly
   * @property {String}
   */
  get country() {
    return this._country.alpha2;
  }

  /**
   * The lang associated with the current locale.
   * e.g. `en`
   * 
   * @readonly
   * @property {String}
   */
  get lang() {
    return this._lang.alpha2;
  }

  /**
   * The langtag version of the locale.
   * e.g. `en-us`
   * 
   * @readonly
   * @property {String}
   */
  get langtag() {
    return [this.lang, this.country].filter(l => l !== null).join('-');
  }
  
  /**
   * The iso version of the locale.
   * e.g. `en_US`
   * 
   * @readonly
   * @property {String}
   */
  get iso() {
    return [this.lang, this.country.toUpperCase()].filter(l => l !== null).join('_');
  }
}
