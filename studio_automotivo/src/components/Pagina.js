'use client'

import { Container, Nav, Navbar } from "react-bootstrap"


export default function Pagina({ titulo, children }) {

  return (
    <>
      {/* Barra de Navegação */}
    <Navbar style={{ backgroundColor: '#000000' }} data-bs-theme="dark">
    <Container>
    <Navbar.Brand href="/">
      <img
        src="/logo.png"
        alt="Logo"
        width="100"
        height="100" 
        className="d-inline-block align-top"
      />
    </Navbar.Brand>
    <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link href="/clientes">Cliente</Nav.Link>
        <Nav.Link href="/veiculos">Veículo</Nav.Link>
        <Nav.Link href="/servicos">Serviços</Nav.Link>
        <Nav.Link href="/agendamento">Agendamento</Nav.Link>
        <Nav.Link href="/profissionais">Profissional</Nav.Link>
    </Nav>
    </Container>
    </Navbar>
    
      {/* Barra de Titulo */}
      <div style={{ backgroundColor: '#bd0003' }} className="text-center text-white py-2">
        <h1>{titulo}</h1>
      </div>

      {/* Conteudo da Página */}
      <Container className="mt-2">
        {children}
      </Container>
    </>
  )
}
