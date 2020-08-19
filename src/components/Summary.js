import React, { useContext, useMemo } from 'react'
import {Context as LogContext} from '../providers/Log'
import {Context as StatusContext} from '../providers/Status'

export default () => {
  const { log } = useContext(LogContext)
  const { error } = useContext(StatusContext)

  /* create a map of status and their total counts */
  const stats = useMemo(() => log.reduce((prev, current) => {
      if(current.status) {
        prev[current.status]++
      }
      return prev
    }, {INFO:0, WARNING: 0, ERROR:0})
  , [log])

  return (
    <aside>
      <h3>Status Summary</h3>
      <table>
        <tbody>
          {Object.entries(stats).map(([stat, count]) => <tr key={stat}>
            <th>{stat}</th>
            <td>{count}</td>
          </tr>)}
        </tbody>
      </table>
      {error && <div id="error">{error}</div>}
    </aside>
  );
}

