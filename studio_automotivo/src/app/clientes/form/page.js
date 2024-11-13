'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck, FaTrashRestore } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function clienteFormPage(props) {

  const router = useRouter()
  const clientes = JSON.parse(localStorage.getItem('clientes')) || []

  const id = props.searchParams.id
  console.log(props.searchParams.id)
  const clienteEditado = clientes.find(item => item.id === id)
  console.log(clienteEditado)

  function salvar(dados) {
    if (clienteEditado) {
      Object.assign(clienteEditado, dados)
      localStorage.setItem('clientes', JSON.stringify(clientes))
    } else {
      dados.id = v4()
      clientes.push(dados)
      localStorage.setItem('clientes', JSON.stringify(clientes))
    }

    alert("cliente salvo com sucesso!")
    router.push("/clientes")
  }

  function apagar() {
    if (clienteEditado) {
      const novaLista = clientes.filter(item => item.id !== id)
      localStorage.setItem('clientes', JSON.stringify(novaLista))
      alert("cliente apagado com sucesso!")
      router.push("/clientes")
    } else {
      alert("Nenhum cliente selecionado para apagar.")
    }
  }

  const listaMarca = [
    "FIAT",
    "CHEVROLET",
    "VOLKSWAGEN",
    "HYUNDAI",
    "JEEP",
    "JEEP",
    "HONDA",
    "NISSAN",
    "PEUGEOT",
    "CAOA CHERY",
    "CITROËN",
    "MITSUBISHI",
    "FORD",
    "BMW",
    "MERCEDES",
    "AUDI",
    "KIA",
    "VOLVO",
    "LAND ROVER",
    "PORSCHE",
    "IVECO",
    "RAM",
    "SUZUKI",
    "JAC",
    "MINI",
    "SUBARU",
    "LEXUS",
    "JAGUAR",
    "BYD",
    "TROLLER ",
    "FERRARI",
    "DODGE",
    "TESLA",
    "LAMBORGHINI",
    "CADILLAC",
    "MASERATI",
    "ASTON MARTIN",
    "CHRYSLER",
    "BENTLEY",
    "GWM",
    "DONGFENG",
    "MCLAREN",
    "ROLLS-ROYCE",
  ]

  const listaCor = [
    "Branco",
    "Vermelho",
    "Preto",
    "Prata",
    "Azul",
    "Cinza",
    "Outros",
  ]

  const initialValues = {
    nomeCompleto: '',
    telefone: '',
    email: '',
    cpf: '',
    endereco: '',
    placa: '',
    marca: '',
    corVeiculo: '',
    datacliente: '',
  }

  const validationSchema = Yup.object().shape({
    nomeCompleto: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    cpf: Yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato de CPF inválido").required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    placa: Yup.string().required("Campo obrigatório"),
    marca: Yup.string().required("Campo obrigatório"),
    corVeiculo: Yup.string().required("Campo obrigatório"),
    datacliente: Yup.date().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"cliente de Cliente"}>

      <Formik
        initialValues={clienteEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Nome Completo:</Form.Label>
                <Form.Control
                  name='nomeCompleto'
                  type='text'
                  value={values.nomeCompleto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nomeCompleto && !errors.nomeCompleto}
                  isInvalid={touched.nomeCompleto && errors.nomeCompleto}
                />
                <Form.Control.Feedback type='invalid'>{errors.nomeCompleto}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <Form.Control
                  name='telefone'
                  type='text'
                  placeholder='(00) 0 0000 - 0000'
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.telefone && !errors.telefone}
                  isInvalid={touched.telefone && errors.telefone}
                />
                <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>CPF:</Form.Label>
                <Form.Control
                  name='cpf'
                  type='text'
                  placeholder='000.000.000-00'
                  value={values.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.cpf && !errors.cpf}
                  isInvalid={touched.cpf && errors.cpf}
                />
                <Form.Control.Feedback type='invalid'>{errors.cpf}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  name='endereco'
                  type='text'
                  value={values.endereco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.endereco && !errors.endereco}
                  isInvalid={touched.endereco && errors.endereco}
                />
                <Form.Control.Feedback type='invalid'>{errors.endereco}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
            <Form.Group as={Col}>
              <Form.Label>Placa do Veículo:</Form.Label>
                <Form.Control
                  name='placa'
                  type='text'
                  placeholder='XXX-1111 ou ABC1D23'
                  value={values.placa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.placa && !errors.placa}
                  isInvalid={touched.placa && errors.placa}
                />
                <Form.Control.Feedback type='invalid'>{errors.placa}</Form.Control.Feedback>
                </Form.Group>
                
              <Form.Group as={Col}>
                <Form.Label>Marca do Veículo:</Form.Label>
                <Form.Select
                  name='marca'
                  type='text'
                  value={values.marca}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.marca && !errors.marca}
                  isInvalid={touched.marca && errors.marca}
                  >
                  <option value=''>Selecione</option>
                  {listaMarca.map(marca => <option value={marca}>{marca}</option>)}
                  </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.marca}</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Cor do Veículo:</Form.Label>
                <Form.Select
                  name='corVeiculo'
                  type='text'
                  value={values.corVeiculo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.corVeiculo && !errors.corVeiculo}
                  isInvalid={touched.corVeiculo && errors.corVeiculo}
                  >
                  <option value=''>Selecione</option>
                  {listaCor.map(cor => <option value={cor}>{cor}</option>)}
                  </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.corVeiculo}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Data do Cadastro:</Form.Label>
                <Form.Control
                  name='datacliente'
                  type='date'
                  value={values.datacliente}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.datacliente && !errors.datacliente}
                  isInvalid={touched.datacliente && errors.datacliente}
                />
                <Form.Control.Feedback type='invalid'>{errors.datacliente}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className='text-end'>
              <Button className='me-2' href='/clientes'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success' className='me-2'><FaCheck /> Enviar</Button>
              <Button variant='danger' onClick={apagar}><FaTrashRestore /> Apagar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
