import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import css from '../../Styles.module.css';
import { FcSearch } from 'react-icons/fc';

export default class Searchbar extends Component {
    state = {
        value: '',
         }

    handleInput = (e) => {
        this.setState({ value: e.currentTarget.value.toLowerCase()})
    }
    
    handleSumbit = e => {
        e.preventDefault();
        const { value } = this.state;
        if (value.trim() === '') {
            toast.warning('Буляска введіть запит');
            return
        }
        this.props.onSubmit(value);
        this.setState({value: ''})
    }

    render() {
        return (
            <header className={css.searchbar}>
                <form onSubmit={this.handleSumbit} className={css.searchform}>
                    <button type="submit" className={css.button}>
                        <FcSearch size={32} />
      <span className={css.button_label}>Search</span>
    </button>

    <input
      className={css.input}
      type="text"
      autoComplete="off"
    autoFocus
     value={this.state.value}
     placeholder="Search images and photos"
     onChange={this.handleInput}
    />
  </form>
</header>
        )          
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
    value: PropTypes.string
}
