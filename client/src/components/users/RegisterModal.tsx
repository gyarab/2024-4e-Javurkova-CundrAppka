import { User } from 'models/user'
import { useForm } from 'react-hook-form'
import { RegistrationCredentials } from 'hooks/users'
import { useRegisterUser } from 'hooks/users'
import { Modal, Form, Button } from 'react-bootstrap'
import TextInputField from 'components/forms/TextInputField'

interface RegisterModalProps {
    onDismiss: () => void,
    onRegister: (user: User) => void
}

function RegisterModal({ onDismiss, onRegister }: RegisterModalProps) {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegistrationCredentials>()
 
    async function onSubmit(credentials: RegistrationCredentials) {
        try {
            const newUser = await useRegisterUser(credentials)
            onRegister(newUser)
        } catch (error) {
            alert(error)
        }
    }

    return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            Registrujte se
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="username"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={ errors.username }
                />
                <TextInputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="email"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={ errors.email }
                />
                <TextInputField
                    name="Password"
                    label="Heslo"
                    type="password"
                    placeholder="Heslo"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={ errors.password }
                />
                <Button 
                    type="submit"
                    disabled={isSubmitting}>
                    Registrovat
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default RegisterModal