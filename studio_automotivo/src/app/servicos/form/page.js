'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck, FaTrashRestore } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ServicoFormPage(props) {

  const router = useRouter()
  const servicos = JSON.parse(localStorage.getItem('servicos')) || []
  const profissionais = JSON.parse(localStorage.getItem('profissionais')) || []

  const id = props.searchParams.id
  console.log(props.searchParams.id)
  const servicoEditado = servicos.find(item => item.id === id)
  console.log(servicoEditado)


  function salvar(dados) {
    if (servicoEditado) {
      Object.assign(servicoEditado, dados)
      localStorage.setItem('servicos', JSON.stringify(servicos))
    } else {
      dados.id = v4()
      servicos.push(dados)
      localStorage.setItem('servicos', JSON.stringify(servicos))
    }

    alert("Serviço salvo com sucesso!")
    router.push("/servicos")
  }

  function apagar() {
    if (servicoEditado) {
      const novaLista = servicos.filter(item => item.id !== id)
      localStorage.setItem('servicos', JSON.stringify(novaLista))
      alert("Serviço apagado com sucesso!")
      router.push("/servicos")
    } else {
      alert("Nenhum serviço selecionado para apagar.")
    }
  }

  const initialValues = {
    nomeServico: '',
    descricaoServico: '',
    preco: '',
    duracaoEstimada: '',
    materiaisNecessarios: '',
    equipamentosUtilizados: '',
    profissionalResponsavel: '',
    frequenciaRecomendada: '',
  }

  const validationSchema = Yup.object().shape({
    nomeServico: Yup.string().required("Campo obrigatório"),
    descricaoServico: Yup.string().required("Campo obrigatório"),
    preco: Yup.number().required("Campo obrigatório").positive("Deve ser um valor positivo"),
    duracaoEstimada: Yup.string().required("Campo obrigatório"),
    materiaisNecessarios: Yup.string().required("Campo obrigatório"),
    equipamentosUtilizados: Yup.string().required("Campo obrigatório"),
    profissionalResponsavel: Yup.string().required("Campo obrigatório"),
    frequenciaRecomendada: Yup.string().required("Campo obrigatório"),
  })

  const listaFrequencia = [
    "Semanal",
    "Mensal",
    "trimestral",
    "Semestral",
    "Anual",
  ]

  const listaDuracao = [
    "1hr",
    "2 hr",
    "6 hr",
    "1 dia",
    "2 dia",
    "5 dia",
  ]

  const listaMaterias = [
    "Shampoo Automotivo",
    "Descontaminante Ferroso",
    "Clay Bar",
    "Cera Automotiva",
    "Selante de Pintura",
    "Vitrificador de Pintura",
    "Lixa d água",
    "Toalha de Microfibra",
    "Removedor de Piche e Resíduos",
    "Condicionador de Couro",
    "Limpa Vidros Automotivo",
    "Selante para Vidros",
    "Balde",
    "Pincel Automo",
  ]

  return (
    <Pagina titulo={"Cadastro de Serviço"}>

      <Formik
        initialValues={servicoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
        validateOnChange
        validateOnBlur
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Nome do Serviço:</Form.Label>
                <Form.Control
                  name='nomeServico'
                  type='text'
                  value={values.nomeServico}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nomeServico && !errors.nomeServico}
                  isInvalid={touched.nomeServico && errors.nomeServico}
                />
                <Form.Control.Feedback type='invalid'>{errors.nomeServico}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Descrição do Serviço:</Form.Label>
                <Form.Control
                  name='descricaoServico'
                  type='text'
                  value={values.descricaoServico}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.descricaoServico && !errors.descricaoServico}
                  isInvalid={touched.descricaoServico && errors.descricaoServico}
                />
                <Form.Control.Feedback type='invalid'>{errors.descricaoServico}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Preço:</Form.Label>
                <Form.Control
                  name='preco'
                  type='number'
                  placeholder='R$'
                  value={values.preco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.preco && !errors.preco}
                  isInvalid={touched.preco && errors.preco}
                />
                <Form.Control.Feedback type='invalid'>{errors.preco}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Duração Estimada:</Form.Label>
                <Form.Select
                  name='duracaoEstimada'
                  value={values.duracaoEstimada}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.duracaoEstimada && !errors.duracaoEstimada}
                  isInvalid={touched.duracaoEstimada && errors.duracaoEstimada}
                    >
                  <option value=''>Selecione</option>
                  {listaDuracao.map(duracaoEstimada => <option value={duracaoEstimada}>{duracaoEstimada}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.duracaoEstimada}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Materiais Necessários:</Form.Label>
                <Form.Select
                  name='materiaisNecessarios'
                  type='checkbox'
                  value={values.materiaisNecessarios}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.materiaisNecessarios && !errors.materiaisNecessarios}
                  isInvalid={touched.materiaisNecessarios && errors.materiaisNecessarios}
                    >
                  <option value=''>Selecione</option>
                  {listaMaterias.map(materiaisNecessarios=> <option value={materiaisNecessarios}>{materiaisNecessarios}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.materiaisNecessarios}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Equipamentos Utilizados:</Form.Label>
                <Form.Control
                  name='equipamentosUtilizados'
                  type='text'
                  value={values.equipamentosUtilizados}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.equipamentosUtilizados && !errors.equipamentosUtilizados}
                  isInvalid={touched.equipamentosUtilizados && errors.equipamentosUtilizados}
                />
                <Form.Control.Feedback type='invalid'>{errors.equipamentosUtilizados}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Profissional Responsável:</Form.Label>
                <Form.Select
                  name='profissionalResponsavel'
                  value={values.profissionalResponsavel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.profissionalResponsavel && !errors.profissionalResponsavel}
                  isInvalid={touched.profissionalResponsavel && errors.profissionalResponsavel}
                  >
                <option value=''>Selecione</option>
                {profissionais.map(profissionais => <option value={profissionais.nomeCompleto}>{profissionais.nomeCompleto}</option>)}
                </Form.Select>

                <Form.Control.Feedback type='invalid'>{errors.profissionalResponsavel}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Frequência Recomendada:</Form.Label>
                <Form.Select 
                  name='frequenciaRecomendada'
                  value={values.frequenciaRecomendada}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.frequenciaRecomendada && !errors.frequenciaRecomendada}
                  isInvalid={touched.frequenciaRecomendada && errors.frequenciaRecomendada}
                  >
                  <option value=''>Selecione</option>
                  {listaFrequencia.map(frequenciaRecomendada => <option value={frequenciaRecomendada}>{frequenciaRecomendada}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.frequenciaRecomendada}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className='text-end'>
              <Button className='me-2' onClick={() => router.push('/servicos')}><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success' className='me-2'><FaCheck /> Enviar</Button>
              <Button variant='danger' onClick={apagar}><FaTrashRestore /> Apagar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
