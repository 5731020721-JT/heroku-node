
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
    //const id = request.params.id
    pool.query('SELECT * FROM public_b1.retail_comp WHERE timestamp IN (SELECT max(timestamp) FROM public_b1.retail_comp);',(error, results) => {
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
    
    pool.query('SELECT * FROM public_b1.buskets WHERE item_code = $1 and user_id = $2;', [item_code,userid], (error, results1) => {
      if (error) {
        throw error
      }
      //response.send(results1.rows[0])
      if(results1.rows.length > 0){
        var number = results1.rows[0].number
        number =  parseInt(number) + 1
        pool.query('UPDATE public_b1.buskets SET number = $1 WHERE item_code = $2 and user_id = $3;', [number,item_code,userid], (error, results2) => {})
        response.status(200).send('update')
      }
    else{
      pool.query('INSERT INTO public_b1.buskets (item_code,user_id,price,item_name,number) VALUES ($1, $2, $3, $4, 1)', [item_code, userid,price,productname], (error, results3) => {
    if (error) {
      throw error
    }else{
      response.status(200).send('Added')
    }
    })
   }
   })
  }

 





  module.exports = {
    getProd,
    getProdById3,
    getProdById4,
    getProdById2,
    insertBusket
  }
