import React from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'

import * as yup from 'yup'
import './Register.css'
import axios from 'axios'

const Register = () => {
  const handleSubmit = values => {
    axios.post('http://localhost:3003/users', values)
      .then(resp => console.log(resp)).catch(error => console.log(error))
  }
  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  })
  return (
    <>
      <h1>Register</h1>
      <p>Preencha o formulário a baixo para fazer o seu cadastro</p>
      <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
        <Form className='Register'>
          <div className='Register-Group'>
            <label className='Register-Label'>Primeiro nome</label>
            <Field name='firstName' className='Register-Field' />
            <ErrorMessage component='span' name='firstName' className='Register-Error'></ErrorMessage>
          </div>
          <div className='Register-Group'>
            <label className='Register-Label'>Sobrenome</label>
            <Field name='lastName' className='Register-Field' />
            <ErrorMessage component='span' name='lastName' className='Register-Error'></ErrorMessage>
          </div>
          <div className='Register-Group'>
            <label className='Register-Label'>Github</label>
            <Field name='gitHubUsername' className='Register-Field' />
            <ErrorMessage component='span' name='gitHubUsername' className='Register-Error'></ErrorMessage>
          </div>
          <div className='Register-Group'>
            <label className='Register-Label'>E-mail</label>
            <Field name='email' className='Register-Field' />
            <ErrorMessage component='span' name='email' className='Register-Error'></ErrorMessage>
          </div>
          <div className='Register-Group'>
            <label className='Register-Label'>Senha</label>
            <Field name='password' className='Register-Field' />
            <ErrorMessage component='span' name='password' className='Register-Error'></ErrorMessage>
          </div>
          <button className='Register-Btn' type='submit'>Enviar</button>
        </Form>
      </Formik>
    </>
  )
}

export default Register
