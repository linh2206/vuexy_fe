'use client'

// React Imports
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import type { SelectChangeEvent } from '@mui/material/Select'

// Component Imports
import Alert from '@mui/material/Alert';

import CustomTextField from '@core/components/mui/TextField'
import { Profile } from '@/services/swr/profile.swr'
import { UpdateProfile } from '@/services/apis/user.api'


type Data = {
  firstName: string
  lastName: string
  email: string
  organization: string
  phoneNumber: number | string
  address: string
  state: string
  zipCode: string
  country: string
  language: string
  timezone: string
  currency: string
}

// Vars
// const initialData: Data = {
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john.doe@example.com',
//   organization: 'Pixinvent',
//   phoneNumber: '+1 (917) 543-9876',
//   address: '123 Main St, New York, NY 10001',
//   state: 'New York',
//   zipCode: '634880',
//   country: 'usa',
//   language: 'english',
//   timezone: 'gmt-12',
//   currency: 'usd'
// }

const languageData = ['English', 'Arabic', 'French', 'German', 'Portuguese']

const AccountDetails = () => {
  // States
  const [formData, setFormData] = useState<any>({})

  console.log("🚀 ~ AccountDetails ~ formData:", formData)
  const [fileInput, setFileInput] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  console.log("🚀 ~ AccountDetails ~ imgSrc:", imgSrc)
  const [language, setLanguage] = useState<string[]>(['English'])

  const handleDelete = (value: string) => {
    setLanguage(current => current.filter(item => item !== value))
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileInputChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result as string)
      }
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }


  const { data } = Profile();

  useEffect(() => {
    setFormData(data?.data)
  }, [data]);

  const updateProfile = (formData: FormData) => {

    const rawFormData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      organization: formData.get('organization'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: formData.get('address'),
      state: formData.get('state'),
      country: formData.get('country'),
      zipCode: formData.get('zipCode'),
      language: formData.get('language'),

      // avatar: formData.get(""),
    }

    console.log("🚀 ~ updateProfile ~ rawFormData:", rawFormData)

    UpdateProfile(rawFormData).then(() => {
      return (
        <Alert severity="success">
          Edit that your action was successful.
        </Alert>
      )
    }).catch((err) => {
      console.log("🚀 ~ SignUp ~ err:", err)
    });
  }

  return (
    <Card>
      <Alert severity="success" style={{ marginBottom: "10px" }}>
        Edit that your action was successful.
      </Alert>
      <CardContent className='mbe-4'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={process.env.NEXT_PUBLIC_BE_URL + data?.data.avatar} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Upload New Photo
                <input
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleFileInputReset}>
                Reset
              </Button>
            </div>
            <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form action={updateProfile}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='First Name'
                value={formData?.firstName}
                name='firstName'
                onChange={e => handleFormChange('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Last Name'
                value={formData?.lastName}
                name='lastName'
                onChange={e => handleFormChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Email'
                value={formData?.email}
                name='email'
                onChange={e => handleFormChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Organization'
                value={formData?.organization}
                name='organization'
                onChange={e => handleFormChange('organization', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Phone Number'
                value={formData?.phoneNumber}
                name='phone'
                onChange={e => handleFormChange('phoneNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Address'
                value={formData?.address}
                name='address'
                onChange={e => handleFormChange('address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='State'
                value={formData?.state}
                name='state'
                onChange={e => handleFormChange('state', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='number'
                label='Zip Code'
                value={formData?.zipCode}
                name='zipCode'
                onChange={e => handleFormChange('zipCode', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='Country'
                value={formData?.country}
                name='country'
                onChange={e => handleFormChange('country', e.target.value)}
              >
                <MenuItem value='usa'>USA</MenuItem>
                <MenuItem value='uk'>UK</MenuItem>
                <MenuItem value='australia'>Australia</MenuItem>
                <MenuItem value='germany'>Germany</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='Language'
                value={language}
                name='language'
                SelectProps={{
                  multiple: true, // @ts-ignore
                  onChange: handleChange,
                  renderValue: selected => (
                    <div className='flex flex-wrap gap-2'>
                      {(selected as string[]).map(value => (
                        <Chip
                          key={value}
                          clickable
                          onMouseDown={event => event.stopPropagation()}
                          size='small'
                          label={value}
                          onDelete={() => handleDelete(value)}
                        />
                      ))}
                    </div>
                  )
                }}
              >
                {languageData.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='TimeZone'
                value={formData.timezone}
                onChange={e => handleFormChange('timezone', e.target.value)}
                SelectProps={{ MenuProps: { PaperProps: { style: { maxHeight: 250 } } } }}
              >
                <MenuItem value='gmt-12'>(GMT-12:00) International Date Line West</MenuItem>
                <MenuItem value='gmt-11'>(GMT-11:00) Midway Island, Samoa</MenuItem>
                <MenuItem value='gmt-10'>(GMT-10:00) Hawaii</MenuItem>
                <MenuItem value='gmt-09'>(GMT-09:00) Alaska</MenuItem>
                <MenuItem value='gmt-08'>(GMT-08:00) Pacific Time (US & Canada)</MenuItem>
                <MenuItem value='gmt-08-baja'>(GMT-08:00) Tijuana, Baja California</MenuItem>
                <MenuItem value='gmt-07'>(GMT-07:00) Chihuahua, La Paz, Mazatlan</MenuItem>
                <MenuItem value='gmt-07-mt'>(GMT-07:00) Mountain Time (US & Canada)</MenuItem>
                <MenuItem value='gmt-06'>(GMT-06:00) Central America</MenuItem>
                <MenuItem value='gmt-06-ct'>(GMT-06:00) Central Time (US & Canada)</MenuItem>
                <MenuItem value='gmt-06-mc'>(GMT-06:00) Guadalajara, Mexico City, Monterrey</MenuItem>
                <MenuItem value='gmt-06-sk'>(GMT-06:00) Saskatchewan</MenuItem>
                <MenuItem value='gmt-05'>(GMT-05:00) Bogota, Lima, Quito, Rio Branco</MenuItem>
                <MenuItem value='gmt-05-et'>(GMT-05:00) Eastern Time (US & Canada)</MenuItem>
                <MenuItem value='gmt-05-ind'>(GMT-05:00) Indiana (East)</MenuItem>
                <MenuItem value='gmt-04'>(GMT-04:00) Atlantic Time (Canada)</MenuItem>
                <MenuItem value='gmt-04-clp'>(GMT-04:00) Caracas, La Paz</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='Currency'
                value={formData.currency}
                onChange={e => handleFormChange('currency', e.target.value)}
              >
                <MenuItem value='usd'>USD</MenuItem>
                <MenuItem value='euro'>EUR</MenuItem>
                <MenuItem value='pound'>Pound</MenuItem>
                <MenuItem value='bitcoin'>Bitcoin</MenuItem>
              </CustomTextField>
            </Grid> */}
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>
                Save Changes
              </Button>
              {/* <Button variant='tonal' type='reset' color='secondary' onClick={() => setFormData()}>
                Reset
              </Button> */}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
