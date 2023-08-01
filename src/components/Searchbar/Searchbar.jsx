import React, { Component } from 'react';
import css from '../../Styles.module.css';
export default class Searchbar extends Component {
    state = {
        value: ''
    }

    handleInput = (e) => {
        this.setState({ value: e.currentTarget.value.toLowerCase()})
    }
    
    handleSumbit = e => {
        e.preventDefault();
        const { value } = this.state;
        if (value.trim() === '') {
            alert('alert');
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
