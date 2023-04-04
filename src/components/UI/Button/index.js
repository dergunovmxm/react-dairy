import './Button.scss'

const Button = ({ value }) => {
    
    return (
        <button className="button-container">
            {value}
        </button>
    )
}

export default Button