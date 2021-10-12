import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function AddPostModal() {

    //context
    const { showAddPostModal, setShowAddPostModal, addPost,
        setShowToast
    } = useContext(PostContext)


    //state
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    const { title, description, url } = newPost

    const onChangeNewPostForm = event => setNewPost({ ...newPost, [event.target.name]: event.target.value })

    const resetAddPostData = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
        setShowAddPostModal(false)
    }

    const closeDialog = () => {
        resetAddPostData()
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const { success, message } = await addPost(newPost)

        resetAddPostData()
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
    }



    return (
        <Modal show={showAddPostModal} animation={false} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>
                    What do you want to learn?
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={onSubmit} >
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Title' name='title' required
                            aria-describedby='title-help' value={title} onChange={onChangeNewPostForm}
                        />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control as='textarea' placeholder='Description' name='description' rows={3}
                            className='mb-2' value={description} onChange={onChangeNewPostForm}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type='text' placeholder='Youtube Tutorial URL' name='url'
                            value={url} onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'>LearnIt!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
