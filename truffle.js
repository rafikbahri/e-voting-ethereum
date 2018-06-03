// Allows us to use ES6 in our migrations and tests.
//require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      
      gas:999999,
     from:"0x372280faffb2f5b419744e53f7dc6665d234db43",
      //from:"0x37ed844de6455ebdce575d154540a6ae356d77a2",
      network_id: '*' // Match any network id
    }
  }
}
