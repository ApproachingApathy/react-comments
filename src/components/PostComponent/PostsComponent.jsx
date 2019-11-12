import React from 'react'
import '../CommentBoard'
import CommentBoard from '../CommentBoard'
import '../../styles/commentboard.css'
import '../../styles/postscomponent.css'

class Post {
    constructor(author, contentObj, reactions = {}) {
        this.author = author
        this.content = contentObj
        this.reactions = reactions
        this.created = new Date()
        this.edited = {hasBeenEdited: false, editDate: new Date()}
        this.comments = []
    }

    edit(editObj) {
        this.content = this.content.assign(editObj)
        this.edited = {hasBeenEdited: true, editDate: new Date()}
    }

    addReaction(reactionKey) {
        this.reactions[reactionKey] = this.reactions[reactionKey]++ ? this.reactions[reactionKey]: 1
    }

    addComments(commentObj) {
        this.comments.push(commentObj)
    }
}

export default class PostComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {posts:[], values:{}}
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        let newObj = {...this.state.values} || {}
        newObj[e.target.name] = e.target.value
        // console.log(newObj)
        this.setState({values:newObj})
    }

    handleSubmit(e) {
        e.preventDefault()
        let post = new Post(this.state.values.poster, {text:this.state.values.postText})
        let newArr = [...this.state.posts]
        newArr.push(post)
        this.setState({posts:newArr})
    }

    handleReaction(index, reactionKey) {
        let newArr = [...this.state.posts]
        newArr[index].addReaction(reactionKey)
        this.setState({posts:newArr})
    }

    
    render() {
        let posts = this.state.posts.map((post, index) => {
            return (
                <>
                    <li className="post-item" key={index}>
                        <div className="post">
                            <div className="post-author">
                                <h3>{post.author}</h3>
                                <hr/>
                            </div>
                            <div className="post-content">
                                {post.content.text ? post.content.text : null}
                                <hr/>
                            </div>
                            <div className="reaction-bar">
                                <ul>
                                    <li>
                                        <button onClick={e => this.handleReaction(index, 'thumbs')}>
                                            {' 👍 | ' +  (post.reactions.thumbs ? post.reactions.thumbs: 0)}
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={e => this.handleReaction(index, 'thumbsDown')}>
                                            {' 👎 | ' +  (post.reactions.thumbsDown ? post.reactions.thumbsDown: 0)}
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={e => this.handleReaction(index, 'hearts')}>
                                            {' 💖 | ' +  (post.reactions.hearts ? post.reactions.hearts: 0)}
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={e => this.handleReaction(index, 'awards')}>
                                            {' 🏅 | ' +  (post.reactions.awards ? post.reactions.awards: 0)}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <CommentBoard />
                        </div>
                    </li>
                </>
            )
        })

        return (
            <>
                <div className="post-entry">
                    <form onSubmit={this.handleSubmit} className="post-form">
                        <div className="form-group">
                            <label htmlFor="">Poster</label>
                            <br/>
                            <input className='input' name='poster' type="text" placeholder='Enter your name.' value={this.state.values.poster} onChange={e => this.handleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="text">Text Post</label>
                            <br/>
                            <textarea className='input' name="postText" id="post" cols="30" rows="10" value={this.state.values.postText} onChange={e => this.handleChange(e)} ></textarea>
                        </div>
                        <button>Submit Post</button>
                    </form>
                    
                </div>
                <div className="posts-section">
                    <ul className="posts">
                        {posts}
                    </ul>
                </div>
            </>
        )
    }
}