const fs = require('fs');
const request = require('supertest');
const app = require('./sql/app.js');
const pool = require('./pool');
const Lightsaber = require('./Lightsabers');




describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./lib/utils/sql/setup.sql', 'utf-8'));
  });
  
  afterAll(() => {
    return pool.end();
  });
  
  it('creates a lightsaber via POST', async() => {
    const response = await request(app)
      .post('/api/v1/lightsabers')
      .send({
        color: 'red',
        description: 'sith'
        
      });
  
    expect(response.body).toEqual({
      id: '1',
      color: 'red',
      description: 'sith'

    });
  });

  it('finds a lightsaber by id via GET', async() => {
    const lightsaber = await Lightsaber.insert({ color: 'purple', description: 'windu' });
    
    const response = await request(app)
      .get(`/api/v1/lightsabers/${lightsaber.id}`);
    
    expect(response.body).toEqual(lightsaber);
  });
    
  it('updates a lightsaber by id via PUT', async() => {
    const lightsaber = await Lightsaber.insert({ color: 'blue', description: 'jedi' });
    
    const response = await request(app)
      .put(`/api/v1/lightsabers/${lightsaber.id}`)
      .send({
        color: 'green',
        description: 'luke'
        
      });
    
    expect(response.body).toEqual({
      ...lightsaber,
      color: 'green',
      description: 'luke'
    });
  });

  it('removes a lightsaber by id via DELETE', async() => {
    const lightsaber = await Lightsaber.insert({ color: 'blue', description: 'jedi' });
    
    const response = await request(app)
      .delete(`/api/v1/lightsabers/${lightsaber.id}`);
    
    expect(response.body).toEqual(lightsaber);

  });
});
  
