import express from 'express';
import { create } from 'express-handlebars';
import { 
  home, 
  notFound, 
  about, 
  serverError, 
  newsletterSignup, 
  newsletterSignupProcess, 
  newsletterSignupThankYou,
  newsletter,
  api,
  vacationPhotoContestProcess,
  vacationPhotoThankYou,
  vacationPhoto,
  vacationPhotoAjax
} from './lib/handlers';
import multiparty from 'multiparty'

const app = express();
const port = process.env.PORT || 3000;
const hbs = create({
  defaultLayout: 'main',
  extname: 'handlebars',
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Konfiguracja silnika widoków Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
//Włączenie zapisywania widoków w pamięci podręcznej
// app.set('view cache', true);

app.get('/', home);
app.get('/about', about);

// obsługa formularzy typu fetch/JSON
app.get('/newsletter', newsletter)
app.post('/api/newsletter-signup', api.newsletterSignup)

// obsługa formularzy przesłanych przez przeglądarkę
app.get('/newsletter-signup', newsletterSignup)
app.post('/newsletter-signup/process', newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', newsletterSignupThankYou)

app.get('/contest/vacation-photo-ajax', vacationPhotoAjax)
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if(err) return res.status(500).send({error: err.message})

      api.vacationPhotoContest(req, res, fields, files)

  })
})

// obsługa formularzy z plikiem przez przeglądarkę
app.get('/contest/vacation-photo', vacationPhoto)
app.get('/contest/vacation-photo-thank-you', vacationPhotoThankYou)
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if(err) return res.status(500).send({error: err.message})

    vacationPhotoContestProcess(req, res, fields, files)
  })
})

//Niestandardowa strona 404
app.use(notFound);

//Niestandardowa storna 500
app.use(serverError);

app.listen(port, () => {
  console.log(
    `Express został uruchomiony pod adresem http://localhost:${port}`
  );
});

export default app;
