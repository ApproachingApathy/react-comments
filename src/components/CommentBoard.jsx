import React from 'react'
import '../styles/commentboard.css'
class Comment {
    constructor(author, text, reactionObj = {}) {
        this.author = author
        this.text = text
        this.reactions = reactionObj
        this.created = new Date()
        this.edited = {hasBeenEdited: false, editDate:new Date()}
    }

    edit(newComment) {
        this.text = newComment
        this.edited = {hasBeenEdited: true, editDate: new Date()}
    }

    addReaction(reactionKey) {
        this.reactions[reactionKey] = this.reactions[reactionKey]++ ? this.reactions[reactionKey]: 1
    }

}


export default class CommentBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {comments:[], values:{}}
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(e) {
        let newObj = {...this.state.values} || {}
        console.log(newObj)
        newObj[e.target.name] = e.target.value
        this.setState({values:newObj}, () => console.log(this.state.values))
    }

    handleSubmit(e) {
        e.preventDefault()
        let comment = new Comment(this.state.values.commenter, this.state.values.text)
        let newArr = [...this.state.comments]
        newArr.push(comment)
        this.setState({comments:newArr}, ()=> console.log(this.state.comments))

    }

    handleReaction(index, reactionKey) {
        let newArr = [...this.state.comments]
        newArr[index].addReaction(reactionKey)
        this.setState({comments:newArr})
    }

    render() {
        let comments = this.state.comments.map((comment, index)=>{
            // console.log(this.state.values)
            // console.log(comment)
            return (
                <>
                    <li className="comment-item" key={index}>
                        <div className="comment">
                            <div className="comment-author">
                                <h3>{comment.author}</h3>
                                <hr/>
                            </div>
                            <div className="comment-text">
                                {comment.text}
                                <hr/>
                            </div>
                            <div className="reaction-bar">
                                <ul>
                                    <li>
                                        <button onClick={e => this.handleReaction(index, 'thumbs')}>
                                            {' 👍 | ' +  (comment.reactions.thumbs ? comment.reactions.thumbs: 0)}
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={e => this.handleReaction(index, 'thumbsDown')}>
                                            {' 👎 | ' +  (comment.reactions.thumbsDown ? comment.reactions.thumbsDown: 0)}
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={e => this.handleReaction(index, 'hearts')}>
                                            {' 💖 | ' +  (comment.reactions.hearts ? comment.reactions.hearts: 0)}
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={e => this.handleReaction(index, 'awards')}>
                                            {' 🏅| ' +  (comment.reactions.awards ? comment.reactions.awards: 0)}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </>
            )
        })
        return (
            <>
                <div className="comment-entry">
                    <form className='comment-form' onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="commenter">Commenter</label>
                            <br/>
                            <input className='input' name='commenter' type="text" placeholder='Enter your name.' value={this.state.values.commenter} onChange={e => this.handleChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="text">Comment</label>
                            <br/>
                            <textarea className='input' name="text" id="comment" cols="30" rows="10" value={this.state.values.text} onChange={e => this.handleChange(e)} ></textarea>
                        </div>
                        <button>Submit Comment</button>
                    </form>
                </div>
                <hr/>
                <div className="comments-section">
                    <ul className="comments">
                        {comments}
                    </ul>
                </div>
            </>
        )
    }
}