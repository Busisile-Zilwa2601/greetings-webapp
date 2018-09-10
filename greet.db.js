module.exports = function greetDB(pool){
    /*The following functions are for the database
  * Return all the names on the database
  * Return just a single name
  * Return updated name
  * Delete all the names in the database
  */
  async function all(){
    let names = await pool.query('SELECT * from greetings');
    return names.rows;
  }
  async function add(name, counter){
    let data = [
        name, counter
    ];
    let results = await pool.query('insert into greetings (name, counter) values ($1 , $2)', data);
    return results;
  }
  async function get(name){
    let results = await pool.query('SELECT * FROM greetings WHERE name = $1', [name]);
    if (results.rows.length > 0) {  
      return results.rows[0];
    }
    return null;
  }
  async function update(name){
    let results = await pool.query('select counter from greetings where name = $1', [name]);
    let person = results.rows[0];
    let myCounter = person.counter;
    myCounter++;
    return pool.query('UPDATE greetings SET counter = $1 WHERE name = $2', [myCounter, name]);
  }
  async function checkTable(name){
    let results = await pool.query('SELECT name FROM greetings WHERE name = $1', [name]);
    if(results.rows.length > 0){
      return true;
    }else{ return false;}  
  }
  async function countAll(){
    let names = await pool.query('SELECT count(*) FROM greetings');
    return names.rows[0].count;
  }
  async function deleteAll (){
    temp = {};
    return await pool.query('DELETE FROM greetings');
  }
  return{
      all,
      add,
      get,
      update,
      checkTable,
      countAll,
      deleteAll
  }
}