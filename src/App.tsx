import './App.css'
import { NewsCard } from './components/NewsCard/NewsCard'
import { MOCK_DATA } from './services/data.mock'

function App() {

  return (
    <>
      <NewsCard data={MOCK_DATA} />
    </>
  )
}

export default App
