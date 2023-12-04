const express = require('express')
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

app.use(express.json())

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/student', studentRouter)
app.use('/subject', subjectRouter)
app.use('/rates', rateRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})