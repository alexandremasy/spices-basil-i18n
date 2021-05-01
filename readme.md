# Basil - i18n plugin
> @spices/basil plugin to ease the i18n process

[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=for-the-badge&logo=github)](https://wallabyjs.com/oss/)

## Installation

1. Install the package → `yarn add @spices/basil-i18n`
2. Install the plugin

```js
import { basil, install } from '@spices/basil'
import { install as basilI18n } from '@spices/basil-i18n'

Vue.use(install)
basil.use(basilI18n, options:Object)
```


## Options

Alongside the installation, an options object can be used to customize the behavior of the i18n plugin. It is also possible to update the options via the `basil.i18n.options` methods. 



**Syntax**

```js
basil.i18n.options({options:Object})
```



**Parameters**

`options.locale.key:String = 'basil.i18n.locale'`
The value to persist the locale information in the locale storage.

 

`options.locale.matcher:Function`

Allows you to override the suggestion mechanism of a locale in the matching process. This function will be executed during the definition of possible locales (more info in the matching section) when starting the plugin and every time the locales changes. 

```JS
function(locale:Locale, locales:Array.Locale, options:Options):Array.Locale
```



`options.locale.persistent:Boolean = false`
Whether or not to store the locale value in the local storage.

 

`options.locale.priority:String = basil.i18n.Priority.LOCALE`

Whether to prioritize the country or the locale when trying to find out the appropriate locale for the user. 
Available values:

- basil.i18n.Priority.COUNTRY Will try to find a match based on the country. 
- basil.i18n.Priority.LOCALE Will try to find a match based on the locale. 



## API



## currency

Format the given number into a human currency representation.



**Syntax**

```js
basil.i18n.currency(value:Number, options:Object{
  [compact:Boolean = false],
  [currency:String = basil.i18n.Currencies.EURO],
  [display:String = basil.i18n.Formats.SYMBOL],
  [fraction:Integer = 2],
  [group:Boolean = true],
  [locale:String = 'en'],
  [significant:Integer = 21],
  [sign:NumberSigns = basil.i18n.NumberSigns.AUTO]
})
```



**Examples**

```js
let value = 12345.6789

basil.i18n.currency(value) // "€12,345.6789"
basil.i18n.currency(value, { locale: 'fr' }) // "12 345,6789 €"
basil.i18n.currency(value, { currency: basil.i18n.Currencies.US_DOLLAR }) // "$12,345.6789"
```



**Parameters**

`value` **Required**

The value to convert. Must be a valid Number.



`options.compact`  

Whether or not use a compact form of output. Useful for legend and such narrow places. Possible values are true and false; the default is false.



`options.currency`

The currency to use in currency formatting. Possible values are the ISO 4217 currency codes. The allowed values are modeled and available with the `basil.i18n.Currencies` collection.



`options.display`

How to display the currency in currency formatting. Possible values are:

- `basil.i18n.Formats.SYMBOL` to use a localized currency symbol such as €, this is the default value,
- `basil.i18n.Formats.NARROW_SYMBOL` to use a narrow format symbol ("$100" rather than "US$100"),
- `basil.i18n.Formats.CODE` to use the ISO currency code,
- `basil.i18n.Formats.NAME` to use a localized currency name such as `dollar`

 

`options.fraction` 

The number of fraction digits to use. Possible values are from 0 to 20. The default value is 2.



`options.group` 

Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. Possible values are true and false; the default is true.



`options.locale` 

A string with a BCP 47 language tag, or an array of such strings.



`options.significant` 

The number of significant digits to use. Possible values are from 1 to 21. The default is 21.



`options.sign`

When to display the sign for the number; defaults to `basil.NumberSigns.AUTO`

- `basil.i18n.NumberSigns.AUTO` Sign display for negative numbers only
- `basil.i18n.NumberSigns.NEVER` Never display sign
- `basil.i18n.NumberSigns.ALWAYS` Always display sign
- `basil.i18n.NumberSigns.EXCEPTZERO` Sign display for positive and negative numbers, but not zero



**Returns**

The formatted value as a `String`.



## date

Format a given date into a human representation.

For convenience, multiple aliases exist. All the version shares the same API, just the default style is altered:

- `basil.i18n.date` Will format with the style `basil.i18n.DateStyles.DATE`
- `basil.i18n.datetime`  Will format with the style `basil.i18n.DateStyles.DATETIME`
- `basil.i18n.time` Will format with the style `basil.i18n.DateStyles.TIME`



**Syntax**

```js
basil.i18n.date(value:Date, options:Object{
  [day],
  [era],
  [hour],
  [locale = 'en'],
  [minute],
  [month],
  [second],
  [style = basil.i18n.DateStyles.DATE],
  [timezone],
  value,
  [weekday],
  [year]
}):String
```



**Examples**

```js
let value = new Date()

basil.date(value) // "04/14/2021"
basil.datetime(value) // "04/14/2021 10:23"
basil.time(value) // "10:23"
basil.date(value, { weekday: basil.DateFormats.LONG }) // "Wednesday 04/14/2021"
```



**Parameters**

`value` **Required**

The value to convert. Must be a valid date.



`options.day`

The representation of the day. Possible values are:

- `basil.i18n.Formats.NUMERIC` (e.g., `1`)
- `basil.i18n.Formats.DIGIT2` (e.g., `01`)



`options.era`

The representation of the era. Possible values are:

- `basil.i18n.Formats.LONG` (e.g., `Anno Domini`)
- `basil.i18n.Formats.SHORT` (e.g., `AD`)
- `basil.i18n.Formats.NARROW` (e.g., `A`)



`options.hour`

The representation of the hour. 
Possible values are `basil.i18n.Formats.NUMERIC`, `basil.i18n.Formats.DIGIT2`.



`options.locale` 

A string with a BCP 47 language tag, or an array of such strings.



`options.minute`

The representation of the minute. 
Possible values are `basil.i18n.Formats.NUMERIC`, `basil.i18n.Formats.DIGIT2`



`options.month`

The representation of the month. Possible values are:

- `basil.i18n.Formats.NUMERIC` (e.g., `2`)
- `basil.i18n.Formats.DIGIT2` (e.g., `02`)
- `basil.i18n.Formats.LONG` (e.g., `March`)
- `basil.i18n.Formats.SHORT` (e.g., `Mar`)
- `basil.i18n.Formats.NARROW` (e.g., `M`). Two months may have the same narrow style for some locales (e.g. May's narrow style is also M).



`options.second`

The representation of the second. 
Possible values are `basil.i18n.Formats.NUMERIC`, `basil.i18n.Formats.DIGIT2`.



`options.style`

The style of output. Possible values are:

- `basil.i18n.DateStyles.DATE`
- `basil.i18n.DateStyles.DATETIME`
- `basil.i18n.DateStyles.MONTH`
- `basil.i18n.DateStyles.TIME`
- `basil.i18n.DateStyles.WEEKDAY`



`options.timezone`

The representation of the time zone name. Possible values are:

- `basil.i18n.Formats.LONG` (e.g., `British Summer Time`)
- `basil.i18n.Formats.SHORT` (e.g., `GMT+1`)




`options.weekday`

The representation of the weekday. Possible values are:

- `basil.i18n.Formats.LONG` (e.g., `Thursday`)
- `basil.i18n.Formats.SHORT` (e.g., `Thu`)
- `basil.i18n.Formats.NARROW` (e.g., `T`). Two weekdays may have the same narrow style for some locales (e.g. `Tuesday`'s narrow style is also `T`).



`options.year`

The representation of the year. Possible values are:

- `basil.i18n.Formats.NUMERIC` (e.g., `2012`)
- `basil.i18n.Formats.DIGIT2` (e.g., `12`)



**Returns**

The formatted date as a `String`



## fallback

The fallback locale to use, if no valid options are found. By default, the value is `en-GB`.



**Syntax**

```js
basil.i18n.fallback = <basil.i18n.Locale>
```



## locale

Set the current locale. 



**Syntax**

```js
basil.i18n.locale = <basil.i18n.Locale>
```

This value will be used as a default for all the conversion functions when the locale param is not defined. The value must be a valid basil.i18n.Locale. 

The value will be validated against the list of defined locales in basil.i18n.locales if it is defined. 



## locales

Set the available locales. Restrict the accepted values from `basil.i18n.locale` to ones from this list.



**Syntax**

```js
basil.i18n.locales = <Array.basil.i18n.Locale>
```

All the the entries must be of type `basil.i18n.Locale`.



## number

Format a given number into a human representation.

For convenience, multiple aliases exist. All the version shares the same API, just the default style is altered:

- `basil.i18n.number` Will format with the style `basil.i18n.NumberStyle.DECIMAL`
- `basil.i18n.percent` Will format with the style `basil.i18n.NumberStyle.PERCENT`
- `basil.i18n.unit` Will format with the style `basil.i18n.NumberStyle.UNIT`



**Syntax**

```javascript
basil.i18n.number(value:Number, options:Object{ 
  [compact:Boolean = false],
  [display:String = basil.i18n.Formats.SHORT]
  [fraction:Integer = 2],
  [group:Boolean = true],
  [locale:String = 'en'],
  [sign:NumberSigns = basil.i18n.NumberSigns.AUTO],
  [significant:Integer = 21],
  [style:NumberStyles = basil.i18n.NumberStyles.DECIMAL],
  [unit:NumberUnits],
}):String
```



**Examples**

```javascript
let value = 12345.67890

basil.number( value ) // "12,345.6789"
basil.number( value, { style: basil.i18n.NumberStyles.PERCENT }) // "1,234,568%"
basil.number( value, { style: basil.i18n.NumberStyles.UNIT, unit: basil.i18n.NumberUnits.LITER }) // "12,345.6789 L"
basil.number( value, { style: basil.i18n.NumberStyles.UNIT, unit: "Bonbons" }) // "12,345.6789 Bonbons"
basil.number( value, { compact: true }) // "12.3456789K"
```



**Parameters**

`value` **Required**

The value to convert. Must be a valid `Number`.



`options.compact`  

Whether or not use a compact form of output. Useful for legend and such narrow places. Possible values are true and false; the default is false.



`options.display`

The unit formatting style to use in unit formatting, the defaults is `basil.i18n.Formats.SHORT`.

- `basil.i18n.Formats.LONG` (e.g., `16 litres`)
- `basil.i18n.Formats.SHORT` (e.g., `16 l`)
- `basil.i18n.Formats.NARROW` (e.g., `16l`)



`options.fraction` 

The number of fraction digits to use. Possible values are from 0 to 20. The default value is 2.



`options.group` 

Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. Possible values are true and false; the default is true.



`options.locale` 

A string with a BCP 47 language tag, or an array of such strings.



`options.sign`

When to display the sign for the number; defaults to basil.i18n.NumberSigns.AUTO

- basil.i18n.NumberSigns.AUTO Sign display for negative numbers only
- basil.i18n.NumberSigns.NEVER Never display sign
- basil.i18n.NumberSigns.ALWAYS Always display sign
- basil.i18n.NumberSigns.EXCEPTZERO Sign display for positive and negative numbers, but not zero



`options.significant` 

The number of significant digits to use. Possible values are from 1 to 21. The default is 21.



`options.style`

The formatting style to use, the default is `basil.i18n.NumberStyles.DECIMAL`.

- `basil.i18n.NumberStyles.DECIMAL` for plain number formatting.
- `basil.i18n.NumberStyles.PERCENT` for percent formatting
- `basil.i18n.NumberStyles.UNIT` for unit formatting



`options.unit`

The unit to use in `basil.i18n.NumberStyle.UNIT` formatting. Possible values are core unit identifiers, defined in the subset selected for use in ECMAScript. It is also possible to set a custom unit by just providing a String value instead of a defined NumberUnits. 

- `basil.i18n.NumberUnits.ACRE`
- `basil.i18n.NumberUnits.BIT`
- `basil.i18n.NumberUnits.BYTE`
- `basil.i18n.NumberUnits.CELSIUS`
- `basil.i18n.NumberUnits.CENTIMETER`
- `basil.i18n.NumberUnits.DAY`
- `basil.i18n.NumberUnits.DEGREE`
- `basil.i18n.NumberUnits.FAHRENHEIT`
- `basil.i18n.NumberUnits.FLUID_OUNCE`
- `basil.i18n.NumberUnits.FOOT`
- `basil.i18n.NumberUnits.GALLON`
- `basil.i18n.NumberUnits.GIGABIT`
- `basil.i18n.NumberUnits.GIGABYTE`
- `basil.i18n.NumberUnits.GRAM`
- `basil.i18n.NumberUnits.HECTARE`
- `basil.i18n.NumberUnits.HOUR`
- `basil.i18n.NumberUnits.INCH`
- `basil.i18n.NumberUnits.KILOBIT`
- `basil.i18n.NumberUnits.KILOBYTE`
- `basil.i18n.NumberUnits.KILOGRAM`
- `basil.i18n.NumberUnits.KILOMETER`
- `basil.i18n.NumberUnits.LITER`
- `basil.i18n.NumberUnits.MEGABIT`
- `basil.i18n.NumberUnits.MEGABYTE`
- `basil.i18n.NumberUnits.METER`
- `basil.i18n.NumberUnits.MILE`
- `basil.i18n.NumberUnits.MILE_SCANDINAVIAN`
- `basil.i18n.NumberUnits.MILLILITER`
- `basil.i18n.NumberUnits.MILLIMETER`
- `basil.i18n.NumberUnits.MILLISECOND`
- `basil.i18n.NumberUnits.MINUTE`
- `basil.i18n.NumberUnits.MONTH`
- `basil.i18n.NumberUnits.OUNCE`
- `basil.i18n.NumberUnits.PERCENT`
- `basil.i18n.NumberUnits.PETABYTE`
- `basil.i18n.NumberUnits.POUND`
- `basil.i18n.NumberUnits.SECOND`
- `basil.i18n.NumberUnits.STONE`
- `basil.i18n.NumberUnits.TERABIT`
- `basil.i18n.NumberUnits.TERABYTE`
- `basil.i18n.NumberUnits.WEEK`
- `basil.i18n.NumberUnits.YARD`
- `basil.i18n.NumberUnits.YEAR`



**Returns**

The formatted value as a String.



## Matcher

During the initialization of the i18n plugin and every time the list of locales is changed, we need to figure out the appropriate locale for the user. With the update of locales, we also have to make sure the current locale is still valid. 

For that purpose, a list of possibilities is established to select the first valid locale.  This matching process is triggered by the following events:

- The plugin initialization
- The alteration of the `basil.i18n.locales`
- The alteration of the fallback locale `basil.i18n.fallback`

The list of possibilities is established in this particular order:

 

|                                                              |
| :----------------------------------------------------------- |
| The current `basil.i18n.locale`                              |
| The value store in the local storage. Only if `options.locale.persistent` is set to `true` |
| The value coming from the `options.locale.matcher` function  |
| The value coming from the `options.i18n.fallback`            |
| The first value in the `basil.i18n.locales`                  |
| The navigator language `navigator.language`                  |

If no value is found in the list, then an error is thrown. 



### Matching priority

It is not always possible to directly correlate the given locale and the list of available ones. 
When it happens, we can set the priority on either the 

e.g. with the given the following list of locales `fr_FR`, `fr_BE`, `nl_NL`, `nl`, and a locale of `nl_BE` no direct match can be found. Based on the available strategies: 

| **Priority**                  | **yield**   |
| :---------------------------- | :---------- |
| `basil.i18n.Priority.COUNTRY` | `fr_BE`     |
| `basil.i18n.Priority.LOCALE`  | `nl_NL, nl` |