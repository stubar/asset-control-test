import React, { useCallback, useState } from 'react'
export const Context = React.createContext(0);



/*This Provider fetches and provides the log array */
function Log({children}) {
  const [log, setLog] = useState([])

  const getLogs = useCallback(async (line, pageSize) => {
    try{
      const response = await fetch(`/get-logs?fromLine=${line}&pageSize=${pageSize}`)
      const json = await response.json()
      setLog(log => [...log,...json])
    }catch(e) {
      if (e.statusCode === 503) {
        console.log('Log file not ready yet')
      } else {
        console.error('Failed to reach Node service, check it\'s running')
      }
    }

  },[])

  return (
    <Context.Provider value={{log, getLogs}}>
      {children}
    </Context.Provider>
  );
}

export default Log;
