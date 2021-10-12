import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'
import { API_URL, POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from './constants'
import axios from 'axios'


export const PostContext = createContext()


const PostContextProvider = ({ children }) => {

    //state
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    //Get all post
    const getPosts = async () => {
        try {
            const response = await axios.get(`${API_URL}/posts`)
            if (response.data.success) {
                dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
            }
        } catch (err) {
            dispatch({ type: POSTS_LOADED_FAIL })
        }
    }

    //Add post
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${API_URL}/posts`, newPost)
            if (response.data.success) {
                dispatch({ type: ADD_POST, payload: response.data.post })
                return response.data
            }
        } catch (err) {
            return err.response.data ? err.response.data : { success: false, message: 'Server error' }
        }
    }

    //Delete post
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${API_URL}/posts/${postId}`)
            if (response.data.success) {
                dispatch({ type: DELETE_POST, payload: postId })
            }
        } catch (err) {
            console.log(err)
            return err.response.data ? err.response.data : { success: false, message: 'Server error' }
        }
    }

    //Update post
    const updatePost = async updatedPost => {
        try {
            const response = await axios.put(`${API_URL}/posts/${updatedPost._id}`, updatedPost)
            if (response.data.success) {
                dispatch({ type: UPDATE_POST, payload: response.data.post })
                return response.data
            }
        } catch (err) {
            console.log(err)
            return err.response.data ? err.response.data : { success: false, message: 'Server error' }
        }
    }

    //Find post when user is updating post
    const findPost = postId => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({ type: FIND_POST, payload: post })

    }
    //post context data
    const postContextData = {
        postState, getPosts,
        showAddPostModal, setShowAddPostModal, addPost,
        showToast, setShowToast,
        deletePost,
        updatePost, findPost, setShowUpdatePostModal, showUpdatePostModal
    }

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider