import { useState} from 'react'

export default function useVisualMode(initial) {
  
  const [history, setHistory] = useState([initial])
   
  function transition(mode, replace = false) {
    setHistory(prev => replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]);
  }
  function back() {
    if (history.length < 2) {
      return
    }

    setHistory(prev => {
      return [...prev.slice(0, history.length - 1)]
    })
  }
  
  const mode = history[history.length - 1];

  return { mode, transition, back };
}

 