import './Input.scss'


const Input = ({ setComment, addComment, comment }) => {
    return (
        <input type="text"
            onChange={(event) => {
                setComment(event.target.value)
            }}
            onKeyDown={event => {
                if (event.keyCode === 13) {
                    addComment()
                }
            }}
            value={comment}
        />
    )
}

export default Input