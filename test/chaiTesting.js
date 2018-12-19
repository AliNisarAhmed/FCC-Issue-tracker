/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server/server');

chai.use(chaiHttp);

describe('Functional Tests', function() {
  
    describe('POST /api/issues/{project} => object with issue data', function() {
      
      it('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'text');
          assert.equal(res.body.created_by, 'Functional Test - Every field filled in');
          assert.equal(res.body.assigned_to, 'Chai and Mocha');
          assert.equal(res.body.status_text, 'In QA');          
          done();
        });
      });
      
      it('Required fields filled in', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'Title', 
            issue_text: 'text',
            created_by: 'Functional Test - Required fields filled in'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, 'Title');
            assert.equal(res.body.issue_text, 'text');
            assert.equal(res.body.created_by, 'Functional Test - Required fields filled in');
            assert.isEmpty(res.body.assigned_to);
            assert.isEmpty(res.body.status_text);
            done();
          })
      });
      
      it('Missing required fields', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_text: 'text',
            created_by: 'Mocha'
          })
          .end(function(err, res) {
            assert.equal(res.status, 400);
            done();
          })
      });
      
    });
    
    describe('PUT /api/issues/{project} => text', function() {
      
      it('No body', function(done) {
        chai.request(server)
          .put('/api/issues/test')
          .send({
            _id: "5c1937ddcf49f53c0bc64436"
          })
          .end(function(err, res){
            assert.equal(res.status, 400);
            assert.equal(res.body.failed, 'no update field sent');
            done();
          });
      });
      
      it('One field to update', function(done) {
        chai.request(server)
          .put('/api/issues/test')
          .send({
            _id: "5c1937ddcf49f53c0bc64436",
            assigned_to: 'Samrah Akber'
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body._id, "5c1937ddcf49f53c0bc64436");
            assert.equal(res.body.assigned_to, 'Samrah Akber');
            done();
          });
      });
      
      it('Multiple fields to update', function(done) {
        chai.request(server)
          .put('/api/issues/test')
          .send({
            _id: "5c1937ddcf49f53c0bc64436",
            assigned_to: 'Samrah Akber',
            issue_text: 'This has been changed in testing'
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body._id, "5c1937ddcf49f53c0bc64436");
            assert.equal(res.body.assigned_to, 'Samrah Akber');
            assert.equal(res.body.issue_text, 'This has been changed in testing');
            assert.property(res.body, 'updated_on')
            done();
          })
      });
      
    });
    
    describe('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      it('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      it('One filter', function(done) {
        done();
      });
      
      it('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        done();
      });
      
    });
    
    describe('DELETE /api/issues/{project} => text', function() {
      
      it('No _id', function(done) {
        chai.request(server)
          .del('/api/issues/test')
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 400);
            done();
          });
      });
      
      it('Valid _id', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'Title', 
            issue_text: 'text',
            created_by: 'Functional Test - Required fields filled in'
          })
          .end(function(err, res) {
            let issue = res.body;
            chai.request(server)
              .del('/api/issues/test')
              .send({
                _id: issue._id
              })
              .end(function(error, response) {
                assert.equal(response.status, 200);
                assert.equal(response.body.success, `deleted ${issue._id}`);
                done();
              })
          })
      });
      
    });

});
