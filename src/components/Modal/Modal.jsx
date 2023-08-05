import { Component } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';

export class Modal extends Component {
    modalRoot = document.querySelector('#root-modal');

    componentDidMount() {
        window.addEventListener('keydown', this.props.onKeydownClose);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.props.onKeydownClose);
    }
    render() {
        return createPortal(
            <div id="modal-backdrop" className={css.modal} onClick={this.props.onBackdropClose}>
                <div id="modal-window" className={css.modalImg}>
                    {this.props.children}
                </div>
            </div>, this.modalRoot
        )
    }
}