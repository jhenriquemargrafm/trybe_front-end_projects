import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import ComidasDetalhes from './pages/ComidasDetalhes';
import BebidasDetalhes from './pages/BebidasDetalhes';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidasIngredientes from './pages/ExplorarComidasIngredientes';
import ExplorarBebidasIngredientes from './pages/ExplorarBebidasIngredientes';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitaEmProgressoComida from './pages/ReceitaEmProgressoComida';
import ReceitaEmProgressoBebida from './pages/ReceitaEmProgressoBebida';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ ReceitaEmProgressoBebida }
        />
        <Route path="/bebidas/:id" component={ BebidasDetalhes } />
        <Route
          exact
          path="/comidas/:id/in-progress"
          component={ ReceitaEmProgressoComida }
        />
        <Route path="/comidas/:id" component={ ComidasDetalhes } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExplorarComidasArea }
        />
        <Route
          exact
          path="/explorar/bebidas/area"
          component={ NotFound }
        />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />

        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
