import css from './Button.module.css'

export const Button = ({ children, handleClick }) => {

    return (
        <div className={css.btnContainer}>
            <button
                type="button"
                className={css.button}
                onClick={handleClick}
            >{children}</button>
        </div>
    )
}