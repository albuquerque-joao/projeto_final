'use client'
import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function profissionaisPage() {

  const [profissionais, setprofissionais] = useState([])

  useEffect(() => {
    const profissionaisLocalStorage = JSON.parse(localStorage.getItem("profissionais")) || []
    setprofissionais(profissionaisLocalStorage)
    console.log(profissionaisLocalStorage)
  }, [])

  function excluir(profissional) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o profissional ${profissional.nome}?`)) {
      // filtra a lista antiga removando o profissional recebido
      const novaLista = profissionais.filter(item => item.id !== profissional.id)
      // grava no localStorage a nova lista
      localStorage.setItem('profissionais', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setprofissionais(novaLista)
      alert("profissionais excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Painel de profissionais"}>
      <div className='text-end mb-2'>
        <Button href='profissionais/form'><FaPlusCircle /> Novo</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Função</th>
            <th>Data de Admissão</th>
            <th>Especialização</th>
            <th>Turno De Trabalho</th>
          </tr>
        </thead>
        <tbody>
          {profissionais.map(profissional => {
            return (
              <tr>
                <td>{profissional.nomeCompleto}</td>
                <td>{profissional.cpf}</td>
                <td>{profissional.email}</td>
                <td>{profissional.telefone}</td>
                <td>{profissional.funcao}</td>
                <td>{profissional.dataAdmissao}</td>
                <td>{profissional.especializacao}</td>
                <td>{profissional.turnoTrabalho}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button  href={`/profissionais/form?id=${profissional.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(profissional)}><FaTrash /></Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}