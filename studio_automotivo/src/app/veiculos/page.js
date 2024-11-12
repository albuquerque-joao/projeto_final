'use client'
import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function veiculosPage() {

  const [veiculos, setveiculos] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const veiculosLocalStorage = JSON.parse(localStorage.getItem("veiculos")) || []
    // guarda a lista no estado
    setveiculos(veiculosLocalStorage)
    console.log(veiculosLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(veiculo) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o veiculo ${veiculo.nome}?`)) {
      // filtra a lista antiga removando o veiculo recebido
      const novaLista = veiculos.filter(item => item.id !== veiculo.id)
      // grava no localStorage a nova lista
      localStorage.setItem('veiculos', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setveiculos(novaLista)
      alert("veiculos excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Painel de veículos"}>
      <div className='text-end mb-2'>
        <Button href='veiculos/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os veiculos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano de Fabricação</th>
            <th>Cor do Veículo</th>
            <th>Tipo de Conbustível</th>
            <th>Data da última manutenção</th>
            <th>Quilometragem atual</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map(veiculo => {
            return (
              <tr>
                <td>{veiculo.placa}</td>
                <td>{veiculo.marca}</td>
                <td>{veiculo.modelo}</td>
                <td>{veiculo.anoFabricacao}</td>
                <td>{veiculo.cor}</td>
                <td>{veiculo.combustivel}</td>
                <td>{veiculo.ultimaManutencao}</td>
                <td>{veiculo.kmatual}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/veiculos/form?id=${veiculo.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(veiculo)}><FaTrash /></Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}