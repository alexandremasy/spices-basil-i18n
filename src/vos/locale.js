/**
 * ISO639 is about the languages codes.
 * Expressed usually in two or three characters.
 * @see https://www.loc.gov/standards/iso639-2/php/English_list.php
 */
const ISO639_2 = 'ISO639-2' // en
const ISO639_3 = 'ISO639-3' // eng

/**
 * ISO3166 is about the country codes.
 * Expressed usually in two or three characters.
 * @see https://www.iso.org/obp/ui#iso:pub:PUB500001:en
 */
const ISO3166_2 = 'ISO3166-2' // US
const ISO3166_3 = 'ISO3166-3' // USA

/**
 * The combinations of the two sets is described in 
 * the RFC 5646 from the IETF
 * @see https://tools.ietf.org/html/rfc5646
 */

import Country from './country'
import Lang from './lang'
import { basil } from '@spices/basil'

/**
 * Locale
 * 
 * @class
 */
export default class Locale {
  /**
   * Parse the given value in order to convert it to a Locale
   * 
   * @param {String|Locale} value 
   * @returns {Locale}
   * @static
   */
  static parse(value){
    // Nil -> Error
    if (basil.isNil(value)){
      throw `[basil.i18n.Locale] Not a valid value for a Locale: ${value}`
    }
    
    // String -> Locale
    if (basil.isString(value)){
      return new Locale(value)
    }
    
    // Locale -> Skip
    if (value instanceof Locale){
      return value
    }
    
    // Other -> Error
    throw `[basil.i18n.Locale] Not a valid value for a Locale: ${value}`
  }

  /**
   * @constructor
   * @param {String} value 
   */
  constructor(value) {
    if (basil.isNil(value)) {
      throw new Error(`Not a valid value for Locale ${value}`)
    }

    if (value instanceof Locale) {
      value = value.toString()
    }

    this.value = value
    let parts = value.split(/[-_]/)
    this._lang = new Lang(parts[0])
    this._country = new Country(parts[1])
  }

  /**
   * The country associated with the current locale
   * 
   * @readonly
   * @property {String}
   */
  get country() {
    return this._country ? this._country.alpha2 : null
  }

  /**
   * The lang associated with the current locale
   * 
   * @readonly
   * @property {String}
   */
  get lang() {
    return this._lang ? this._lang.alpha2 : null
  }

  /**
   * The langtag version of the locale
   * 
   * @property {String}
   * @readonly
   */
  get langtag() {
    let ret = []
    if (this._lang && this._lang.valid) { ret.push(this._lang) }
    if (this._country && this._country.valid) { ret.push(this._country) }

    return ret.join('-')
  }

  /**
   * The iso version of the locale
   * @property {String}
   * @readonly
   */
  get iso() {
    let ret = []
    if (this._lang && this._lang.valid) { ret.push(this._lang) }
    if (this._country && this._country.valid) { ret.push(this._country.toString().toUpperCase()) }

    return ret.join('_')
  }

  /**
   * Whether or not the locale is valid
   * A locale is valid when one of the country and lang is valid
   * 
   * @property {Boolean}
   * @readonly
   */
  get valid() {
    return (this._lang && this._lang.valid) ||
           (this._country && this._country.valid)
  }

  /**
   * @returns {String}
   */
  toString() {
    return this.langtag
  }
}
