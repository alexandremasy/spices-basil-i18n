# Basil - Sayl Admin
> @spices/basil plugin to ease the sayl admin

```JS
import { basil } from '@spices/basil'
import { install, sayl } from '@spices/basil-sayl'

basil.use( install );
```

## Utilities

- `hasExtension(slug):boolean` Whether or not an extension is active
  - sayl.OAT
  - sayl.LIGHTSPEED

- `hasModule(fqn):boolean` Whether or not a module is active
  - sayl.AUDIENCE
  - sayl.COMMERCE
  - sayl.CUSTOMERS
  - sayl.CMS
  - sayl.EATIN
  - sayl.LIGHTSPEED
  - sayl.SETTINGS
  - sayl.STOREFRONT

- `setConfig(value:Object)` Define the configuration file

