import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {useDeferredState} from '../util/hooks';
import {mobile} from '../util/css';

import Suggestion from './Suggestion';

const Form: React.FC<{onQuery: (query: string) => void}> = ({onQuery}) => {
  const [query, setQuery] = useDeferredState(800, '');
  const [inputValue, setInputValue] = useState('');
  const [suggested, setSuggested] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {t} = useTranslation();

  // set input value
  function onInputChange(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setInputValue(value);
  }

  // clear input form and focus on it
  function onLogoClick(e: React.MouseEvent<HTMLDivElement>) {
    setInputValue('');
    inputRef.current!.focus();
  }

  // invoke when user clicked one of the suggested items
  function onSuggestionCompleted(name: string) {
    setInputValue(name);
    setSuggested(true);
  }

  const queryGiven = query && query.length > 0;

  useEffect(() => {
    if (query.length === 0) {
      setSuggested(false);
    }
    onQuery(query);
  }, [query, onQuery]);

  useEffect(() => {
    const modifiedValue = inputValue.replace(/[\s@+!#$%^&*()[\]]/g, '');
    setQuery(modifiedValue);
  }, [inputValue, setQuery]);

  return (
    <InputContainer>
      <Logo onClick={onLogoClick}>namæ</Logo>
      <InputView
        onChange={onInputChange}
        value={inputValue}
        ref={inputRef}
        placeholder={t('placeholder')}
        aria-label="search query"
      />
      {queryGiven && !suggested ? (
        <Suggestion onSubmit={onSuggestionCompleted} query={query} />
      ) : null}
    </InputContainer>
  );
};

export default Form;

const InputContainer = styled.div`
  transform: translateY(40px);
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 10px 20px 0 #c7dcf7;
  border-radius: 20px;

  ${mobile} {
    transform: translateY(20px);
  }
`;

const Logo = styled.div`
  margin-bottom: 5px;
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: #4a90e2;
  cursor: pointer;

  ${mobile} {
    font-size: 15px;
  }
`;

const InputView = styled.input.attrs({
  type: 'text',
  autocomplete: 'off',
  autocorrect: 'off',
  autocapitalize: 'off',
  spellcheck: 'false',
})`
  width: 100%;
  border: none;
  outline: none;
  text-align: center;
  font-family: monospace;
  font-size: 5rem;
  line-height: 1.2em;

  ${mobile} {
    font-size: 2rem;
  }
`;
