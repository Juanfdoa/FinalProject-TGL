const express = require('express')
const cors = require('cors');
const sequelize = require('./src/database/sequalize')
const userRouter = require('./src/routes/userRoute')
const authRouter = require('./src/routes/authRoute')
const studentRouter = require('./src/routes/studentRoute')
const subjectRouter = require('./src/routes/subjectRoute')
const rateRouter = require('./src/routes/rateRoute')
const app = express()
const port = 3000

async function sincronizarBD() {
  try {
    await sequelize.sync();
    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

sincronizarBD();

app.use(cors());
app.use(express.json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/students', studentRouter)
app.use('/api/v1/subjects', subjectRouter)
app.use('/api/v1/rates', rateRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})