# Basil - i18n plugin
> @spices/basil plugin to ease the i18n process

```JS
import { basil } from '@spices/basil'
import { install as i18n } from '@spices/basil-i18n'

basil.use( i18n );
```

## Utilities
A locale encompass a lang and a country (e.g. en-US). 
From there, the country and

**Locale**
- `set/get locale:Locale` The current locale
- `set/get locales:Array` The other locales

**Lang**
Based on the `BasilLang` class

- `get registeredLangs:Array.<Lang>`

**Countries**
Based on the `BasilCountry` class

- `get registeredCountries:Array.<Country>` The list of all the registered countries. 
- `get/set countries` Get/Set the application countries
- `addCountry(value:Country)` Add a country to the list of valid countries. By default all the countries in the ISO3166 are available. It will add the country to list of registered countries, not the application countries.

**Number**

@TODO prepare the list of currencies with their symbol and iso representation. e.g '€' => 'EUR'

- `toCurrency(value:number, [signed:boolean = false]):string`
- `toRangeCurrency(min:number, max, [signed:boolean = false]):string`

**Date**
- `$date(value:Date, format:'date')`
