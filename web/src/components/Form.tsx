import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Link, useHistory} from 'react-router-dom';
import {sanitize} from '../util/text';
import {sendQueryEvent} from '../util/analytics';
import {mobile} from '../util/css';
import Suggestion from './Suggestion';
import {useDeferredState} from '../util/hooks';

const Form: React.FC<{
  initialValue?: string;
}> = ({initialValue = ''}) => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestionQuery, setSuggestionQuery] = useDeferredState(800, '');
  const [suggested, setSuggested] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {t} = useTranslation();

  function search(query: string) {
    sendQueryEvent(sanitize(query));
    history.push(`/s/${query}`);
  }

  // set input value
  function onInputChange(e: React.FormEvent<HTMLInputElement>): void {
    setInputValue(e.currentTarget.value);
  }

  // clear input form and focus on it
  function onLogoClick(): void {
    setInputValue('');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    inputRef.current!.focus();
  }

  // invoke when user clicked one of the suggested items
  function onSuggestionCompleted(name: string): void {
    setInputValue(name);
    search(name);
    setSuggested(true);
  }

  function onSubmitQuery(e: React.FormEvent) {
    e.preventDefault();
    if (!inputValue || inputValue === '') {
      return;
    }
    search(inputValue);
  }

  useEffect(() => {
    const modifiedValue = sanitize(inputValue);
    setSuggestionQuery(modifiedValue);
  }, [inputValue, setSuggestionQuery]);

  const queryGiven = suggestionQuery && suggestionQuery !== '';

  return (
    <InputContainer>
      <Logo to="/" onClick={onLogoClick}>
        <LogoImage src="/logo.svg" />
      </Logo>
      <form onSubmit={onSubmitQuery} action="/s" role="search">
        <InputView
          onChange={onInputChange}
          value={inputValue}
          ref={inputRef}
          placeholder={t('placeholder')}
          aria-label="Search"
        />
      </form>
      {queryGiven && !suggested ? (
        <Suggestion onSubmit={onSuggestionCompleted} query={suggestionQuery} />
      ) : null}
    </InputContainer>
  );
};

export default Form;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  transform: translateY(40px);
  border-radius: 50px;
  box-shadow: 0 10px 50px 0 #858efb;
  background: #ffffff;

  ${mobile} {
    padding: 20px;
    transform: translateY(20px);
    border-radius: 30px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 5px;
  cursor: pointer;

  ${mobile} {
    font-size: 15px;
  }
`;

const LogoImage = styled.img`
  width: 140px;

  ${mobile} {
    width: 90px;
  }
`;

const InputView = styled.input.attrs({
  type: 'search',
  autocomplete: 'off',
  autocorrect: 'off',
  autocapitalize: 'off',
  spellcheck: 'false',
})`
  width: 100%;
  border: none;
  outline: none;
  text-align: center;
  font-family: 'Montserrat', monospace;
  font-weight: 600;
  font-size: 6rem;
  appearance: none;

  ${mobile} {
    font-size: 2rem;
  }

  ::placeholder {
    color: #c8cdda;
  }
`;
