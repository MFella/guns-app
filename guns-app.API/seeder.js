//import seeder from 'mongoose-seed';
const seeder = require('mongoose-seed');
const config = require('./config/database');
const data = require('./data/gunsToSeed.json');

seeder.connect(config.database, () => {
    seeder.loadModels([
        './models/gun.model'
    ]);
    seeder.clearModels(['gun']);
    seeder.populateModels(data, (err, done) => {

        if (err) throw err;

        if(done)
        {
            return console.log('Seeded!', done);
        }
        seeder.disconnect();
    })
})