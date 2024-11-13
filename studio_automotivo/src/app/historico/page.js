'use client'
import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function historicosPage() {

  const [historicos, sethistoricos] = useState([])

  
  useEffect(() => {
    const historicosLocalStorage = JSON.parse(localStorage.getItem("historicos")) || []
    sethistoricos(historicosLocalStorage)
    console.log(historicosLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(historico) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o historico ${historico.nome}?`)) {
      // filtra a lista antiga removando o historico recebido
      const novaLista = historicos.filter(item => item.id !== historico.id)
      // grava no localStorage a nova lista
      localStorage.setItem('historicos', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      sethistoricos(novaLista)
      alert("historicos excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Historico do Serviço"}>
      <div className='text-end mb-2'>
        <Button href='historico/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os historicos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Telefone do Cliente</th>
            <th>Placa do Veículo</th>
            <th>Marca do Veículo</th>
            <th>Serviço Realizado</th>
            <th>Profissional Responsável</th>
            <th>Valro do Serviço</th>
          </tr>
        </thead>
        <tbody>
          {historicos.map(historico => {
            return (
              <tr>
                <td>{historico.nomeCliente}</td>
                <td>{historico.telefoneCliente }</td>
                <td>{historico.placa}</td>
                <td>{historico.marca}</td>
                <td>{historico.servicoRealizado}</td>
                <td>{historico.profissional}</td>
                <td>{historico.valorServico}</td>
                
                <td className='text-center'>
                  <Button  href={`/historico/form?id=${historico.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(historico)}><FaTrash /></Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}