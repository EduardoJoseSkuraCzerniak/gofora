// --------------------------------------------------------------------------------------
// Arquivo: gofora/cegs-app/src/App.jsx
// Descrição: Componente Principal da Aplicação React com Rotas Configuradas
// Data: 28.09.2025 
// Última modificação: 28.09.2025 
// --------------------------------------------------------------------------------------

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import CreateGroup from "./pages/CreateGroup"
import Participants from "./pages/Participants"
import Register from './pages/Register'
import Login from './pages/Login'
import MyGroups from './pages/MyGroups'
import GroupDetails from "./pages/GroupDetails"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cegs" element={<Dashboard />} />
        <Route path="/cegs/create" element={<CreateGroup />} />
        <Route path="/cegs/:id/participantes" element={<Participants />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meus-grupos" element={<MyGroups />} />
      <Route path="/cegs/:id/detalhes" element={<GroupDetails />} />
      </Routes>
    </Router>
  )
}
