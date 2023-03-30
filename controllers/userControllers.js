import pool from '../db.js';

const getAllUsers = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users'); // -> returns a Promise object
    res.json(rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [user],
    } = await pool.query(`SELECT * FROM users WHERE id=${id}`);
    if (!user) throw new Error('User not found!');

    return res.json(user);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, age } = req.body;
    if (!first_name || !last_name || !age)
      throw new Error('Please provide all fields');

    // first_name = '; SELECT password FROM users;'
    // `INSERT INTO users (first_name, last_name, age) VALUES (; SELECT password FROM users;, ${last_name}, ${age}) RETURNING *`

    const { rows } = await pool.query(
      `INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *`,
      [first_name, last_name, age]
    );

    return res.json(rows);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export { getAllUsers, getOneUser, createUser };
