
module.exports = {
    db: 'mongodb://localhost/quiz',
    sessionSecret: 'developmentSessionSecret',
    facebook: {
        clientID: '971685766183445',
        clientSecret: '94f9f747f7fc1e3d24f71d021ac69d63',
        callbackURL: 'http://localhost:8019/oauth/facebook/callback'
    },
    google: {
        clientID: '164970751730-sge6ocgnar7ungl6skdjrqk6v940rck9.apps.googleusercontent.com',
        clientSecret: 'fb_fL-YsFGp6BvZTjanBT3RC',
        callbackURL: 'http://localhost:8019/oauth/google/callback'
    }
};