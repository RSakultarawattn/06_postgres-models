

const app = express();
const Lightsaber = require('../Lightsabers');
const Lightsabers = require('../Lightsabers')

const app = express();

app.use(express.json());





app.post('/api/v1/lightsabers', (req, res, next) => {
  Lightsaber
    .insert(req.body)
    .then(lightsaber => res.send(lightsaber))
    .catch(next);
});


app.get('/api/v1/lightsabers', (res) => {
  Lightsaber
    .find()
    .then(lightsaber => res.send(lightsaber));
});

app.get('/api/v1/lightsabers/:id', (req, res, next) => {
  Lightsaber
    .findById(req.params.id)
    .then(lightsaber => res.send(lightsaber))
    .catch(next);

});


app.put('/api/v1/lightsabers/:id', (req, res, next) => {
  Lightsaber  
    .update(req.params.id, req.body)
    .then(lightsaber => res.send(lightsaber))
    .catch(next);
});


app.delete('/api/v1/lightsabers/:id', (req, res) => {
  Lightsaber
    .delete(req.params.id)
    .then(lightsaber => res.send(lightsaber))
    
  
});
