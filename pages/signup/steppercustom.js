// ** MUI Imports
import MuiBox from '@mui/material/Box'
import { alpha, styled, useTheme } from '@mui/material/styles'

// ** Custom Icon Import
import Icon from './icon.js'

// Styled Box component
const Box = styled(MuiBox)(() => ({
  width: 30,
  height: 30,
  borderWidth: 3,
  borderRadius: '50%',
  borderStyle: 'solid',
}))

const StepperCustomDot = props => {
  // ** Props
  const { active, completed, error } = props

  // ** Hooks
  const theme = useTheme()
  if (error) {
    return <Icon icon='mdi:alert' fontSize={30} color={theme.palette.error.main} transform='scale(1.2)' />
  } else if (completed) {
    return <Icon icon='mdi:check-circle' fontSize={30} color='#015578' transform='scale(1.2)' />
  } else {
    return (
      <Box sx={{borderColor: active ? '#015578' : alpha(theme.palette.primary.main, 0.3),}}
      />
    )
  }
}

export default StepperCustomDot