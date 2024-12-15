import express from 'express'
import { create } from 'express-handlebars'

const app = express()
const port = process.env.PORT || 3000
const hbs = create({ defaultLayout: 'main', extname: 'handlebars'})

app.use(express.static('public'))

//Konfiguracja silnika widoków Handlebars
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

const fortunes = [
    "Pokonaj swoje lęki abo one pokonają ciebie.",
    "Rzeki potrzebują źródeł.",
    'Nie obawiaj się nieznanego',
    "Oczekuj przyjemnej niespodzianki.",
    "Zawsze szukaj prostego rozwiązania."
]

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', { fortune: randomFortune })
})

//Niestandardowa strona 404
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

//Niestandarowa storna 500
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => {
    console.log(`Express został uruchomiony pod adresem http://localhost:${port}`)
})
