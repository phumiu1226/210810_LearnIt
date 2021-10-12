import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function UpdatePostModal() {

    //context
    const {
        postState: { post },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast,

    } = useContext(PostContext)


    //state
    const [updatedPost, setUpdatedPost] = useState(post)

    const { title, description, url, status } = updatedPost


    //effect
    useEffect(() => setUpdatedPost(post), [post]) //change when click a post to update

    const onChangeUpdatedPostForm = event => setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })


    const closeDialog = () => {
        setUpdatedPost(post)
        setShowUpdatePostModal(false)
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        const { success, message } = await updatePost(updatedPost)

        setShowUpdatePostModal(false)
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
    }



    return (
        <Modal show={showUpdatePostModal} animation={false} onHide={closeDialog} >
            <Modal.Header closeButton>
                <Modal.Title>
                    Making Progress?
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={onSubmit} >
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Title' name='title' required
                            aria-describedby='title-help' value={title} onChange={onChangeUpdatedPostForm}
                        />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control as='textarea' placeholder='Description' name='description' rows={3}
                            className='mb-2' value={description} onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type='text' placeholder='Youtube Tutorial URL' name='url'
                            className='mb-2' value={url} onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control as='select' value={status} name='status'
                            onChange={onChangeUpdatedPostForm}
                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog} >Cancel</Button>
                    <Button variant='primary' type='submit'>LearnIt!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
