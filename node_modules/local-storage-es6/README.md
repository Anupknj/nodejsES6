<img width="100" src="https://raw.githubusercontent.com/feross/standard/master/sticker.png" />

Securely store ```JSON``` data and normal data

Used in [PotatoDetection](https://npmjs.com/package/potato-detection)

## Installation ##
```
npm install --save local-storage-es6
```

## Setup ##
* Import the package
* ```path: String``` the path to your cache folder
* ```key: String``` secret key as salt for encrypting
* ```mkdir: Boolean``` set to ```true``` if the module should check if the cache folder exists, and if it doesn't it wil create the directory
* ```encryptFileName: Boolean``` set to ```true``` if the module should encrypt the file name of each cache
* ```encryptFileContent: Boolean``` set to ```true``` if the module should encrypt your file contents of each cache

### ES6  ###
```javascript
import LocalStorage from 'local-storage-es6'

const ... = new LocalStorage({
  path: './cache',
  key: '1234',
  mkdir: true,
  encryptFileName: true,
  encryptFileContent: false
})
```
### CommonJS ###
```javascript
const LocalStorage = require('local-storage-es6')

const ... = new LocalStorage({
  path: './cache',
  key: '1234',
  mkdir: true,
  encryptFileName: true,
  encryptFileContent: false
})
```

## API ##

### write(key, data, callback) ###
Write data to cache asynchronously and callback a function with the given data written

```throws``` error

```returns``` data written

```javascript
var obj = {name: 'KitKat', owner: 'Nestle'}
LocalStorage.write('chocolate', obj, (data) => {
  ...
})
```

### writeSync(key, data) ###
Write data synchronously and return the given data written

```throws``` error

```returns``` data written

```javascript
var obj = {name: 'KitKat', age: 21}
var cached = LocalStorage.write('chocolate', obj)
console.log(cached)
```

### read(key, callback) ###
Read data asynchronously and callback a function with the data

```throws``` error

```returns``` data from cache

```javascript
LocalStorage.read('chocolate', (data) => {
  ...
})
```

### readSync(key) ###
Read data synchronously and callback a function with the data

```throws``` error

```returns``` data from cache

```javascript
const data = LocalStorage.readSync('chocolate')
...
```

### exists(key) ###
Checks if a cache exists

```returns``` promise

```javascript
LocalStorage.exists('chocolate')
  .then(() => {
    ...
  })
  .catch(() => {
    var obj = {name: 'KitKat', owner: 'Nestle'}
    LocalStorage.writeSync('chocolate', obj)
  })
```

### existsThenRead(key) ###
Checks if a cache exists, and if it does, it will return the data in the **Promise** resolve

```returns``` promise and data

```javascript
LocalStorage.existsThenRead('chocoloate')
  .then(data => {
      ...
  })
  .catch(() => {
      ...
  })
```

### isNotExpired(key, maxAge)
Checks if a cache exists and is not expired

```maxAge``` checks if the cache is older than x minutes
  * **default** value is 3 hours

```returns``` promise

```javascript
LocalStorage.isNotExpired('chocolate')
  .then(() => {
    ...
  })
  .catch(res => {
    console.log(res) // 'File is x minutes too old'
    var obj = {name: 'KitKat', owner: 'Nestle'}
    LocalStorage.writeSync('chocolate', obj)
  })
```

### isNotExpiredThenRead(key, maxAge)
Checks if a cache exists and is not expired then reads the data and returns it

```maxAge``` checks if the cache is older than x minutes
  * **default** value is 3 hours

```returns``` promise and data

```javascript
LocalStorage.isNotExpiredThenRead('chocolate')
  .then(data => {
    ...
  })
  .catch(res => {
    console.log(res) // 'File is x minutes too old'
    var obj = {name: 'KitKat', owner: 'Nestle'}
    LocalStorage.writeSync('chocolate', obj)
  })
```

### getPath(key) ###
```throws``` error

```returns``` the given path and hashed md5 filename for the cache

```javascript
const path = LocalStorage.getPath('chocolate')
```

### purge(key) ###
Deletes a cache asynchronously

```throws error```

```javascript
LocalStorage.purge('chocolate', () => {
  ...
})
```

### purgeSync(key) ###
Deletes a cache synchronously

```throws error```

```javascript
LocalStorage.purgeSync('chocolate')
```

### trash() ###
Clears the entire cache folder asynchronously

```throws error```

```javascript
LocalStorage.trash(() => {
  ...
})
```

### trashSync() ###
Clears the entire cache folder synchronously

```throws error```

```javascript
LocalStorage.trashSync()
```

### getSize(callback) ###
```returns``` the size of the cache folder in megabytes asynchronously

```throws error```

```javascript
LocalStorage.getSize(size => {
  ...
})
```
