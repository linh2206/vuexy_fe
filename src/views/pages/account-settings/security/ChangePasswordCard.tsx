'use client'

// React Imports
import { useState } from 'react'

import { Controller, useForm } from 'react-hook-form'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { Bounce, toast } from 'react-toastify'

//Component Imports
import CustomTextField from '@core/components/mui/TextField'

import { ResetPassword } from '@/services/apis/user.api'

import 'react-toastify/dist/ReactToastify.css';

const ChangePasswordCard = () => {
  // States
  const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)

  const handleClickShowCurrentPassword = () => {
    setIsCurrentPasswordShown(!isCurrentPasswordShown)
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { }
  } = useForm<any>()

  const HandleChangePassword = (formData: FormData) => {

    ResetPassword(formData).then(() => {
      toast.success('Edit password success', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
      reset({
        old_password: "",
        new_password: "",
        confirm_password: "",
      })
    }).catch((err) => {
      toast.error((err?.response?.data?.message[0] || ""), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
    });
  }


  return (
    <Card>
      <CardHeader title='Change Password' />
      <CardContent>
        <form onSubmit={handleSubmit(HandleChangePassword)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='old_password'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label='Current Password'
                    type={isCurrentPasswordShown ? 'text' : 'password'}
                    placeholder='············'
                    {
                    ...field
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowCurrentPassword}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <i className={isCurrentPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container className='mbs-0' spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='new_password'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label='New Password'
                    {
                    ...field
                    }
                    type={isNewPasswordShown ? 'text' : 'password'}
                    placeholder='············'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => setIsNewPasswordShown(!isNewPasswordShown)}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <i className={isNewPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='confirm_password'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label='Confirm New Password'
                    type={isConfirmPasswordShown ? 'text' : 'password'}
                    placeholder='············'
                    {
                    ...field
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={12} className='flex flex-col gap-4'>
              <Typography variant='h6'>Password Requirements:</Typography>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2.5'>
                  <i className='tabler-circle-filled text-[8px]' />
                  Minimum 8 characters long - the more, the better
                </div>
                <div className='flex items-center gap-2.5'>
                  <i className='tabler-circle-filled text-[8px]' />
                  At least one lowercase & one uppercase character
                </div>
                <div className='flex items-center gap-2.5'>
                  <i className='tabler-circle-filled text-[8px]' />
                  At least one number, symbol, or whitespace character
                </div>
              </div>
            </Grid> */}
            <Grid item xs={12} className='flex gap-4'>
              <Button variant='contained' type='submit'>Save Changes</Button>
              <Button variant='tonal' type='reset' color='secondary'>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordCard
