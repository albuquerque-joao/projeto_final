'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function HomePage() {


  const faculdades = JSON.parse(localStorage.getItem("faculdades")) || []
  const cursos = JSON.parse(localStorage.getItem("cursos")) || []
  const professores = JSON.parse(localStorage.getItem("professores")) || []
  const disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || []
  const alunos = JSON.parse(localStorage.getItem("alunos")) || []

  const lista = [
    {
      nome: "Cliente",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzpAVVx-vR_oFfpgcroouIx-aT42FMktTSzA&s", quantidade: faculdades.length,
      link: "/faculdades"
    },
    {
      nome: "Veículo",
      imagem: "https://garagem360.com.br/wp-content/uploads/2023/06/porsche-718.jpg", quantidade: cursos.length,
      link: "/cursos"
    },
    {
      nome: "Serviços",
      imagem: "https://protelim.com.br/wp-content/uploads/2024/04/image2-3.jpg", quantidade: professores.length,
      link: "/professores"
    },
    {
      nome: "Agendamento",
      imagem: "https://5vfpsa.tjba.jus.br/5vfpsa/wp-content/uploads/2022/05/agendamento-01.png", quantidade: disciplinas.length,
      link: ""
    },
    {
      nome: "Profissional",
      imagem: "https://peliculas.citeligarage.com.br/imagens/preco-de-lavagem-de-carro-especial.jpg", quantidade: alunos.length,
      link: "/alunos"
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