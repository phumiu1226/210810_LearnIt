import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext } from '../../contexts/PostContext'
import { useContext } from 'react'


export default function ActionButtons({ url, _id }) {

    const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext)

    const choosePost = (postId) => {
        findPost(postId)
        setShowUpdatePostModal(true)
    }

    return (
        <div>
            <>
                <Button className='post-button' href={url} target='_blank'>
                    <img src={playIcon} height="32" width="32" alt='playIcon' />
                </Button>
                <Button className='post-button' onClick={choosePost.bind(this, _id)}>
                    <img src={editIcon} height="24" width="24" alt='editIcon' />
                </Button>
                <Button className='post-button' onClick={deletePost.bind(this, _id)}>
                    <img src={deleteIcon} height="24" width="24" alt='deleteIcon' />
                </Button>
            </>
        </div>
    )
}
