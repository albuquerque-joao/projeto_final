'use client'
import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function agendamentosPage() {

  const [agendamentos, setagendamentos] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const agendamentosLocalStorage = JSON.parse(localStorage.getItem("agendamentos")) || []
    // guarda a lista no estado
    setagendamentos(agendamentosLocalStorage)
    console.log(agendamentosLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(agendamento) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o agendamento ${agendamento.nome}?`)) {
      // filtra a lista antiga removando o agendamento recebido
      const novaLista = agendamentos.filter(item => item.id !== agendamento.id)
      // grava no localStorage a nova lista
      localStorage.setItem('agendamentos', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setagendamentos(novaLista)
      alert("agendamentos excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Painel de agendamentos"}>
      <div className='text-end mb-2'>
        <Button href='agendamento/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os agendamentos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Placa do Veículo</th>
            <th>Serviço Solicitado</th>
            <th>Data do Agendamento</th>
            <th>Horário do Agendamento</th>
            <th>Status do Agendamento</th>
            <th>Observações</th>
            <th>Data do Cadastro</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map(agendamento => {
            return (
              <tr>
                <td>{agendamento.nomeCliente}</td>
                <td>{agendamento.placaVeiculo}</td>
                <td>{agendamento.servicoSolicitado}</td>
                <td>{agendamento.dataAgendamento}</td>
                <td>{agendamento.horarioAgendamento}</td>
                <td>{agendamento.statusAgendamento}</td>
                <td>{agendamento.observacoes}</td>
                <td>{agendamento.dataCadastro}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button href={`/agendamentos/form?id=${agendamento.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(agendamento)}><FaTrash /></Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}