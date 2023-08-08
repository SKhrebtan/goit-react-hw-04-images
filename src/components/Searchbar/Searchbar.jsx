import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import css from '../../Styles.module.css';
import { FcSearch } from 'react-icons/fc';

export default function Searchbar ({onSubmit}) {
    const [value, setValue] = useState(''); 

   const handleInput = (e) => {
        setValue(e.currentTarget.value.toLowerCase())
    }
    
    const handleSumbit = e => {
        e.preventDefault();
                if (value.trim() === '') {
            toast.warning('Буляска введіть запит');
            return
        }
        onSubmit(value);
        setValue('');
    }

        return (
            <header className={css.searchbar}>
                <form onSubmit={handleSumbit} className={css.searchform}>
                    <button type="submit" className={css.button}>
                        <FcSearch size={32} />
      <span className={css.button_label}>Search</span>
    </button>

    <input
      className={css.input}
      type="text"
      autoComplete="off"
    autoFocus
     value={value}
     placeholder="Search images and photos"
     onChange={handleInput}
    />
  </form>
</header>
        )          
    
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
    value: PropTypes.string
}
