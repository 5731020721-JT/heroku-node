
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


  const getProdById3 = (request, response) => {
    const id = request.params.id
    pool.query('SELECT * FROM public_b1.retail_comp WHERE item_id = $1 and timestamp IN (SELECT max(timestamp) FROM public_b1.retail_comp) ORDER BY price ASC limit 1;', [id], (error, results) => {
    //pool.query('SELECT * FROM public_b1.retail_comp WHERE item_id = $1;', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  
  const getProdById4 = (request, response) => {
    const id = request.params.id
    pool.query('SELECT * FROM public_b1.retail_comp WHERE timestamp IN (SELECT max(timestamp) FROM public_b1.retail_comp);', [id], (error, results) => {
    //pool.query('SELECT * FROM public_b1.retail_comp WHERE item_id = $1;', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  

  const getProdById2 = (request, response) => {
    const id = request.params.id
    pool.query('SELECT * FROM public_b1.retail_comp WHERE item_id = $1  and timestamp IN (SELECT max(timestamp) FROM public_b1.retail_comp);', [id], (error, results) => {
    //pool.query('SELECT * FROM public_b1.retail_comp WHERE item_id = $1;', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  // insert buskets
  const insertBusket = (request, response) => {
    const item_code = request.body.item_code
    const userid = request.body.userid
    const price = request.body.price
    const productname = request.body.productname
    
    pool.query('SELECT * FROM public_b1.busket WHERE item_id = $1 and userid = $2;', [item_code],[userid], (error, results1) => {
      if (error) {
        throw error
      }
      if(results1 != null){
        var number = results1.rows.number
        number = number+1
        pool.query('UPDATE public_b1.busket SET number = $1 WHERE item_id = $1 and userid = $2;', [number], (error, results2) => {})
    }
    else{
      pool.query('INSERT INTO public_b1.busket(item_code,userid,price,productname,number) VALUES ($1, $2,$3,$4,1);', [item_code],[userid],[price],[productname], (error, results3) => {})
    }
      response.status(200).json(results3.rows)
    })
  }





  module.exports = {
    getProd,
    getProdById3,
    getProdById4,
    getProdById2
  }
