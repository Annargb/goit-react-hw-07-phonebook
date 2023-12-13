import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { selectIsLoading, selectError } from 'redux/selectors';
import { ContactsForm } from './ContactsForm-component/ContactsForm';
import { GlobalStyle } from './GlobalStyle';
import {
  MainTitle,
  Section,
  ContactsTitle,
  Wrapper,
  AccentMainTitle,
} from './App.styled';
import { GroupComponent } from './Group-component/GroupComponent';
import { InfoMessage } from './InfoMessage-component/InfoMessage';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Wrapper>
      <Section>
        <MainTitle>
          Phone<AccentMainTitle>book</AccentMainTitle>
        </MainTitle>
        <ContactsForm />
      </Section>
      <Section>
        <ContactsTitle>Contacts</ContactsTitle>
        {isLoading && !error && (
          <InfoMessage text="Request in progress..." $variant="primary" />
        )}
        {error && (
          <InfoMessage
            text="Something went wrong. Try reloading the page 🥺"
            $variant="secondary"
          />
        )}
        {!isLoading && !error && <GroupComponent />}
      </Section>
      <GlobalStyle />
    </Wrapper>
  );
};
