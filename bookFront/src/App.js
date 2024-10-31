import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; 
import Register from './components/Register'; 

const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<LandingPage />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;






// src/App.js

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login'; // Asegúrate de tener este archivo
// import Register from './components/Register'; // Asegúrate de tener este archivo

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React, { Suspense, lazy } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login'; // Asegúrate de tener este archivo
// import Register from './components/Register'; // Asegúrate de tener este archivo

// // Carga diferida de los componentes
// const LandingPage = lazy(() => import('./pages/LandingPage'));
// const Dashboard = lazy(() => import('./pages/Dashboard'));

// function App() {
//   return (
//     <Router>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<LandingPage />} /> {/* Ruta para Landing Page */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} /> {/* Ruta para el Dashboard */}
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// }

// export default App;

// // src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login'; 
// import Register from './components/Register'; 
// import LandingPage from './pages/LandingPage';
// import Dashboard from './pages/Dashboard';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

//   // Función para iniciar sesión
//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login onLogin={handleLogin} />} />
//         <Route path="/register" element={<Register />} />
//         <Route 
//           path="/landing" 
//           element={isAuthenticated ? <LandingPage /> : <Navigate to="/" />} 
//         />
//         <Route 
//           path="/dashboard" 
//           element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
