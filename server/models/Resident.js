
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Resident = new Schema({
   first_name: {
      type: String
   },
   middle_name: {
      type: String
   },
   last_name: {
      type: String
   },
   birth_date: {
      type: String
   },
   address: {
      type: String
   },
   civil_status: {
      type: String
   },
   email: {
      type: String
   },

   occupation: {
      type: String
   },
   phone_number: {
      type: Number
   },
   sex: {
      type: String
   },
   imageFile: {
      type: String
     
   },

}, {
   collection: 'residents'
})

module.exports = mongoose.model('Resident',Resident)
