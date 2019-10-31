
const Pool = require('pg').Pool

const pool = new Pool({
  host : 'onedemo.metrosystems.co.th',
  user: 'postgres', 
  database: 'postgres',
  password: 'password',
  port: 80,
  ssl:false
  
})


const getProd = (request, response) => {
    pool.query('SELECT * FROM  public_b1.retail_comp;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getProd,
  }
