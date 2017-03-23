# Crow

A JS logging client meant to be used with [Woodpecker](http://helios-stash.heliosinteractive.com:7991/projects/HI/repos/woodpecker/browse).

## Installation 
```$xslt
npm install @helios-interactive/crow --save
```
## Usage

#### Node / Commonjs

```
var crow = require("crow");
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
import { crow } from 'crow';

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

#### info(message)
> Sends an INFO log to woodpecker
>
> ##### Parameters 
>
> *message* - The log message to be sent.
>
> ##### Usage
>
> `crow.info('An info log message.')`

#### log(message)
> Sends an INFO log to woodpecker. Alias of crow.info
>
> ##### Parameters 
>
> *message* - The log message to be sent.
>
> ##### Usage
>
> `crow.log('An info log message.')`

#### debug(message)
> Sends an DEBUG log to woodpecker
> ##### Parameters 
> *message* - The log message to be sent.
> ##### Usage
> `crow.debug('An debug log message.')`

#### warn(message)
> Sends an WARN log to woodpecker
>
> ##### Parameters 
>
> *message* - The log message to be sent.
>
> ##### Usage
>
> `crow.warn('An warn log message.')`

#### error(message)
> Sends an ERROR log to woodpecker
>
> ##### Parameters 
>
> *message* - The log message to be sent.
>
> ##### Usage
>
> `crow.error('An error log message.')`

#### fatal(message)
> Sends an FATAL log to woodpecker
>
> ##### Parameters 
>
> *message* - The log message to be sent.
>
> ##### Usage
>
> `crow.fatal('An fatal log message.')`

