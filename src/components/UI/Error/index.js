import './Error.scss'

const Error = (props) => {
    return(
        <div className='error'>
            {props.children}
        </div>
    )
}

export default Error