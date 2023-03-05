import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTheme } from '@mui/material/styles'

const SupabaseBannerWrapper = styled(Box)(
  ({ theme }) => `
  background-color: ${theme.palette.primary.main};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing(6, 0)};
  @media (max-width: ${theme.breakpoints.values.md}px) {
    padding: ${theme.spacing(5, 2)};
  }
`
)

const SupabaseTagWrapper = styled(Box)(
  ({ theme }) => `
  width: 140px;
  display: flex;
  justify-content: center;
`
)

export default function SupabaseBanner() {
  const theme = useTheme()
  return (
    <SupabaseBannerWrapper>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', marginBottom: { xs: 4, md: 0 } }}>
          <SupabaseTagWrapper>
            <a>
              <img src="/supabase-logo.svg" width={140} height={28} alt="Supabase Logo" />
            </a>
          </SupabaseTagWrapper>
          <Box sx={{ display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
            <Typography variant="h4" color="secondary" sx={{ textTransform: 'capitalize', letterSpacing: '-0.03em' }}>
              An open source Firebase alternative
            </Typography>
            <Typography variant="subtitle1" color="secondary" sx={{ lineHeight: 1.5, marginTop: 1 }}>
              Developers can build and scale serverless applications faster with our platform. No code required! Get started
              today for free!
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Button
                endIcon={<ArrowForwardIcon />}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  ':hover': {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://app.supabase.io/"
              >
                Get Started for Free
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/supabase-illustration.svg" width={640} height={555} alt="Supabase Illustration" />
        </Box>
      </Container>
    </SupabaseBannerWrapper>
  )
}
