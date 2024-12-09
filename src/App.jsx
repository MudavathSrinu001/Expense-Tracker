import { useState } from 'react'
import Project from './componets/project'
import BudgetApp from './componets/project'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BudgetApp/>  
    </>
  )
}

export default App
