'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck, FaTrashRestore } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function AgendamentoFormPage(props) {

  const router = useRouter()
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || []

  const clientes = JSON.parse(localStorage.getItem('clientes')) || []
  const servicos = JSON.parse(localStorage.getItem('servicos')) || []

  const id = props.searchParams.id
  const agendamentoEditado = agendamentos.find(item => item.id === id)

  function salvar(dados) {
    if (agendamentoEditado) {
      Object.assign(agendamentoEditado, dados)
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
    } else {
      dados.id = v4()
      agendamentos.push(dados)
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
    }

    alert("Agendamento salvo com sucesso!")
    router.push("/agendamento")
  }

  function apagar() {
    if (agendamentoEditado) {
      const novaLista = agendamentos.filter(item => item.id !== id)
      localStorage.setItem('agendamentos', JSON.stringify(novaLista))
      alert("Agendamento apagado com sucesso!")
      router.push("/agendamento")
    } else {
      alert("Nenhum agendamento selecionado para apagar.")
    }
  }

  const initialValues = {
    nomeCliente: '',
    placaVeiculo: '',
    servicoSolicitado: '',
    dataAgendamento: '',
    horarioAgendamento: '',
    statusAgendamento: '',
    observacoes: '',
    dataCadastro: '',
  }

  const validationSchema = Yup.object().shape({
    nomeCliente: Yup.string().required("Campo obrigatório"),
    placaVeiculo: Yup.string().required("Campo obrigatório"),
    servicoSolicitado: Yup.string().required("Campo obrigatório"),
    dataAgendamento: Yup.date().required("Campo obrigatório"),
    horarioAgendamento: Yup.string().required("Campo obrigatório"),
    statusAgendamento: Yup.string().required("Campo obrigatório"),
    dataCadastro: Yup.date().required("Campo obrigatório"),
  })

  const listastatus = [
    "Confirmado",
    "Pendente",
    "Concluído",
  ]

  return (
    <Pagina titulo={"Cadastro de Agendamento"}>

      <Formik
        initialValues={agendamentoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
        validateOnChange
        validateOnBlur
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Nome do Cliente:</Form.Label>
                <Form.Select
                  name='nomeCliente'
                  type='text'
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
                <Form.Label>Placa do Veículo:</Form.Label>
                <Form.Select
                  name='placaVeiculo'
                  value={values.placaVeiculo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.placaVeiculo && !errors.placaVeiculo}
                  isInvalid={touched.placaVeiculo && errors.placaVeiculo}
                >
                <option value=''>Selecione</option>
                {clientes.map(cliente => <option value={cliente.placa}>{cliente.placa}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.placaVeiculo}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
            <Form.Group as={Col}>
                <Form.Label>Data do Cadastro:</Form.Label>
                <Form.Select
                  name='dataCadastro'
                  value={values.dataCadastro}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataCadastro && !errors.dataCadastro}
                  isInvalid={touched.dataCadastro && errors.dataCadastro}
                >
                <option value=''>Selecione</option>
                {clientes.map(cliente => <option value={cliente.datacliente}>{cliente.datacliente}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.dataCadastro}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Serviço Solicitado:</Form.Label>
                <Form.Select
                  name='servicoSolicitado'
                  type='text'
                  value={values.servicoSolicitado}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.servicoSolicitado && !errors.servicoSolicitado}
                  isInvalid={touched.servicoSolicitado && errors.servicoSolicitado}
                >
                <option value=''>Selecione</option>
                {servicos.map(servicos => <option value={servicos.nomeServico}>{servicos.nomeServico}</option>)}

                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.servicoSolicitado}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Data do Agendamento:</Form.Label>
                <Form.Control
                  name='dataAgendamento'
                  type='date'
                  value={values.dataAgendamento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataAgendamento && !errors.dataAgendamento}
                  isInvalid={touched.dataAgendamento && errors.dataAgendamento}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataAgendamento}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Horário do Agendamento:</Form.Label>
                <Form.Control
                  name='horarioAgendamento'
                  type='time'
                  value={values.horarioAgendamento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.horarioAgendamento && !errors.horarioAgendamento}
                  isInvalid={touched.horarioAgendamento && errors.horarioAgendamento}
                />
                <Form.Control.Feedback type='invalid'>{errors.horarioAgendamento}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Status do Agendamento:</Form.Label>
                <Form.Select
                  name='statusAgendamento'
                  value={values.statusAgendamento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.statusAgendamento && !errors.statusAgendamento}
                  isInvalid={touched.statusAgendamento && errors.statusAgendamento}
                >
                 <option value=''>Selecione</option>
                 {listastatus .map(status => <option value={status}>{status}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.statusAgendamento}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Observações:</Form.Label>
                <Form.Control
                  name='observacoes'
                  as='textarea'
                  rows={3}
                  value={values.observacoes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.observacoes && !errors.observacoes}
                  isInvalid={touched.observacoes && errors.observacoes}
                />
                <Form.Control.Feedback type='invalid'>{errors.observacoes}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className='text-end'>
              <Button className='me-2' onClick={() => router.push('/agendamentos')}><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success' className='me-2'><FaCheck /> Enviar</Button>
              <Button variant='danger' onClick={apagar}><FaTrashRestore /> Apagar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
