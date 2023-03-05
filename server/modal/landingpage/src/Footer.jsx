import React from 'react'
import {
  Box,
  Container,
  Grid,
  styled,
  Typography
} from '@mui/material'
import Link from '@mui/material/Link';

const Footer = () => {

  const StackColumn = styled(Grid)(() => ({
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    gap: 8,
    textAlign: 'left',
  }));

  const BoxRow = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1a202c',
    flex: 1,
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: 30,
    }
  }));

  return (

    <BoxRow
      component='footer'
      sx={{
        py: 4,
        px: 2,
        color: '#cbd5e0',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100vw',
        height: '12.5rem',
        flexWrap: 'wrap'
      }}
    >
      <Container>
        <Grid container flexDirection='column' gap='2rem'>
          <Grid item xs={12} md={3}>
            <Box sx={{ width: '120px' }}>
              <img src='/supabase-logo.svg' alt='Supabase Logo' />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <StackColumn>
              <Typography
                text={'Support'}
              />
              <Typography
                text={'Docs'}
              />
              <Typography
                text={'Pricing'}
              />
              <Typography
                text={'Security'}
              />
              <Typography
                text={'Blog'}
              />
            </StackColumn>
          </Grid>
          <Grid item xs={12} md={3}>
            <StackColumn>
              <Typography
                text={'Open Source'}
              />
              <Typography
                text={'Get Started'}
              />
              <Typography
                text={'Contact Us'}
              />
              <Typography
                text={'Community'}
              />
            </StackColumn>
          </Grid>
          <Grid item xs={12} md={3}>
            <StackColumn>
              <Typography
                variant='caption'
                component='p'
                mb='1rem'
              >
                Connect with us
              </Typography>
              <Link href="#" variant="body2"
                sx={{
                  color: '#cbd5e0',
                  "&:hover": {
                    color: '#1c2859',
                  }
                }}
              >
                Twitter
              </Link>
              <Link href="#" variant="body2"
                sx={{
                  color: '#cbd5e0',
                  "&:hover": {
                    color: '#1c2859',
                  }
                }}
              >
                Github
              </Link>
            </StackColumn>
          </Grid>

        </Grid>
      </Container>

      <Box sx={{
        backgroundColor: '#2d3748',
        width: '100%',
        textAlign: 'center',
        padding: '2rem',
        position: 'fixed',
        bottom: '0',
        left: '0',

      }}>
        <Container>
          <Typography
            variant='caption'
            component='p'
          >
            &copy; 2022 Supabase Inc. All rights reserved.
          </Typography>
        </Container>

      </Box>
    </BoxRow>
  )
}

export default Footer
