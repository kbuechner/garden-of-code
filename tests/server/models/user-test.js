var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var User = db.model('user');

describe('User model', function () {

	beforeEach('Sync DB', function () {
		return db.sync({ force: true });
	});

	describe('password encryption', function () {

		describe('generateSalt method', function () {

			it('should exist', function () {
				expect(User.generateSalt).to.be.a('function');
			});
			it('should return a random string basically', function () {
				expect(User.generateSalt()).to.be.a('string');
			});
		});

		describe('encryptPassword', function () {

			var cryptoStub;
			var hashUpdateSpy;
			var hashDigestStub;
			beforeEach(function () {
				cryptoStub = sinon.stub(require('crypto'), 'createHash');

				hashUpdateSpy = sinon.spy();
				hashDigestStub = sinon.stub();

				cryptoStub.returns({
					update: hashUpdateSpy,
					digest: hashDigestStub
				});
			});

			afterEach(function () {
				cryptoStub.restore();
			});

			it('should exist', function () {
				expect(User.encryptPassword).to.be.a('function');
			});

			it('should call crypto.createHash with "sha1"', function () {
				User.encryptPassword('asldkjf', 'asd08uf2j');
				expect(cryptoStub.calledWith('sha1')).to.be.ok;
			});

			it('should call hash.update with the first and second argument', function () {
				var pass = 'testing';
				var salt = '1093jf10j23ej===12j';

				User.encryptPassword(pass, salt);

				expect(hashUpdateSpy.getCall(0).args[0]).to.be.equal(pass);
				expect(hashUpdateSpy.getCall(1).args[0]).to.be.equal(salt);

			});

			it('should call hash.digest with hex and return the result', function () {
				var x = {};
				hashDigestStub.returns(x);
				var e = User.encryptPassword('sdlkfj', 'asldkjflksf');

				expect(hashDigestStub.calledWith('hex')).to.be.ok;
				expect(e).to.be.equal(x);

			});

		});

		describe('on creation', function () {

			var encryptSpy;
			var saltSpy;
			var createUser = function () {
				return User.create({ email: 'obama@gmail.com', userName: 'MrPotus', password: 'potus' });
			};

			beforeEach(function () {
				encryptSpy = sinon.spy(User, 'encryptPassword');
				saltSpy = sinon.spy(User, 'generateSalt');
			});

			afterEach(function () {
				encryptSpy.restore();
				saltSpy.restore();
			});

			it('should call User.encryptPassword with the given password and generated salt', function (done) {
				createUser().then(function () {
					var generatedSalt = saltSpy.getCall(0).returnValue;
					expect(encryptSpy.calledWith('potus', generatedSalt)).to.be.ok;
					done();
				});
			});

			it('should set user.salt to the generated salt', function (done) {
				createUser().then(function (user) {
					var generatedSalt = saltSpy.getCall(0).returnValue;
					expect(user.salt).to.be.equal(generatedSalt);
					done();
				});
			});

			it('should set user.password to the encrypted password', function (done) {
				createUser().then(function (user) {
					var createdPassword = encryptSpy.getCall(0).returnValue;
					expect(user.password).to.be.equal(createdPassword);
					done();
				});
			});

		});

		describe('sanitize method', function () {

			var createUser = function () {
				return User.create({ email: 'obama@gmail.com', password: 'potus', userName: 'MrPotus' });
			};

			it('should remove sensitive information from a user object', function () {
				createUser().then(function (user) {
					var sanitizedUser = user.sanitize();
					expect(user.password).to.be.ok;
					expect(user.salt).to.be.ok;
					expect(sanitizedUser.password).to.be.undefined;
					expect(sanitizedUser.salt).to.be.undefined;
				});
			});
		});

	});

	describe('email creation and validation', function () {

		var buildBadEmail = User.build({ email: 'obamamail.com', password: 'potus', userName: 'MrPotus', name: 'Mr. President'});
		var buildWithNoEmail = User.build({ password: 'potus', name: 'Mr. President', userName: 'MrPotus'});
		var buildWithExistingEmail = User.build({ email: 'obama@gmail.com',userName: 'MrPotus', password: '123', name: 'What Ever'});

		beforeEach(function () {
			return User.create({ email: 'obama@gmail.com', userName: 'MrPotus', password: 'potus', name: 'Mr. President'});
		})


		it('rejects a bad email',
			function (){
				return buildBadEmail.validate()
				.then(function(response){
					expect(response).to.be.an.instanceOf(Error);
				})
			}
		);

		it('email cannot be null', function () {
			return buildWithNoEmail.validate()
			.then(function(response) {
				expect(response).to.be.an.instanceOf(Error);
			})
			})

		it('email has to be unique', function () {
			return buildWithExistingEmail.save()
			.then(function (result) {
				expect(result).to.not.exist;
			})
			.catch(function (err) {
				expect(err).to.exist;
				expect(err.errors[0].message).to.equal('email must be unique')
			})
		})


   	describe('username creation and validation', function(){

   		var buildWithNoUser = User.build({ password: 'potus', name: 'Mr. President', email: 'obamamail.com'});
   		var buildWithExistingUser = User.build({ email: 'thebama@gmail.com', userName: 'MrPotus', password: '123' });

   		it('username cannot be null', function () {
   			return buildWithNoUser.validate()
   			.then(function(response) {
   				expect(response).to.be.an.instanceOf(Error);
   			})
   			.catch(function (err) {
   				expect(err).to.exist;
               expect(err.errors[0].message).to.equal('userName cannot be null')
   			})
   		})

   		it('username has to be unique', function () {
   			return buildWithExistingUser.save()
   			.then(function (result) {
   				expect(result).to.not.exist;
   			})
   			.catch(function (err) {
   				expect(err).to.exist;
   				expect(err.errors[0].message).to.equal('userName must be unique')
   			})
   		})
   	});
   });

});
