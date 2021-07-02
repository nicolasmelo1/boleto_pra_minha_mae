import React from 'react'
import axios from 'axios'
import {
    ContentInput,
    ContentForm
} from './styles'

export default function Content(props) {
    const [email, setEmail] = React.useState('')
    const [senha, setSenha] = React.useState('')
    const senhaRef = React.useRef()
    const emailRef = React.useRef()

    function onSubmit() {
        axios.post('/api/enviarBoleto')
    }

    return (
        <div style={{ textAlign: 'center'}}>
            <h1>
                Oi mãe, só preencher esse formulário com seu e-mail e senha que eu enviei e irei lhe enviar o boleto
            </h1>
            <ContentForm onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
            }}>
                <label>E-mail</label>
                <ContentInput 
                autoComplete={'email'}
                type={'text'} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                />
                <label>Senha</label>
                <ContentInput 
                autoComplete={'password'}
                type={'password'} 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)}
                />
                <button>
                    Enviar Boleto
                </button>
            </ContentForm>
        </div>
    )
}