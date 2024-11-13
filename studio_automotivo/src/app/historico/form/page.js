'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck, FaTrashRestore, FaPrint } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ServicoRealizadoFormPage(props) {

  const router = useRouter()
  const historicos = JSON.parse(localStorage.getItem('historicos')) || []
  
  const clientes = JSON.parse(localStorage.getItem('clientes')) || []
  const servicos = JSON.parse(localStorage.getItem('servicos')) || []
  const profissionais = JSON.parse(localStorage.getItem('profissionais')) || []

  const id = props.searchParams.id
  const servicoEditado = historicos.find(item => item.id === id)

  function salvar(dados) {
    if (servicoEditado) {
      Object.assign(servicoEditado, dados)
      localStorage.setItem('historicos', JSON.stringify(historicos))
    } else {
      dados.id = v4()
      historicos.push(dados)
      localStorage.setItem('historicos', JSON.stringify(historicos))
    }

    alert("Serviço realizado salvo com sucesso!")
    router.push("/historico")
  }

  function apagar() {
    if (servicoEditado) {
      const novaLista = historicos.filter(item => item.id !== id)
      localStorage.setItem('historicos', JSON.stringify(novaLista))
      alert("Serviço realizado apagado com sucesso!")
      router.push("/historico")
    } else {
      alert("Nenhum histórico de serviço selecionado para apagar.")
    }
  }

  function imprimir() {
    window.print() 
  }

  const initialValues = {
    nomeCliente: '',
    telefoneCliente: '',
    placa: '',
    marca: '',
    servico: '',
    profissional: '',
    valor: '',
  }

  const validationSchema = Yup.object().shape({
    nomeCliente: Yup.string().required("Campo obrigatório"),
    telefoneCliente: Yup.string().required("Campo obrigatório"),
    placa: Yup.string().required("Campo obrigatório"),
    marca: Yup.string().required("Campo obrigatório"),
    servicoRealizado: Yup.string().required("Campo obrigatório"),
    profissional: Yup.string().required("Campo obrigatório"),
    valorServico: Yup.number().required("Campo obrigatório").typeError("Deve ser um valor numérico"),
  })

  return (
    <Pagina titulo={"Cadastro de Serviço Realizado"}>

      <Formik
        initialValues={servicoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Nome do Cliente:</Form.Label>
                <Form.Select
                  name='nomeCliente'
                  value={values.nomeCliente}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nomeCliente && !errors.nomeCliente}
                  isInvalid={touched.nomeCliente && errors.nomeCliente}
                >
                <option value=''>Selecione</option>
                {clientes.map(cliente => <option value={cliente.nomeCompleto}>{cliente.nomeCompleto}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.nomeCliente}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Telefone do Cliente:</Form.Label>
                <Form.Select
                  name='telefoneCliente'
                  value={values.telefoneCliente}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.telefoneCliente && !errors.telefoneCliente}
                  isInvalid={touched.telefoneCliente && errors.telefoneCliente}
                >
                    <option value=''>Selecione</option>
                    {clientes.map(cliente => <option value={cliente.telefone}>{cliente.telefone}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.telefoneCliente}</Form.Control.Feedback>
              </Form.Group>
            </Row>

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
                </Form.Select>
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
                <Form.Label>Serviço Realizado:</Form.Label>
                <Form.Select
                  name='servicoRealizado'
                  value={values.servicoRealizado}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.servicoRealizado && !errors.servicoRealizado}
                  isInvalid={touched.servicoRealizado && errors.servicoRealizado}
                >

                <option value=''>Selecione</option>
                {servicos.map(servicos => <option value={servicos.nomeServico}>{servicos.nomeServico}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.servicoRealizado}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Profissional Responsável:</Form.Label>
                <Form.Select
                  name='profissional'
                  value={values.profissional}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.profissional && !errors.profissional}
                  isInvalid={touched.profissional && errors.profissional}
                >
                <option value=''>Selecione</option>
                {profissionais.map(profissional => <option value={profissional.nomeCompleto}>{profissional.nomeCompleto}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.profissional}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Valor do Serviço:</Form.Label>
                <Form.Select
                  name='valorServico'
                  value={values.valorServico}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.valorServico && !errors.valorServico}
                  isInvalid={touched.valorServico && errors.valorServico}
                  >
                <option value=''>Selecione</option>
                {servicos.map(servicos => <option value={servicos.preco}>{servicos.preco}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.valorServico}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className='text-end'>
              <Button className='me-2' onClick={() => router.push('/historico')}><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success' className='me-2'><FaCheck /> Enviar</Button>
              <Button variant='danger' className='me-2'  onClick={apagar}><FaTrashRestore /> Apagar</Button>
              <Button variant='info' onClick={imprimir}><FaPrint /> Imprimir</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
