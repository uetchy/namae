import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Link, useHistory} from 'react-router-dom';
import {sanitize} from '../util/text';
import {sendQueryStatistics} from '../util/analytics';
import {useDeferredState} from '../util/hooks';
import {mobile} from '../util/css';
import Suggestion from './Suggestion';

const Form: React.FC<{
  initialValue?: string;
}> = ({initialValue = ''}) => {
  const history = useHistory();
  const [query, setQuery] = useDeferredState(800, '');
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggested, setSuggested] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {t} = useTranslation();

  // set input value
  function onInputChange(e: React.FormEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value;
    setInputValue(value);
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
    setSuggested(true);
  }

  const queryGiven = query && query.length > 0;

  useEffect(() => {
    function onQuery(query: string) {
      if (!query || query === '') {
        return;
      }
      sendQueryStatistics(query.length);
      history.push(`/s/${query}`);
    }

    if (query.length === 0) {
      setSuggested(false);
    } else {
      onQuery(query);
    }
  }, [query, history]);

  useEffect(() => {
    const modifiedValue = sanitize(inputValue);
    setQuery(modifiedValue);
  }, [inputValue, setQuery]);

  return (
    <InputContainer>
      <Logo onClick={onLogoClick}>
        <Link to="/">namae</Link>
      </Logo>
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
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: #4a90e2;
  cursor: pointer;

  ${mobile} {
    font-size: 15px;
  }

  a:link,
  a:active,
  a:visited {
    text-decoration: none;
    color: #4a90e2;
  }

  a:hover {
    text-decoration: none;
    color: #0075ff;
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
  font-family: 'Montserrat', monospace;
  font-weight: 600;
  font-size: 5rem;
  line-height: 1.2em;
  transition: opacity 100ms ease-out;

  &:hover {
    opacity: 0.9;
  }

  ${mobile} {
    font-size: 2rem;
  }
`;
