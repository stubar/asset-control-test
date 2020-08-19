import React, { useContext, useEffect, useRef, useState } from 'react'
import {Context as StatusContext} from '../providers/Status'
import {Context as LogContext} from '../providers/Log'

/**
 * Waits for a second
 * @returns {Promise<unknown>}
 */
const waitFor1Second = () => new Promise(resolve => setTimeout(() => resolve(), 1000))
/**
 * Calculates how many log entries can be displayed on one page, based on 1 line being 20px high
 * and the button and padding being 35px high
 * @returns {number}
 */
const pageSize = () => Math.floor((window.innerHeight - 35)/20)

export default () => {
  const bottomRef = useRef()
  const {status} = useContext(StatusContext)
  const { log, getLogs } = useContext(LogContext)
  const [fetchingFirstPage, setFetchingFirstPage] = useState(false)

  const handleClick = async () => {
    await getLogs(log.length, pageSize())
    //scroll to the bottom to see newest logs
    if(bottomRef.current) {
      bottomRef.current.scrollIntoView()
    }
  }
  // first page worth of log lines has been downloaded
  const firstPageFinished = log.length >= pageSize()
  useEffect( () => {
    //Ensure we have a page of data when initialising
    if(fetchingFirstPage || firstPageFinished) return
    //track inflight requests for 1st page lines otherwise multiple requests will fire
    setFetchingFirstPage(true)

    getLogs(log.length, pageSize()).then(() => {
      waitFor1Second().then(() => {
        // wait before re attempting to populate 1st page
        setFetchingFirstPage(false)
      })
    })

  },[getLogs, log, fetchingFirstPage, firstPageFinished])

  const logsExistThatAreNotShown = status > log.length
  return (
    <section>
      <ul>
        {log.map((logEntry, index) => {
          return <li  className="log-entry" key={index}>{logEntry.line}</li>
        })}
      </ul>
      <div ref={bottomRef} id="bottom">
        {logsExistThatAreNotShown && firstPageFinished ?
          <button  onClick={handleClick}>Show more</button>
        :
          !logsExistThatAreNotShown && <div>No more logs on the server</div>
        }
      </div>
    </section>
  );
}

