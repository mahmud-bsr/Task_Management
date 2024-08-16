const express = require('express');
const app = express();
require('./Database/dbconfig');
const userRoutes = require('./Routes/userRoutes');
const taskRoutes = require('./Routes/taskRoutes');
const projectRoutes = require('./Routes/projectRoutes');
const verifyToken = require('./Middleware/verifyToken');

app.use(express.json());
app.use('/user', userRoutes);
app.use('/task', verifyToken, taskRoutes);
app.use('/project', verifyToken, projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
