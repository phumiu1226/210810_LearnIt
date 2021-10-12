import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

export default function LoginForm() {

    //context
    const { loginUser } = useContext(AuthContext)

    //router
    // const history = useHistory()

    //local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    const { username, password } = loginForm

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)

            //login successfully
            if (loginData.success) {
                // history.push('/dashboard')
            } else {
                setAlert(state => ({ type: 'danger', message: loginData.message }))
                setTimeout(() => setAlert(state => null), 5000)
            }

        } catch (err) {
            console.log(err)
        }
    }



    return (
        <>
            <Form className='my-4' onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control type='text' placeholder='Username' name='username' className='mb-2' required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control type='password' placeholder='Password' name='password' className='mb-2' required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button type='submit' variant='success' > Login </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to='/register' >
                    <Button variant='info' size='sm' className='ms-2'>Register</Button>
                </Link>
            </p>
        </>
    )
}
