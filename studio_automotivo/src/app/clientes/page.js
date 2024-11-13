'use client'
import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function clientesPage() {

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    
    const clientesLocalStorage = JSON.parse(localStorage.getItem("clientes")) || []
    setClientes(clientesLocalStorage)
    console.log(clientesLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(cliente) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`)) {
      // filtra a lista antiga removando o cliente recebido
      const novaLista = clientes.filter(item => item.id !== cliente.id)
      // grava no localStorage a nova lista
      localStorage.setItem('clientes', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setClientes(novaLista)
      alert("Clientes excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Painel de Clientes"}>
      <div className='text-end mb-2'>
        <Button href='clientes/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Clientes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>CPF</th>
            <th>Endereço</th>
            <th>Placa do Veículo</th>
            <th>Marca do Veículo</th>
            <th>Cor do Veículo</th>
            <th>Data do Cadastro</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => {
            return (
              <tr>
                <td>{cliente.nomeCompleto}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.placa}</td>
                <td>{cliente.marca}</td>
                <td>{cliente.corVeiculo}</td>
                <td>{cliente.datacliente}</td>
                <td className='text-center'>
                  
                  <Button  href={`/clientes/form?id=${cliente.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(cliente)}><FaTrash /></Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}