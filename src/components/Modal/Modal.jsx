import { useEffect} from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';

// export class Modall extends Component {
//     modalRoot = document.querySelector('#root-modal');

//     componentDidMount() {
//         window.addEventListener('keydown', this.props.onKeydownClose);
//     }
//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.props.onKeydownClose);
//     }
//     render() {
//         return createPortal(
//             <div id="modal-backdrop" className={css.modal} onClick={this.props.onBackdropClose}>
//                 <div id="modal-window" className={css.modalImg}>
//                     {this.props.children}
//                 </div>
//             </div>, this.modalRoot
//         )
//     }
// }

export const Modal = ({ onKeydownClose, onBackdropClose, children }) => {
    const modalRoot = document.querySelector('#root-modal');

    // componentDidMount() {
    //     window.addEventListener('keydown', this.props.onKeydownClose);
    // }

    useEffect(() => {
    window.addEventListener('keydown', onKeydownClose);
    return () => {
      window.removeEventListener('keydown', onKeydownClose);
    };
    },);

    // componentWillUnmount() {
    //     window.removeEventListener('keydown', onKeydownClose);
    // }

        return createPortal(
            <div id="modal-backdrop" className={css.modal} onClick={onBackdropClose}>
                <div id="modal-window" className={css.modalImg}>
                    {children}
                </div>
            </div>, modalRoot
        )
}