'use client'
import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function servicosPage() {

  const [servicos, setservicos] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const servicosLocalStorage = JSON.parse(localStorage.getItem("servicos")) || []
    // guarda a lista no estado
    setservicos(servicosLocalStorage)
    console.log(servicosLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(servicos) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o servicos ${servicos.nome}?`)) {
      // filtra a lista antiga removando o servicos recebido
      const novaLista = servicos.filter(item => item.id !== servicos.id)
      // grava no localStorage a nova lista
      localStorage.setItem('servicos', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setservicos(novaLista)
      alert("servicos excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Painel de serviços"}>
      <div className='text-end mb-2'>
        <Button href='servicos/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os servicos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tipo do Serviço</th>
            <th>Descrição do serviço</th>
            <th>Preço</th>
            <th>Duração estimada</th>
            <th>Materiais necessários</th>
            <th>Equipamentos utilizados</th>
            <th>Profissional responsável</th>
            <th>Frequência recomendada</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map(servicos => {
            return (
              <tr>
                <td>{servicos.nomeServico}</td>
                <td>{servicos.descricaoServico}</td>
                <td>{servicos.preco}</td>
                <td>{servicos.duracaoEstimada}</td>
                <td>{servicos.materiaisNecessarios}</td>
                <td>{servicos.equipamentosUtilizados}</td>
                <td>{servicos.profissionalResponsavel}</td>
                <td>{servicos.frequenciaRecomendada}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button  href={`/servicos/form?id=${servicos.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(servicos)}><FaTrash /></Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}