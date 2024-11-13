'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck, FaTrashRestore } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ProfissionalFormPage(props) {

  const router = useRouter()
  const profissionais = JSON.parse(localStorage.getItem('profissionais')) || []

  const id = props.searchParams.id
  console.log(props.searchParams.id)
  const profissionalEditado = profissionais.find(item => item.id == id)
  console.log(profissionalEditado)

  function salvar(dados) {
    if (profissionalEditado) {
      Object.assign(profissionalEditado, dados)
      localStorage.setItem('profissionais', JSON.stringify(profissionais))
    } else {
      dados.id = v4()
      profissionais.push(dados)
      localStorage.setItem('profissionais', JSON.stringify(profissionais))
    }

    alert("Colaborador salvo com sucesso!")
    router.push("/profissionais")
  } 

  function apagar() {
    if (profissionalEditado) {
      const novaLista = profissionais.filter(item => item.id !== id)
      localStorage.setItem('profissional', JSON.stringify(novaLista))
      alert("Profissional apagado com sucesso!")
      router.push("/profissionais")
    } else {
      alert("Nenhum profissional selecionado para apagar.")
    }
  }

  const listaTurno = [
    "Manhã",
    "Tarde",
    "Integral",
  ]

  const listaespecializacao = [
    "Polimento",
    "Vitrificação",
    "Envelopamento",
    "Estética Interna",
    "Estética Externa",
    "Correção de Pintura",
    "Instalação de Insulfilm",
    "Reparo de Rodas",
  ]

  const initialValues = {
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    email: '',
    funcao: '',
    dataAdmissao: '',
    especializacao: '',
    turnoTrabalho: '',
  }

  const validationSchema = Yup.object().shape({
    nomeCompleto: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    funcao: Yup.string().required("Campo obrigatório"),
    dataAdmissao: Yup.date().required("Campo obrigatório"),
    especializacao: Yup.string().required("Campo obrigatório"),
    turnoTrabalho: Yup.string().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Funcionário"}>

      <Formik
        initialValues={profissionalEditado || initialValues}
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
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Função:</Form.Label>
                <Form.Control
                  name='funcao'
                  type='text'
                  value={values.funcao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.funcao && !errors.funcao}
                  isInvalid={touched.funcao && errors.funcao}
                />
                <Form.Control.Feedback type='invalid'>{errors.funcao}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Data de Admissão:</Form.Label>
                <Form.Control
                  name='dataAdmissao'
                  type='date'
                  value={values.dataAdmissao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataAdmissao && !errors.dataAdmissao}
                  isInvalid={touched.dataAdmissao && errors.dataAdmissao}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataAdmissao}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Especialização:</Form.Label>
                <Form.Select
                  name='especializacao'
                  value={values.especializacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.especializacao && !errors.especializacao}
                  isInvalid={touched.especializacao && errors.especializacao}
                  >
                <option value=''>Selecione</option>
                {listaespecializacao.map(duracaoEstimada => <option value={duracaoEstimada}>{duracaoEstimada}</option>)}
                </Form.Select>

                <Form.Control.Feedback type='invalid'>{errors.especializacao}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Turno de Trabalho:</Form.Label>
                <Form.Select
                  name='turnoTrabalho'
                  value={values.turnoTrabalho}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.turnoTrabalho && !errors.turnoTrabalho}
                  isInvalid={touched.turnoTrabalho && errors.turnoTrabalho}
                  >
                  <option value=''>Selecione</option>
                  {listaTurno.map(turno => <option value={turno}>{turno}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.turnoTrabalho}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className='text-end'>
              <Button className='me-2' href='/profissionais'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success' className='me-2'><FaCheck /> Enviar</Button>
              <Button variant='danger' onClick={apagar}><FaTrashRestore /> Apagar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
