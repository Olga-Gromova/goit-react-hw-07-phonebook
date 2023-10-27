import { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';

const CONTACTS_ID = {
  nameId: nanoid(),
  numberId: nanoid(),
};

const { nameId, numberId } = CONTACTS_ID;

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);

  const isNameDublicated = name => {
    return contacts.some(contact => contact.name === name);
  };

  const isNumberDublicated = number => {
    return contacts.some(contact => contact.number === number);
  };

  const handleChange = ({ name, value }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    if (isNameDublicated(name)) {
      toast.error(
        `, pay attentiion: Contact with name ${name} have already included in this phonebook.`
      );
      return;
    }

    if (isNumberDublicated(number)) {
      toast.error(
        `Please, pay attention: Number ${number} have already included in this phonebook.`
      );
      return;
    }

    dispatch(addContact({ name, number }));

    toast.success(`Contact with nam ${name} was added successfully!`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.formTitle}>Please, input new name & number</h2>
      <label htmlFor={nameId} className={css.formLabel}>
        Name{' '}
      </label>
      <input
        className={css.formInput}
        id={nameId}
        type="text"
        name="name"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        required
        value={name}
        onChange={event => handleChange(event.target)}
        autoComplete="name"
        placeholder="Enter name"
      />

      <label htmlFor={numberId} className={css.formLabel}>
        Number
      </label>
      <input
        className={css.formInput}
        type="tel"
        name="number"
        id={numberId}
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        required
        value={number}
        onChange={event => handleChange(event.target)}
        placeholder="Enter phone number"
      />

      <button type="submit" className={css.formBtn}>
        Add contact
      </button>
    </form>
  );
};
