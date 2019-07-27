import React from 'react'
import './App.css'

function useDeferredState(duration) {
  const [response, setResponse] = React.useState()
  const [innerValue, setInnerValue] = React.useState()

  React.useEffect(() => {
    const fn = setTimeout(() => {
      setResponse(innerValue)
    }, duration)

    return () => {
      clearTimeout(fn)
    }
  }, [duration, innerValue])

  return [response, setInnerValue]
}

async function githubAvailability(name) {
  const response = await fetch(`/availability/github/${name}`)
  const json = await response.json()
  return json.availability
}

async function npmAvailability(name) {
  const response = await fetch(`/availability/npm/${name}`)
  const json = await response.json()
  return json.availability
}

function App() {
  const [query, setQuery] = useDeferredState(1000) // 1sec 遅延
  const [githubOrg, setGithubOrg] = React.useState()
  const [npmOrg, setNpmOrg] = React.useState()

  function onChange(e) {
    setQuery(e.target.value)
  }

  React.useEffect(() => {
    const fn = async () => {
      if (!query) return
      const github = await githubAvailability(query)
      const npm = await npmAvailability(query)
      setGithubOrg(github)
      setNpmOrg(npm)
    }
    fn()
  }, [query])

  return (
    <div>
      <header>
        <input onChange={onChange} />
      </header>
      <div>
        {githubOrg !== undefined && (
          <div>
            github.com/
            {githubOrg ? (
              <span style={{ color: 'blue' }}>{query}</span>
            ) : (
              <span style={{ color: 'red' }}>{query}</span>
            )}
          </div>
        )}
      </div>
      <div>
        {npmOrg !== undefined && (
          <div>
            npmjs.com/~
            {npmOrg ? (
              <span style={{ color: 'blue' }}>{query}</span>
            ) : (
              <span style={{ color: 'red' }}>{query}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
