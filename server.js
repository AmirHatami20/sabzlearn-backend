require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const articleRoutes = require('./routes/article');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const courseRoutes = require('./routes/course');
const commentRoutes = require('./routes/comment');
const sessionRoutes = require('./routes/session');
const offRoutes = require('./routes/off');
const userRoutes = require('./routes/user');

const app = express();

// ✅ CORS تنظیم دقیق
app.use(cors({
    origin: 'https://sabzlearn-frontend.vercel.app',
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// ✅ برای پیش‌درخواست‌ها (OPTIONS)
app.options("*", cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/article', articleRoutes);
app.use('/auth', authRoutes);
app.use('/category', categoryRoutes);
app.use('/course', courseRoutes);
app.use('/comment', commentRoutes);
app.use('/session', sessionRoutes);
app.use('/off', offRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on http://0.0.0.0:${PORT}`);
    });
});
