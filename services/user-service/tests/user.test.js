const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

describe('User Service', () => {
  
  let token;

  // Test de l'inscription
  it('should register a new user', (done) => {
    chai.request(app)
      .post('/users/register')
      .send({
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').eql('Utilisateur enregistré avec succès');
        done();
      });
  });

  // Test de la récupération de l'utilisateur
  it('should get user by ID', (done) => {
    chai.request(app)
      .get('/users/<userId>')  // Remplace <userId> par un vrai ID
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('username').eql('testuser');
        done();
      });
  });

});
