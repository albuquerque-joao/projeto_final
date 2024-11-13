'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function HomePage() {

  const clientes = JSON.parse(localStorage.getItem("clientes")) || []
  const veiculos = JSON.parse(localStorage.getItem("veiculos")) || []
  const servicos = JSON.parse(localStorage.getItem("servicos")) || []
  const agendamento = JSON.parse(localStorage.getItem("agendamentos")) || []
  const profissionais = JSON.parse(localStorage.getItem("profissionais")) || []
  const historicos = JSON.parse(localStorage.getItem("historicos")) || []

  const lista = [
    {
      nome: "Clientes",
      imagem: "https://doutorie.com.br/blog/wp-content/uploads/2023/04/feliz-reparador-de-automoveis-se-comunicando-com-o-jovem-casal-em-uma-oficina.jpg", quantidade: clientes.length,
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
      imagem: "https://prodegesp.paginas.ufsc.br/files/2021/12/agendamento.png", quantidade: agendamento.length,
      link: "/agendamento"
    },
    {
      nome: "Profissionais",
      imagem: "https://peliculas.citeligarage.com.br/imagens/preco-de-lavagem-de-carro-especial.jpg", quantidade: profissionais.length,
      link: "profissionais"
    },
    {
      nome: "Histórico do Serviço",
      imagem: "https://viacarreira.com/wp-content/uploads/2023/03/como-fazer-um-relatorio-academico.png", quantidade: historicos.length,
      link: "historico"
    },
  ]

  return (
    <Pagina titulo={"Studio Automotivo"}>

<Row md={2}>
  {lista.map(item => (
    <Col className='py-2'>
      <Card style={{ height: '100%' }}>
        <Card.Img src={item.imagem} style={{ height: '250px', objectFit: 'cover' }} />
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
