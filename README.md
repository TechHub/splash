example config `deployConfig.js`

```js
module.exports = {
  staging: {
    host: '123',
    user: 'ubuntu',
    keyLocation: '/Users/mattia/.ssh/xxx.pem',
    remotePath: '/var/www/techhub.com/splash'
  },
  production: {
    host: '123',
    user: 'ubuntu',
    keyLocation: '/Users/mattia/.ssh/id_rsa',
    remotePath: '/var/www/techhub.com/splash'
  }
}
```