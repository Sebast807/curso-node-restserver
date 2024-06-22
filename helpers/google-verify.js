const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

async function googleVerify( token = '' ) {
   
    try {
   
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const { name, picture, email } = payload;

        return {
            name, img:picture, email
        }

    } catch (error) {
   
        console.error;
    }
}

module.exports = {
    googleVerify
}