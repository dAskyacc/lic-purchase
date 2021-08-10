/**
 * 21-08-10 20:13 Tuesday
 * This file used define the module errors/unfound-404 functions.
 */

import React from 'react'

import { useHistory } from 'react-router-dom'

export default function UnfoundPage(props) {
  let history = useHistory()

  return (
    <div>
      <h1>NotFound</h1>
    </div>
  )
}
