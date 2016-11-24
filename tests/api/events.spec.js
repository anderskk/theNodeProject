import chai from 'chai'
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import Event from '../../src/api/event/model/Event';
import server from  '../../server';

const endpointBase = '/api/events';
const should =  chai.should();

mongoose.Promise = Promise;

chai.use(chaiHttp);

describe('Events', () => {

    beforeEach((done) => {
        Event.remove({}, (err) => {
            done();
        });
    });

    describe('/GET events', () => {
        it('it should GET all the events', (done) => {
            chai.request(server)
                .get(endpointBase)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST events', () => {

        it ('it should create a new event', (done) => {

          const event = {
              event_name : 'test event',
              description: "Et kurs for alle som er interessert i Node-utvikling",
              image : "data:image/jpeg;base64,/9j/4QUmRXhpZgAASUkqABAAAAAAAAAAAAAAAAIADgE",
              capacity : 32,
              event_date : 1490851235792,
              participation_deadline: 1490851235791,
              event_status: "active",
              event_type: "workshop",
              event_location: "MELKEVEIEN, BG14",
              hosts:  ["Jørgen Brække", "Sean Scully"]
          };

          chai.request(server)
              .post(endpointBase)
              .set('content-type', 'application/x-www-form-urlencoded')
              .send(event)
              .end( (err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  Object.keys(event).forEach( (key) => {
                      res.body.should.have.property(key);
                  });
                  done();
              })
        })
    });

});
