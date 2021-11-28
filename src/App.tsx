import logo from './logo.svg'
import './App.css'
import { ChangeEvent, VFC, useEffect, useState, useCallback } from 'react'
import axios from 'axios'

type StudyLog = {
  id: number
  title: string
  memo: string
  elapsed_time: number
}

const App: VFC = () => {
  console.log('call App')
  axios.defaults.baseURL = process.env.REACT_APP_DEV_API_URL

  const [values, setValues] = useState({
    title: '',
    memo: '',
    elapsed_time: '',
  })
  console.log(values)
  const [StudyLogs, setStudyLogs] = useState<Array<StudyLog>>([])

  const fetchStudyLogs = () => {
    axios
      .get<Array<StudyLog>>('study_logs')
      .then((res) => {
        console.log(res)
        setStudyLogs(res.data)
      })
      .catch((err) => console.log(err))
    console.log('call fetch')
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const name = target.name
    const value =
      name === 'elapsed_time' && target.value !== ''
        ? Number(target.value)
        : target.value
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = () => {
    console.log(values)
    const params = {
      study_log: {
        title: values.title,
        memo: values.memo,
        elapsed_time: values.elapsed_time,
      },
    }
    axios
      .post('/study_logs', params)
      .then((res) => {
        fetchStudyLogs()
        setValues({
          title: '',
          memo: '',
          elapsed_time: '',
        })
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchStudyLogs()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleInputChange}
            placeholder="title"
          />
          <input
            name="memo"
            value={values.memo}
            onChange={handleInputChange}
            placeholder="title"
          />
          <input
            type="text"
            name="memo"
            value={values.elapsed_time}
            onChange={handleInputChange}
            placeholder="time"
          />
          <button onClick={handleSubmit}>submit</button>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {StudyLogs.map((study_log, index) => (
          <div key={index}>{study_log.title}</div>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
