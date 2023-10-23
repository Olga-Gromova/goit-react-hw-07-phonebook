// import { nanoid } from 'nanoid';
// import css from './ContactForm.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { getContacts } from 'redux/selectors';
// import { addContact } from 'redux/operations';

// const LABEL_IDS = {
//   nameId: nanoid(),
//   numberId: nanoid(),
// };

// const { nameId, numberId } = LABEL_IDS;

// export const ContactForm = () => {
//   const dispatch = useDispatch();
//   const contact = useSelector(getContacts);

//   const onFormSubmit = async e => {
//     e.preventDefault();
//     const name = e.target.elements.name.value;
//     const number = e.target.elements.number.value;

//     if (contact.some(e => e.name === name)) {
//       alert(
//         `Please, pay attentiion: Contact with name "${name}" have already included in this phonebook.`
//       );
//       return;
//     }
//     const payload = { name, number };

//     dispatch(addContact(payload));
//     e.target.reset();
//   };

//   return (
//     <form className={css.form} onSubmit={onFormSubmit}>
//       <h2 className={css.formTitle}>Please, input new name & number</h2>
//       <label htmlFor={nameId}>Name</label>
//       <input
//         className={css.formInput}
//         id={nameId}
//         type="text"
//         name="name"
//         pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//         title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//         required
//         placeholder="Enter name"
//         autoComplete="name"
//       />
//       <label htmlFor={numberId}>Number</label>
//       <input
//         className={css.formInput}
//         id={numberId}
//         type="tel"
//         name="number"
//         pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
//         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//         required
//         placeholder="Enter phone number"
//       />
//       <button type="submit" className={css.formBtn}>
//         Add contact
//       </button>
//     </form>
//   );
// };
import { nanoid } from 'nanoid';
import { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import toast from 'react-hot-toast';

const LABEL_IDS = {
  nameId: nanoid(),
  numberId: nanoid(),
};

const { nameId, numberId } = LABEL_IDS;

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);

  const isNameHas = name => {
    return contacts.some(contact => contact.name === name);
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

    if (isNameHas(name)) {
      toast.error(`Please, pay attentiion: Contact with name ${name} have already included in this phonebook.`);
      return;
    }

    dispatch(addContact({ name, number }));

    reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.formTitle}>Please, input new name & number</h2>
      <label htmlFor={nameId} className={css.formLabel}>
        Name </label>
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
        Number</label>
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
      
      <button type="submit" className={css.formBtn}>Add contact</button>
    </form>
  );
};