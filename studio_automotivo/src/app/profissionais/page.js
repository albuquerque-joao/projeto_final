'use client'
import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function profissionaisPage() {

  const [profissionais, setprofissionais] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const profissionaisLocalStorage = JSON.parse(localStorage.getItem("profissionais")) || []
    // guarda a lista no estado
    setprofissionais(profissionaisLocalStorage)
    console.log(profissionaisLocalStorage)
  }, [])

  // Função para exclusão do item
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
        <Button href=''><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os profissionais */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Função</th>
            <th>Data de Admissão</th>
            <th>Especialidade</th>
            <th>Turno</th>
          </tr>
        </thead>
        <tbody>
          {profissionais.map(profissional => {
            return (
              <tr>
                <td>{profissional.nome}</td>
                <td>{profissional.cpf}</td>
                <td>{profissional.email}</td>
                <td>{profissional.telefone}</td>
                <td>{profissional.funcao}</td>
                <td>{profissional.dataAdmissão}</td>
                <td>{profissional.especialidade}</td>
                <td>{profissional.turno}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/profissionais/form?id=${profissional.id}`}><FaPen /></Button>
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