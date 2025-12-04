import express from 'express'
import sql from './db.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Servidor funcionando!')
})

// 🔥 Teste de conexão
app.get('/test', async (req, res) => {
  try {
    const result = await sql`SELECT NOW()`
    res.json({ ok: true, time: result })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro de conexão' })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})
