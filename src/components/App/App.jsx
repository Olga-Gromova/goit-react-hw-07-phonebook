// import css from './app.module.css';
// import { ContactForm, Filter, ContactList } from 'components';

// export const App = () => {
//   return (
//     <div className={css.mainDiv}>
//       <h1 className={css.mainTitle}>Phonebook</h1>
//       <ContactForm />

//       <h2 className={css.mainTitleContacts}>Contacts</h2>
//       <Filter />
//       <ContactList />
//     </div>
//   );
// };
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { getContacts, getError, getIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Loader } from 'components/Loader/Loader';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import css from './app.module.css';
import { GiHollowCat } from 'react-icons/gi';


// import { ContactList } from 'components/ContactList/ContactList';
// import { ContactForm } from 'components';
// // import { Section } from './Section/Section';
// // import { Container } from './App.styled';
// import { Filter } from 'components';
// import { Loader } from 'components';
// import { AppBar } from './AppBar/AppBar';

export const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  // Викликаємо операцію
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Виводимо помилку
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className={css.mainDiv}>
      <h1 className={css.mainTitle}>Phonebook</h1>
      
        <ContactForm />
      <h2 className={css.mainTitleContacts}>Contacts</h2>
      {contacts?.length === 0 ? ( 
        <div className={css.emptyDiv}><GiHollowCat className={css.emptyIcon}/><p className={css.emptyText}>...Here is empty</p></div>
        ) : (<div>
        {isLoading && <Loader />}
        {!isLoading && contacts.length > 0 && <Filter/>}
        {!isLoading && contacts.length > 0 && <ContactList />}
      </div>)
}
      
      <Toaster position="top-center" />
    </div>
  );
};