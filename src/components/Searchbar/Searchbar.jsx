import React from 'react';
import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
    state = {
        search: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { search } = this.state;
        if (search === '') {
            return alert('Enter a response!');
        }
        this.props.onSubmit(search)
        this.setState({ search: '' });
    }

    handleChange = e => {
        this.setState({ search: e.currentTarget.value.toLowerCase().trim() })
    }

    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.handleSubmit}>
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
                    value={this.state.search}
                    onChange={this.handleChange}
                    />
                </form>
            </header>
        )
    }
}