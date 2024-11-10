'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function HomePage() {

  const clientes = JSON.parse(localStorage.getItem("clientes")) || []
  const veiculos = JSON.parse(localStorage.getItem("veiculos")) || []
  const servicos = JSON.parse(localStorage.getItem("servicos")) || []
  const agendamento = JSON.parse(localStorage.getItem("agendamento")) || []
  const profissionais = JSON.parse(localStorage.getItem("profissionais")) || []

  const lista = [
    {
      nome: "Clientes",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzpAVVx-vR_oFfpgcroouIx-aT42FMktTSzA&s", quantidade: clientes.length,
      link: "/clientes"
    },
    {
      nome: "Veículos",
      imagem: "https://garagem360.com.br/wp-content/uploads/2023/06/porsche-718.jpg", quantidade: veiculos.length,
      link: "veiculos"
    },
    {
      nome: "Serviços",
      imagem: "https://protelim.com.br/wp-content/uploads/2024/04/image2-3.jpg", quantidade: servicos.length,
      link: "servicos"
    },
    {
      nome: "Agendamentos",
      imagem: "https://5vfpsa.tjba.jus.br/5vfpsa/wp-content/uploads/2022/05/agendamento-01.png", quantidade: agendamento.length,
      link: "/agendamento"
    },
    {
      nome: "profissionais",
      imagem: "https://peliculas.citeligarage.com.br/imagens/preco-de-lavagem-de-carro-especial.jpg", quantidade: profissionais.length,
      link: "profissionais"
    },
  ]

  return (
    <Pagina titulo={"Studio Automotivo"}>

    <Row md={4}>
      {lista.map(item => (
          <Col className='py-2'>
            <Card style={{height: '100%'}}>
              <Card.Img src={item.imagem} style={{ height: '100%' }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button href={item.link}>Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
    </Row>

    </Pagina>
  )
} 