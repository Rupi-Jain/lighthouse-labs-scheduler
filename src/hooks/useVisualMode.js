import { useState, useEffect } from 'react'

export default function useVisualMode(initial) {
  //const [mode, setMode] = useState(initial);
  // const [history, setHistory] = useState([initial])
  // const transition = (newMode, replace = false) => {  
  //   if(replace) {
  //     history[history.length-1] = newMode;
  //   } else {
  //     history.push(newMode);
  //   }    
  //   setMode(newMode);
  //   setHistory(history);
  //  // console.log("trans", history);
  // }
  
  // function back() {
  //   if (history.length > 1) {
  //      history.pop();
  //      setMode(history[history.length-1]);
  //      setHistory(history);
  //   }
  //  // console.log("back",history)
  // }
  // return {mode, transition, back};
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

 // This is what we are doing in the above code ^
  //----------------------------------------------
  // function transition(mode, replace = false) {
  //   setHistory(prev => {
  //     const newHistory = [...prev];

  //     if (replace) {
  //       newHistory.pop()
  //     }

  //     newHistory.push(mode)
  //     return newHistory
  //   });
  // }

 