import React, { Fragment } from 'react'

import './ContentInfo.scss'

const ContentInfo = ({ name, issueDate }) => (
  <Fragment>
    <h2 className="ContentInfo__name">{name}</h2>
    <span className="ContentInfo__issueDate">{issueDate}</span>
  </Fragment>
)

export default ContentInfo
