import './Button.scss'

const Button = ({ value }) => {
    return (
        <button className="button__container">
            {value}
        </button>
    )
}

export default Button