import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useStoreActions } from '../store';
import { sendQueryEvent } from '../util/analytics';
import { mobile } from '../util/css';
import { useDeferredState } from '../util/hooks';
import { sanitize } from '../util/text';
import Suggestion from './Suggestion';

const Form: React.FC<{
  initialValue?: string;
}> = ({ initialValue = '' }) => {
  const reset = useStoreActions((actions) => actions.stats.reset);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestionQuery, setSuggestionQuery] = useDeferredState(800, '');
  const [suggested, setSuggested] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  function search(query: string) {
    reset();
    sendQueryEvent(sanitize(query));
    navigate(`/s/${query}`);
  }

  // set input value
  function onInputChange(e: React.FormEvent<HTMLInputElement>): void {
    setInputValue(e.currentTarget.value);
  }

  // invoke when user clicked one of the suggested items
  function onSuggestionCompleted(name: string): void {
    setInputValue(name);
    search(name);
    setSuggested(true);
  }

  function onSubmitQuery(e: React.FormEvent) {
    e.preventDefault();
    inputRef.current!.blur();
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
      <InputHeader>
        <Logo to="/">
          <LogoImage src="/logo.svg" />
        </Logo>
      </InputHeader>
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

const InputHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 12px 0 5px 0;
`;

const Logo = styled(Link)`
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
  enterkeyhint: 'search',
  autocomplete: 'off',
  autocorrect: 'off',
  autocapitalize: 'off',
  spellcheck: 'false',
  autoFocus: true,
})`
  width: 100%;
  border: none;
  outline: none;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
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
