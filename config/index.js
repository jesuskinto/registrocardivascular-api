require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    key: "5NLMmX8DuhrOaWrZfTbyxoyqM3k5WjFYvjXvGu5Ek7dPAPNgElFnrD8Z_pVtJq_ZrDYQvVqJyW58Ygvf0KhtqLPNu5nhs805Lzz4lBOdjGqRt8Y_CgBc3YKivVLNmoVTIFwD9-FFlgRYAra1uC2Q56Wp5egK37LphLle58Pn83U"
};

module.exports = { config };