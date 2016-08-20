'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app, db) {

    var User = db.model('user');

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL,
        scope: 'profile,email',
        profileFields: ['id', 'emails', 'displayName']
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        console.log("FB PROFILE:",profile)
        User.findOne({
                where: {
                    facebook_id: profile.id
                }
            })
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return User.create({
                        facebook_id: profile.id,
                        email: profile.emails[0].value,
                        userName: profile.displayName
                    });
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Facebook authentication', err);
                done(err);
            })

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    var user;

    app.get('/auth/facebook',
        passport.authenticate('facebook', { scope: 'email' } )/*,*/
        // function (req, res, next) {
        //     user = req.query.uName;
        //     next();
        // }
    );

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect: '/login'}),
        function (req, res) {
            console.log('####### fb callback #######' + req.session.user )
            console.log('-------- passed through -------' + user)
            // User.update({userName: req.session.uName}, {where: {id: req.session.user.id}})
            res.redirect('/');
        });

};
