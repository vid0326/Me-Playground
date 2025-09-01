// This file uses HTTP Basic Authentication. It does not use JWT.
import 'dotenv/config';

const auth = (req, res, next) => {
  // 1. Get the Authorization header from the request
  const authHeader = req.headers['authorization'];

  // 2. If no header is present, challenge the client to provide credentials
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication required.');
  }

  // 3. Decode the credentials from the header (sent as Base64)
  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const [username, password] = credentials;

  // 4. Compare the provided credentials with your environment variables
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // If they match, allow the request to continue
    return next();
  }

  // 5. If credentials do not match, deny access
  res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
  return res.status(401).send('Invalid credentials.');
};

export default auth;