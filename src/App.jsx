import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { userAuthentication } from './hooks/userAuthentication';
import { AnimatePresence } from 'framer-motion';
import ReactGA from 'react-ga4';

// Importação das páginas
import Home from "./pages/Home/home";
import About from "./pages/About/about";
import Doubt from "./pages/Doubt/doubt";
import Tips from "./pages/Tips/tips";
import Login from "./pages/Login/login";
import UserPage from "./pages/UserPage/userPage";
import DogDetails from "./pages/DogDetails/dogDetails";
import DogPage from "./pages/DogPage/dogPage";
import Register from "./pages/Register/register";
import RecoverPassword from "./pages/RecoverPassword/recoverPassword";
import CommentsPage from './pages/CommentsPage/commentsPage';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import ProfileForm from './components/DogProfileForm/DogProfileForm';
import { DogProvider } from './components/DogContext/DogContext'; // Importa o DogProvider

function App() {
    const location = useLocation();

    // Monitoramento de visualizações de página no Google Analytics
    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: location.pathname });
    }, [location]);

    const [user, setUser] = useState(undefined);
    const { auth } = userAuthentication();

    // Verifica o estado de autenticação do usuário
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
        });
        return () => unsubscribe(); // Limpeza do listener
    }, [auth]);

    return (
        <AuthProvider value={{ user }}>
            <DogProvider> {/* Envolve a aplicação com o DogProvider */}
                <Navbar />
                <AnimatePresence mode='wait'>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/sobre" element={<About />} />
                        <Route path="/dicas" element={<Tips />} />
                        <Route path="/duvidas" element={<Doubt />} />
                        <Route path="/entrar" element={<Login />} />
                        <Route path="/usuario" element={<UserPage />} />
                        <Route path="/detalhes/:name" element={<DogDetails />} />
                        <Route path="/cachorros" element={<DogPage />} />
                        <Route path="/cadastro" element={<Register />} />
                        <Route path="/recuperarSenha" element={<RecoverPassword />} />
                        <Route path="/comentarios" element={<CommentsPage />} />
                        <Route path="/create-profile" element={<ProfileForm />} />
                    </Routes>
                </AnimatePresence>
                <Footer />
            </DogProvider>
        </AuthProvider>
    );
}

export default App;
