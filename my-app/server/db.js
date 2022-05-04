const mongoose = require('mongoose');

var db = 'mongodb://localhost:27017/Clients';

mongoose.connect(db,
  { useNewUrlParser:true,
    useUnifiedTopology:true,
  })
  .then( () => {
    console.log('connected to MongoDB');
  })
  .catch( err => {
    console.log(err);
  });

let clientSchema = mongoose.Schema({
  name: String,
  lastDrink: String,
  blackList: [String],
  favorites: [String],
  visits: Number
});

const Clients = mongoose.models.Clients || mongoose.model('Clients', clientSchema);

// Helper Functions
module.exports.createClient = (clientName) => {
  return new Clients({
    name: clientName,
    lastDrink: '',
    blackList: [],
    favorites: [],
    visits: 0
  }).save();
}
// createClient('Tin').then(res => console.log(res))

module.exports.getClient = (clientName) => {
  return Clients.find({name: clientName})
}
// getClient('Jin').then((data) => console.log(data[0]));

module.exports.blackListDrink = (clientName, drink) => {
  return Clients.updateOne(
    { name: clientName},
    { $push: {blackList: drink}}
  )
}
// blackListDrink('Tin', 'beer').then(res => console.log(res));

module.exports.incVisits = (clientName) => {
  return Clients.updateOne({name: clientName}, {$inc:{visits: 1}});
}
// incVisits('Tin').then(res=>console.log(res))

module.exports.saveDrink = (clientName, drink) => {
  return Clients.updateOne(
    {name: clientName},
    {$set: {lastDrink: drink}}
  )
}
// saveDrink('Lee', 'AMF').then(res => console.log(res));

module.exports.getDrink = (clientName) => {
  return Clients.find({name: clientName}, {lastDrink:1,_id:0});
}
// getDrink('Jin').then(res => console.log(res))
