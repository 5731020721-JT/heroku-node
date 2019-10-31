
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
  const id = request.params.id
  let date_ob = new Date();
  var day = date_ob.getDate();
  var month = ((date_ob.getMonth() + 1));
  //pool.query('SELECT * FROM public_b1.retail_comp WHERE item_id = $1 and timestamp IN (SELECT max(timestamp) FROM public_b1.retail_comp) ORDER BY price ASC limit 1;', [id], (error, results) => {
  
  pool.query('SELECT * FROM public_b1.retail_comp AS RC INNER JOIN (SELECT itemcode,upsale FROM  public_b1.item_margin WHERE day=' + day + 'and month=' + month + '  ) DT ON DT.ItemCode=RC.item_id  WHERE item_id = $1 and timestamp IN (SELECT max(timestamp) FROM public_b1.retail_comp) ORDER BY price ASC limit 1;', [id], (error, results) => {
    //pool.query('SELECT * FROM public_b1.retail_comp WHERE item_id = $1;', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

  module.exports = {
    getProd,
  }
