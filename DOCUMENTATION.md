# [doxdox-parser-dox](https://github.com/neogeek/doxdox-parser-dox) *1.0.5*

> Dox parser plugin for doxdox.


### index.js


#### formatStringForName(contents)  *private method*

Format string as name.




##### Parameters

- **contents** `String`   String to format.




##### Examples

```javascript
formatStringForName('module.exports.parser');
```


##### Returns


- `String`   Formatted string.



#### formatStringForParam(contents)  *private method*

Format string as param.




##### Parameters

- **contents** `String`   String to format.




##### Examples

```javascript
formatStringForParam('[optional param]');
```


##### Returns


- `String`   Formatted string.



#### formatStringForUID(contents)  *private method*

Format string as UID.




##### Parameters

- **contents** `String`   String to format.




##### Examples

```javascript
formatStringForUID('example string');
```


##### Returns


- `String`   Formatted string.



#### parser(content, filename) 

dox parser for doxdox.




##### Parameters

- **content** `String`   Contents of file.
- **filename** `String`   Name of file. Used to generate UIDs.




##### Examples

```javascript
parser(content, 'index.js').then(methods => console.log(methods));
```


##### Returns


- `Promise`   Promise with methods parsed from contents.




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
