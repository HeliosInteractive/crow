# Crow

A JS logging client meant to be used with [Woodpecker](http://helios-stash.heliosinteractive.com:7991/projects/HI/repos/woodpecker/browse).

## Installation
```$xslt
npm install @helios-interactive/crow --save
```
## Usage

#### Node / Commonjs

```
var crow = require("@helios-interactive/crow");
crow.setUrl("<url of woodpecker>");
crow.setApplication = "<application name>";
crow.warn("A message to be logged to woodpecker")
```

#### Browser

```
<script src="./dist/crow.min.js"></script>
<script>
    crow.setUrl("<url of woodpecker>");
    crow.setApplication = "<application name>";
    crow.warn("A message to be logged to woodpecker")
</script>
```

#### AMD
```
define(['crow'], function (crow) {
    crow.setUrl("<url of woodpecker>");
    crow.setApplication = "<application name>";
    crow.warn("A message to be logged to woodpecker")
});
```

#### Module
```
import { crow } from '@helios-interactive/crow';

crow.setUrl("<url of woodpecker>");
crow.setApplication = "<application name>";
crow.warn("A message to be logged to woodpecker")
```

## Methods

#### setUrl(url)
> Sets the url for crow. This should match the url for your woodpecker instance.
>
> ##### Parameters
>
> *url* - The url of the woodpecker instance that is being run.
>
> ##### Usage
>
> `crow.setUrl('http://localhost:4000')`

#### setApplication(application)
> Sets the application for crow. This will determine what logfile the requests go to.
>
> ##### Parameters
>
> *application* - The name of the current application.
>
> ##### Usage
>
> `crow.setApplication('Foobar')`

#### setDevMode(devMode)
> Sets crow into dev mode. When in dev mode crow will not attempt to log to woodpecker, and will instead only log to console. This can be used in development, but should not be used in production.
>
> ##### Parameters
>
> *devMode* - Boolean - true will set crow to devMode. false will set crow back to normal so that it logs to woodpecker. By default crow is not in devMode.
>
> ##### Usage
>
> `crow.setDevMode(true)`

#### info([data][, ...args])
> Sends an INFO log to woodpecker
>
> ##### Parameters
>
> Accepts arguments in the same manner as console.log.
>
> *data* - Any
>
> *...args* - Any
>
> ##### Usage
>
> `crow.info('An info log message.')`
>
> `crow.info('An info log message.', 'with multiple arguments')`
>
> `crow.info('An info log message.', 'with multiple arguments', ['of', 'different', 'types'])`

#### log([data][, ...args])
> Sends an INFO log to woodpecker. Alias of crow.info
>
> ##### Parameters
>
> Accepts arguments in the same manner as console.log.
>
> *data* - Any
>
> *...args* - Any
>
> ##### Usage
>
> `crow.log('An info log message.')`
>
> `crow.log('An info log message.', 'with multiple arguments')`
>
> `crow.log('An info log message.', 'with multiple arguments', ['of', 'different', 'types'])`

#### debug([data][, ...args])
> Sends an DEBUG log to woodpecker
>
> ##### Parameters
>
> Accepts arguments in the same manner as console.log.
>
> *data* - Any
>
> *...args* - Any
>
> ##### Usage
>
> `crow.debug('An debug log message.')`
>
> `crow.debug('An debug log message.', 'with multiple arguments')`
>
> `crow.debug('An debug log message.', 'with multiple arguments', ['of', 'different', 'types'])`

#### warn([data][, ...args])
> Sends an WARN log to woodpecker
>
> ##### Parameters
>
> Accepts arguments in the same manner as console.log.
>
> *data* - Any
>
> *...args* - Any
>
> ##### Usage
>
> `crow.warn('An warn log message.')`
>
> `crow.warn('An warn log message.', 'with multiple arguments')`
>
> `crow.warn('An warn log message.', 'with multiple arguments', ['of', 'different', 'types'])`

#### error([data][, ...args])
> Sends an ERROR log to woodpecker
>
> ##### Parameters
>
> Accepts arguments in the same manner as console.log.
>
> *data* - Any
> *...args* - Any
>
> ##### Usage
>
> `crow.error('An error log message.')`
>
> `crow.error('An error log message.', 'with multiple arguments')`
>
> `crow.error('An error log message.', 'with multiple arguments', ['of', 'different', 'types'])`

#### fatal([data][, ...args])
> Sends an FATAL log to woodpecker
>
> ##### Parameters
>
> Accepts arguments in the same manner as console.log.
>
> *data* - Any
> *...args* - Any
>
> ##### Usage
>
> `crow.fatal('An fatal log message.')`
>
> `crow.fatal('An fatal log message.', 'with multiple arguments')`
>
> `crow.fatal('An fatal log message.', 'with multiple arguments', ['of', 'different', 'types'])`

## Life Cycle Callback Functions

#### Node Only

#### crow.onSuccess = *callback*;
> Property that allows setting a callback function to call whenever crow receives a successful response from Woodpecker
>
> ##### Callback Arguments
>
> *data* - Object containing `statusCode`, `statusMessage`, `uri`, and `body` sent with request
>
> ##### Usage
>
> `crow.onSuccess = function(data){console.log(data)};`

#### crow.onFailure = *callback*;
> Property that allows setting a callback function to call whenever crow throws an error when attempting to make a request to Woodpecker
>
> ##### Callback Arguments
>
> *err* - error object with err.message including attempted payload message
>
> ##### Usage
>
> `crow.onFailure = function(err){console.error(err); console.log(err.message);};`
