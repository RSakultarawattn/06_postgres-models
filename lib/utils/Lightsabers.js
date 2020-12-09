const pool = require('../utils/pool');

module.exports = class Lightsaber {
    id;
    color;
    description;


    constructor(row) {
      this.id = row.id;
      this.color = row.color;
      this.description = row.description;
      

    static async insert({ color, description }) {
      const { rows } = await pool.query(
        'INSERT INTO lightsabers (color, description) VALUES ($1, $2, $3) RETURNING *',
        [color, description]
      );

      return new Lightsaber(rows[0]);
    }


    static async find() {
      const { rows } = await pool.query('SELECT * FROM lightsabers');

      return rows.map(row => new Lightsaber(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM lightsabers WHERE id=$1',
        [id]
      );
      if(!rows[0]) throw new Error(`No lightsaber with id ${id}`);
      return new Lightsaber(rows[0]);
    }

    static async update(id, { title, description, url }) {
      const { rows } = await pool.query(
        `UPDATE lightsabers 
        SET color=$1,
            description=$2,
        WHERE id=$3
        RETURNING *
      `,
        [color, description, id]
      );

      if(!rows[0]) throw new Error(`No lightsaber with id ${id} exists`);
      return new Lightsaber(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM lightsabers WHERE id=$1 RETURNING *',
        [id]
      );

      return new Lightsaber(rows[0]);
    }
};
