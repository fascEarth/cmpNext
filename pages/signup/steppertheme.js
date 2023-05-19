// ** MUI imports
import Box from '@mui/material/Box'
import { alpha, styled} from '@mui/material/styles';

const StepperWrapper = styled(Box)(({ theme }) => {
  return {
    [theme.breakpoints.down('md')]: {
      '& .MuiStepper-horizontal:not(.MuiStepper-alternativeLabel)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      }
    },
    '& .MuiStep-root': {
      padding: '1',
      '& .step-label': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      '& .step-number': {
        fontWeight: 600,
        letterSpacing: 0.25,
        fontSize: '2.125rem',
        marginRight: theme.spacing(2.5),
        color: theme.palette.text.primary
      },
      '& .step-title': {
        fontWeight: 500,
        fontSize: '16px',
        letterSpacing: '0.1px',
        color: theme.palette.text.primary
      },
      '& .step-subtitle': {
        fontWeight: 400,
        fontSize: '12px',
        letterSpacing: '0.4px',
        color: theme.palette.text.secondary
      },
      '& .MuiStepLabel-root.Mui-disabled': {
        '& .step-number': {
          color: theme.palette.text.disabled
        }
      },
      '& .Mui-error': {
        '& .MuiStepLabel-labelContainer, & .step-number, & .step-title, & .step-subtitle': {
          color: theme.palette.error.main
        }
      }
    },
    '& .MuiStepConnector-root': {
      '& .MuiStepConnector-line': {
        borderWidth: 2,
        borderRadius: 3,
        borderColor: '#3f51b54d',
      },
      '&.Mui-active, &.Mui-completed': {
        '& .MuiStepConnector-line': {
          borderColor: '#015578'
        }
      },
      '&.Mui-disabled .MuiStepConnector-line': {
        borderColor: '#cfd8dc',
      }
    },
    '& .MuiStepper-alternativeLabel': {
      '& .MuiStepConnector-root': {
        top: 10,
      },
      '& .MuiStepLabel-labelContainer': {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& > * + *': {
          marginTop: theme.spacing(1)
        }
      }
    },
    '& .MuiStepper-vertical': {
      '& .MuiStep-root': {
        '& .step-label': {
          justifyContent: 'flex-start'
        },
        '& .MuiStepContent-root': {
          borderWidth: 3,
          marginLeft: theme.spacing(2.25),
          borderColor: theme.palette.primary.main
        },
        '& .button-wrapper': {
          marginTop: theme.spacing(4)
        },
        '&.active + .MuiStepConnector-root .MuiStepConnector-line': {
          borderColor: theme.palette.primary.main
        }
      },
      '& .MuiStepConnector-root': {
        marginLeft: theme.spacing(2.25),
        '& .MuiStepConnector-line': {
          borderRadius: 0,
        }
      }
    }
  }
})

export default StepperWrapper;