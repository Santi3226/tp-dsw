import { BrowserRouter, Routes, Route } from "react-router";
import "./styles/App.css";
import MainLayout from "./components/layouts/MainLayout";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App

/*
JWT Json web token
JWT crea un token que se decripta con una contraseña en el bend tipo base64
JWT-decode libreria para manejar los token

En el authprovider:

const response = await axiosInterceptor creo/fetch/axios.post('routa del login', userData) ESTO VINCULA FRONT Y BACK
localStorage.setItem('token', response.data.token) ESTO GUARDA LA SESION EN LA CACHE DEL BROWSER
seIsAuthenticated(true)
setUser(getUser(response.data.token)) GETUSER ES UNA FUNCION CON EL DECRIPTADOR QUE PASA EN LIMPIO LOS DATOS
aca se verifica la expiracion tambien con la diferencia de Date.now()/1000 > tokenDecodeado.exp


Integrar login, debe volver solo un token
Decodear JWT con DecodeJWT por ej
Persistir JWT en localStorage
Agregar roles a las routes protected
Ocultar items a los no autorizados
Verificar expiracion del token jwt
Interceptor axios, chequear en backnd

Agregar authProvider
Fetch o Axios para peticiones 

*/