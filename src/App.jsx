import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Saludo from "./saludo.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div>
            <Saludo nombre="Juan" tipo="días" />
        </div>
    </>
  )
}

export default App
