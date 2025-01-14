import { Root, Overlay, Content } from '@radix-ui/react-dialog'
import { styled, keyframes } from '../tokens/stitches.config'

export const ModalRoot = styled(Root, {})

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const ModalOverlay = styled(Overlay, {
  backgroundColor: '$overlay',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

const Modal = styled(Content, {
  backgroundColor: '$grayBg',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  '&:focus': { outline: 'none' },
})

export const ModalContent = styled(Modal, {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '600px',
  maxHeight: '85vh',
  p: '$1',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: 'transform',
  },
  '@smDown': {
    maxWidth: '95%',
    width: '95%',
  },
})
