import * as React from 'react'
import Box from '@mui/material/Box'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import LinkToCeramicApi from '../components/LinkToCeramicApi'
import CeramicStreamLink from '../components/CeramicStreamLink'
import Link from './Link'

export default function LinkToDid({ did, children = did, ...props }){
  const streamId = did && did.split(':')[2]
  return <Box>
    <Link to={`/dids/${did}`}>{did}</Link>&nbsp;
    {/* <LinkToCeramicApi endpoint={did}/> */}
    {streamId && <CeramicStreamLink streamId={streamId}/> }
  </Box>
}
