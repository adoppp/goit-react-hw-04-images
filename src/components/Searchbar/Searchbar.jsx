import React, { useState } from 'react';
import css from './Searchbar.module.css';

// export class Searchbar extends Component {
//     state = {
//         search: '',
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         const { search } = this.state;
//         if (search === '') {
//             return alert('Enter a response!');
//         }
//         this.props.onSubmit(search)
//         this.setState({ search: '' });
//     }

//     handleChange = e => {
//         this.setState({ search: e.currentTarget.value.toLowerCase().trim() })
//     }

//     render() {
//         return (
//             <header className={css.searchbar}>
//                 <form className={css.form} onSubmit={this.handleSubmit}>
//                     <button type="submit" className={css.button}>
//                     <span className="button-label">Search</span>
//                     </button>

//                     <input
//                     className={css.input}
//                     type="text"
//                     autoComplete="off"
//                     autoFocus
//                     name='input'
//                     placeholder="Search images and photos"
//                     value={this.state.search}
//                     onChange={this.handleChange}
//                     />
//                 </form>
//             </header>
//         )
//     }
// }

export const Searchbar = ({ onSubmit }) => {
    // state = {
    //     search: '',
    // }

    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (search === '') {
            return alert('Enter a response!');
        }

        onSubmit(search)

        setSearch('');
    }

    const handleChange = e => {
        //this.setState({ search: e.currentTarget.value.toLowerCase().trim() })
        setSearch(e.currentTarget.value.toLowerCase().trim())
    }

        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <button type="submit" className={css.button}>
                    <span className="button-label">Search</span>
                    </button>

                    <input
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    name='input'
                    placeholder="Search images and photos"
                    value={search}
                    onChange={handleChange}
                    />
                </form>
            </header>
        )
}