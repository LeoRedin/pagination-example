import * as React from 'react'

const URL = 'https://swapi.dev/api/people'

const span = {
  padding: '16px'
}

function App () {
  const [people, setPeople] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [next, setNext] = React.useState()
  const [previous, setPrevious] = React.useState()

  React.useEffect(() => {
    async function fetchPeople () {
      const people = await window.fetch(`${URL}`)
      const peopleJson = await people.json()

      setPeople(peopleJson.results)
      setNext(peopleJson.next)
      setPrevious(peopleJson.previous)
    }

    fetchPeople()
  }, [])

  const handlePagination = async (type) => {
    if (type === 'next') {
      const people = await window.fetch(next)
      const peopleJson = await people.json()

      setPrevious(peopleJson.previous)
      setNext(peopleJson.next)
      setPeople(peopleJson.results)
      setPage(page + 1)
    } else {
      const people = await window.fetch(previous)
      const peopleJson = await people.json()

      setPrevious(peopleJson.previous)
      setNext(peopleJson.next)
      setPeople(peopleJson.results)
      setPage(page - 1)
    }
  }

  return (
    <div>
      <div>
        <button disabled={!previous} onClick={() => handlePagination('prev')}>
          {'<<'}
        </button>
        <span style={span}>{page}</span>
        <button disabled={!next} onClick={() => handlePagination('next')}>
          {'>>'}
        </button>
      </div>
      <pre>{JSON.stringify(people, null, 2)}</pre>
    </div>
  )
}

export default App
