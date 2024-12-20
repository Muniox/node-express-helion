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
  api
} from './lib/handlers';

const app = express();
const port = process.env.PORT || 3000;
const hbs = create({
  defaultLayout: 'main',
  extname: 'handlebars',
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

//Konfiguracja silnika widoków Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
//Włączenie zapisywania widoków w pamięci podręcznej
// app.set('view cache', true);

app.get('/', home);
app.get('/about', about);

// obsługa formularzy przesłanych przez przeglądarkę
app.get('/newsletter-signup', newsletterSignup)
app.post('/newsletter-signup/process', newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', newsletterSignupThankYou)

// obsługa formularzy typu fetch/JSON
app.get('/newsletter', newsletter)
app.post('/api/newsletter-signup', api.newsletterSignup)

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
