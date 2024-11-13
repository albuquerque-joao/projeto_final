'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck, FaTrashRestore } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function VeiculoFormPage(props) {

  const router = useRouter()
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || []

  const id = props.searchParams.id
  console.log(props.searchParams.id)

  const veiculoEditado = veiculos.find(item => item.id === id)
  console.log(veiculoEditado)

  const clientes = JSON.parse(localStorage.getItem('clientes')) || []

  function salvar(dados) {
    if (veiculoEditado) {
      Object.assign(veiculoEditado, dados)

      localStorage.setItem('veiculos', JSON.stringify(veiculos))
    } else {
      dados.id = v4()
      veiculos.push(dados)
      localStorage.setItem('veiculos', JSON.stringify(veiculos))
    }

    alert("Veiculo criado com sucesso!")
    router.push("/veiculos")
  }

  function apagar() {
    if (veiculoEditado) {
      const novaLista = veiculos.filter(item => item.id !== id)
      localStorage.setItem('veiculos', JSON.stringify(novaLista))
      alert("Veículo apagado com sucesso!")
      router.push("/veiculos")
    } else {
      alert("Nenhum veículo selecionado para apagar.")
    }
  }

  const listaCombustivel = [
    "Gasolina",
    "Etanol",
    "Flex",
    "Diesel",
    "Elétrico",
    "GNV",
  ]

  

  const initialValues = {
    placa: '',
    marca: '',
    modelo: '',
    anoFabricacao: '',
    corVeiculo: '',
    tipoCombustivel: '',
    dataUltimaManutencao: '',
    quilometragemAtual: '',
  }

  const validationSchema = Yup.object().shape({
    placa: Yup.string().required("Campo obrigatório"),
    marca: Yup.string().required("Campo obrigatório"),
    modelo: Yup.string().required("Campo obrigatório"),
    anoFabricacao: Yup.number().min(1886, "Ano inválido").max(new Date().getFullYear(), "Ano inválido").required("Campo obrigatório"),
    corVeiculo: Yup.string().required("Campo obrigatório"),
    tipoCombustivel: Yup.string().required("Campo obrigatório"),
    dataUltimaManutencao: Yup.date().required("Campo obrigatório"),
    quilometragemAtual: Yup.number().min(0, "Quilometragem não pode ser negativa").required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Veículo"}>

      <Formik
        initialValues={veiculoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className='mb-2'>
              <Form.Group as={Col}>
              <Form.Label>Placa do Veículo:</Form.Label>
                <Form.Select
                  name='placa'
                  value={values.placa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.placa && !errors.placa}
                  isInvalid={touched.placa && errors.placa}
                  >
                <option value=''>Selecione</option>
                {clientes.map(cliente => <option value={cliente.placa}>{cliente.placa}</option>)}
                /</Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.placa}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
              <Form.Label>Marca do Veículo:</Form.Label>
                <Form.Select
                  name='marca'
                  value={values.marca}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.marca && !errors.marca}
                  isInvalid={touched.marca && errors.marca}
                    >
                  <option value=''>Selecione</option>
                  {clientes.map(cliente => <option value={cliente.marca}>{cliente.marca}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.marca}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Modelo:</Form.Label>
                <Form.Control
                  name='modelo'
                  type='text'
                  value={values.modelo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.modelo && !errors.modelo}
                  isInvalid={touched.modelo && errors.modelo}
                />
                <Form.Control.Feedback type='invalid'>{errors.modelo}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Ano de Fabricação:</Form.Label>
                <Form.Control
                  name='anoFabricacao'
                  type='number'
                  value={values.anoFabricacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.anoFabricacao && !errors.anoFabricacao}
                  isInvalid={touched.anoFabricacao && errors.anoFabricacao}
                />
                <Form.Control.Feedback type='invalid'>{errors.anoFabricacao}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
            <Form.Group as={Col}>
                <Form.Label>Cor do Veículo:</Form.Label>
                <Form.Select
                  name='corVeiculo'
                  value={values.corVeiculo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.corVeiculo && !errors.corVeiculo}
                  isInvalid={touched.corVeiculo && errors.corVeiculo}
                    >
                <option value=''>Selecione</option>
                {clientes.map(cliente => <option value={cliente.corVeiculo}>{cliente.corVeiculo}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.corVeiculo}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Tipo de Combustível:</Form.Label>
                <Form.Select
                  name='tipoCombustivel'
                  type='text'
                  value={values.tipoCombustivel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.tipoCombustivel && !errors.tipoCombustivel}
                  isInvalid={touched.tipoCombustivel && errors.tipoCombustivel}
                    >
                  <option value=''>Selecione</option>
                  {listaCombustivel.map(combustivel => <option value={combustivel}>{combustivel}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.tipoCombustivel}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Data da Última Manutenção:</Form.Label>
                <Form.Control
                  name='dataUltimaManutencao'
                  type='date'
                  value={values.dataUltimaManutencao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataUltimaManutencao && !errors.dataUltimaManutencao}
                  isInvalid={touched.dataUltimaManutencao && errors.dataUltimaManutencao}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataUltimaManutencao}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Quilometragem Atual:</Form.Label>
                <Form.Control
                  name='quilometragemAtual'
                  type='number'
                  value={values.quilometragemAtual}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.quilometragemAtual && !errors.quilometragemAtual}
                  isInvalid={touched.quilometragemAtual && errors.quilometragemAtual}
                />
                <Form.Control.Feedback type='invalid'>{errors.quilometragemAtual}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className='text-end'>
              <Button className='me-2' href='/veiculos'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success' className='me-2'><FaCheck />Enviar</Button>
              <Button variant='danger' onClick={apagar}><FaTrashRestore /> Apagar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
