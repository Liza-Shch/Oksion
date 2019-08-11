const HTTP = 'http://';
const LOCAL = '127.0.0.1:';
const PORT = '3000';

const BACKEND_URL = {
    SERVER: HTTP + (process.env.BACKEND_URL || LOCAL) + (process.env.PORT || PORT),
};

export default BACKEND_URL;