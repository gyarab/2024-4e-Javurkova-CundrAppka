import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRegisterUser from 'hooks/users/useRegisterUser'
import RegisterModal from 'components/users/RegisterModal'

function RegisterUserPage() {

  return (
    <div>
      <RegisterModal onDismiss={()=>{}} onRegister={()=>{}}/>
      <p><a href='/'>Domu</a></p>
    </div>
  )
}

export default RegisterUserPage
