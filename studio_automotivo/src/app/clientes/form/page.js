'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck, FaTrashRestore } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function CadastroFormPage(props) {

  const router = useRouter()
  const cadastros = JSON.parse(localStorage.getItem('cadastros')) || []

  const veiculos = JSON.parse(localStorage.getItem('placa')) || []
  const veiculos2 = JSON.parse(localStorage.getItem('corVeiculo')) || []
  const veiculos3 = JSON.parse(localStorage.getItem('marca')) || []
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  const cadastroEditado = cadastros.find(item => item.id === id)
  console.log(cadastroEditado)

  function salvar(dados) {
    if (cadastroEditado) {
      Object.assign(cadastroEditado, dados)
      localStorage.setItem('cadastros', JSON.stringify(cadastros))
    } else {
      dados.id = v4()
      cadastros.push(dados)
      localStorage.setItem('cadastros', JSON.stringify(cadastros))
    }

    alert("Cadastro salvo com sucesso!")
    router.push("/cadastros")
  }

  function apagar() {
    if (cadastroEditado) {
      const novaLista = cadastros.filter(item => item.id !== id)
      localStorage.setItem('cadastros', JSON.stringify(novaLista))
      alert("Cadastro apagado com sucesso!")
      router.push("/cadastros")
    } else {
      alert("Nenhum cadastro selecionado para apagar.")
    }
  }

  const initialValues = {
    nomeCompleto: '',
    telefone: '',
    email: '',
    cpf: '',
    endereco: '',
    placaVeiculo: '',
    marcaModeloVeiculo: '',
    dataCadastro: '',
  }

  const validationSchema = Yup.object().shape({
    nomeCompleto: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    placaVeiculo: Yup.string().required("Campo obrigatório"),
    marcaModeloVeiculo: Yup.string().required("Campo obrigatório"),
    dataCadastro: Yup.date().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Cliente"}>

      <Formik
        initialValues={cadastroEditado || initialValues}
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
                <Form.Select
                  name='placaVeiculo'
                  value={values.placa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.placa && !errors.placa}
                  isInvalid={touched.placa && errors.placa}
                  >
                <option value=''>Selecione</option>
                {veiculos.map(veiculo => <option value={veiculo.placa}>{veiculo.placa}</option>)}
                /</Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.placa}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Marca do Veículo:</Form.Label>
                <Form.Select
                  name='marcaModeloVeiculo'
                  value={values.marca}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.marca && !errors.marca}
                  isInvalid={touched.marca && errors.marca}
                    >
                  <option value=''>Selecione</option>
                {veiculos3.map(veiculo => <option value={veiculo.marca}>{veiculo.placa}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.marca}</Form.Control.Feedback>
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
                {veiculos2.map(veiculo => <option value={veiculo.corVeiculo}>{veiculo.corVeiculo}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.corVeiculo}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Data do Cadastro:</Form.Label>
                <Form.Control
                  name='dataCadastro'
                  type='date'
                  value={values.dataCadastro}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataCadastro && !errors.dataCadastro}
                  isInvalid={touched.dataCadastro && errors.dataCadastro}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataCadastro}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className='text-end'>
              <Button className='me-2' href='/cadastros'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success' className='me-2'><FaCheck /> Enviar</Button>
              <Button variant='danger' onClick={apagar}><FaTrashRestore /> Apagar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
