import React, { useEffect, useState } from 'react'
export const Context = React.createContext(0);

/*This Provider gives the total number of lines to the app and reports errors */
function Status({children}) {
  const [status, setStatus] = useState(0)
  const [error, setError] = useState(null)
  useEffect(() => {
    let fetching = false
    //use interval to poll every second for the status
    setInterval(async () => {
      if (fetching) return // prevent multiple fetches if still waiting for a response
      fetching = true
      try {
        const response = await fetch('/status')
        if(response.status === 200){
          const json = await response.json()
          setStatus(json.size)
          setError(null)
        } else if(response.status === 503){
          setError('Log file not ready yet')
        }
      } catch(e){
          setError('Failed to reach Node service, check it\'s running')
      } finally {
        fetching = false
      }
    }, 1000)
  }, [])
  return (
    <Context.Provider value={{status, error}}>
      {children}
    </Context.Provider>
  );
}

export default Status;
