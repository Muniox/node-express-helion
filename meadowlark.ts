import express from 'express';
import { create } from 'express-handlebars';
import { home, notFound, about, serverError } from './lib/handlers';

const app = express();
const port = process.env.PORT || 3000;
const hbs = create({
  defaultLayout: 'main',
  extname: 'handlebars',
  partialsDir: ''  
});

app.use(express.static('public'));

//Konfiguracja silnika widoków Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
//Włączenie zapisywania widoków w pamięci podręcznej
app.set('view cache', true);

app.get('/', home);
app.get('/about', about);

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
