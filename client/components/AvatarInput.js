import { useState, useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import IconButton from '@mui/material/IconButton'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import RotateRightIcon from '@mui/icons-material/RotateRight'

import ModalWindow from '../components/ModalWindow'
import ButtonRow from '../components/ButtonRow'
import useToggle from 'app-shared/client/hooks/useToggle.js'

const width = 250
const height = 250
export default function AvatarInput({
  disabled, height = 75, width = 75, value, onChange
}){
  const [showingModal, showModal, hideModal] = useToggle()
  const [image, setImage] = useState('http://example.com/initialimage.jpg')
  return <>
    <Dropzone
      disabled={disabled}
      onDrop={(dropped) => { setImage(dropped[0]); showModal() }}
      // noClick
      noKeyboard
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <Avatar {...{
            src: value,
            sx: { width, height, cursor: 'pointer' }
          }}/>
          <input {...getInputProps()} />
        </div>
      )}
    </Dropzone>
    <ModalWindow
      open={showingModal}
      onClose={hideModal}
    >
      <Editor {...{ image, hideModal, onChange }}/>
    </ModalWindow>
  </>
}

function Editor({ image, hideModal, onChange }){
  const ref = useRef()
  const [scale, setScale] = useState(1.2)
  const [rotate, setRotate] = useState(0)
  const rotateCallback = left => () => {
    setRotate((rotate + (left ? 90 : -90)) % 360)
  }

  return <Box>
    <Stack direction="column" alignItems="center">
      <Box
        sx={{
          display: 'flex',
          border: '1px dashed rgba(255,255,255,0.5)',
          m: 2,
        }}
      >
        <AvatarEditor {...{ref, height, width, image, scale, rotate}}/>
      </Box>
    </Stack>
    <Stack direction="row">
      <IconButton onClick={rotateCallback(false)}><RotateLeftIcon /></IconButton>
      <IconButton onClick={rotateCallback(true)}><RotateRightIcon /></IconButton>
      <Slider
        sx={{flex: '1 1'}}
        valueLabelDisplay="off"
        variant="soft"
        value={scale}
        onChange={e => { setScale(e.target.value) }}
        step={0.01}
        marks
        min={0.5}
        max={5}
      />
    </Stack>
    <ButtonRow>
      <Button
        autoFocus
        type="submit"
        variant="contained"
        onClick={() => {
          const editor = ref.current
          onChange(getImageURL(editor))
          // onChange(editor.getImageScaledToCanvas().toDataURL())
          hideModal()
        }}
      >Update Avatar</Button>
      <Button
        variant="text"
        onClick={hideModal}
      >cancel</Button>
    </ButtonRow>
  </Box>
}

function getImageURL(editor){
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  // don't paint a border here, as it is the resulting image
  editor.paintImage(canvas.getContext('2d'), editor.state.image, 0, 1)
  return canvas.toDataURL()
}