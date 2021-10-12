import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

export default function RegisterForm() {

    //context
    const { registerUser } = useContext(AuthContext)


    //router
    // const history = useHistory()


    //local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [alert, setAlert] = useState(null)

    const onChangeRegisterForm = event =>
        setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })

    const { username, password, confirmPassword } = registerForm

    const register = async event => {
        event.preventDefault()

        if (password !== confirmPassword) {
            setAlert((state) => ({ type: 'danger', message: `Password doesn't match` }))
            setTimeout(() => setAlert(state => null), 5000)
        }
        else
            try {
                const registerData = await registerUser(registerForm)
                //login successfully
                if (registerData.success) {
                    // history.push('/dashboard')
                } else {
                    setAlert(state => ({ type: 'danger', message: registerData.message }))
                    setTimeout(() => setAlert(state => null), 5000)
                }

            } catch (err) {
                console.log(err)
            }
    }

    return (
        <>
            <Form onSubmit={register} className='my-4'>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control type='text' placeholder='Username' name='username' className='mb-2' required
                        onChange={onChangeRegisterForm} value={username}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control type='password' placeholder='Password' name='password' className='mb-2' required
                        onChange={onChangeRegisterForm} value={password}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control type='password' placeholder='Confirm password' name='confirmPassword' className='mb-2' required
                        onChange={onChangeRegisterForm} value={confirmPassword}
                    />
                </Form.Group>
                <Button type='submit' variant='success' > Login </Button>
            </Form>
            <p>
                Already have an account?
                <Link to='/login' >
                    <Button variant='info' size='sm' className='ms-2'>Login</Button>
                </Link>
            </p>
        </>
    )
}
