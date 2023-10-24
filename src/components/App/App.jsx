import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GiHollowCat } from 'react-icons/gi';

import { getContacts, getError, getIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Loader } from 'components/Loader/Loader';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import css from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className={css.mainDiv}>
      <h1 className={css.mainTitle}>Phonebook</h1>

      <ContactForm />
      <h2 className={css.mainTitleContacts}>Contacts</h2>
      {contacts?.length === 0 ? (
        <div className={css.emptyDiv}>
          <GiHollowCat className={css.emptyIcon} />
          <p className={css.emptyText}>...Here is empty</p>
        </div>
      ) : (
        <div>
          {isLoading && <Loader />}
          {!isLoading && contacts.length > 0 && <Filter />}
          {!isLoading && contacts.length > 0 && <ContactList />}
        </div>
      )}

      <Toaster position="top-center" />
    </div>
  );
};
