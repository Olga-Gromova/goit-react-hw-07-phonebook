// import { ContactElement } from 'components';
// import { useSelector } from 'react-redux';

// import { getContacts, getFilter } from 'redux/selectors';

// const getFilteredContacts = (contacts, filter) => {
//   return contacts?.filter(contact =>
//     contact.name.toLowerCase().includes(filter.toLowerCase())
//   );
// };

// export const ContactList = () => {
//   const contacts = useSelector(getContacts);
//   const filter = useSelector(getFilter);
//   const filteredContacts = getFilteredContacts(contacts, filter);

//   return (
//     <ul>
//       {filteredContacts?.map(({ name, number, id }) => {
//         return (
//           <ContactElement
//             key={id}
//             name={name}
//             number={number}
//             id={id}
//           ></ContactElement>
//         );
//       })}
//     </ul>
//   );
// };

import { ContactElement } from 'components/ContactElement/ContactElement';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
// import { getContacts, getFilter } from 'redux/';



const getFilteredContacts = (contacts, filter) => {
  return contacts?.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filteredContacts = getFilteredContacts(contacts, filter);

  return (
    <ul>
      {filteredContacts?.map(contact => {
        return (
          <ContactElement
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}>
            
          </ContactElement>
        );
          
      })}
    </ul>
  );
};
