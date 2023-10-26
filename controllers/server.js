const express = require("express");
const app = express();
const db = require(`../models/config`);
const port = 8080;

app.get('/', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM "user"');
      res.json(result.rows);
    } 
    catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  //delete
  app.delete('/delete/:id', async (req, res) => {
      const id = req.params.id; // Get the ID from the route parameter.
    
      try {
        const query = 'DELETE FROM student WHERE id = $1';
        const result = await db.query(query, [id]);
    
        if (result.rowCount === 1) {
          res.json({ message: 'Record deleted successfully' });
        } else {
          res.status(404).json({ message: 'Record not found' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
  });
  
  app.put('/employees/soft-delete/:id', async (req, res) => {
      const employeeId = req.params.id;
      const client = await pool.connect();
    
      try {
        const query = 'UPDATE employees SET is_active = FALSE WHERE id = $1';
        const values = [employeeId];
    
        await client.query(query, values);
        res.status(200).json({ message: `Employee with ID ${employeeId} soft deleted.` });
      } catch (error) {
        console.error('Error performing soft delete for employee:', error);
        res.status(500).json({ error: 'Internal server error' });
      } finally {
        client.release();
      }
  });

app.listen(port, () => {
    console.log(`server running in port ${port}`);
})