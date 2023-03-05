import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add'

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white
}))

const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.common.black}`,
  padding: theme.spacing(1, 3),
  '&.Mui-expanded': {
    padding: theme.spacing(0, 3),
  }
}))

const FAQ = () => {
  const [activeItem, setActiveItem] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setActiveItem(isExpanded ? panel : false)
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        component="h3"
        color="common.white"
        align="center"
        sx={{ mb: 6 }}
      >
        Frequently Asked Questions
      </Typography>
      <Stack spacing={1} mb={8}>
        <CustomAccordion square expanded={activeItem === 'panel1'} onChange={handleChange('panel1')}>
          <CustomAccordionSummary
            expandIcon={<AddIcon sx={{ color: 'common.white', fontSize: 48 }} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h5">What is Supabase?</Typography>
          </CustomAccordionSummary>
          <AccordionDetails>
            <Typography variant="h5" mb={4}>
              Supabase is a new service that combines a full Postgres database with
              instant APIs, realtime, and authentication. Our mission is to provide
              an open, accessible alternative to Firebase. We provide the
              infrastructure and the tools to help you build your product, focus on
              your users, and solve the hard problems while maintaining your data
              privacy and security.
            </Typography>
          </AccordionDetails>
        </CustomAccordion>
        <CustomAccordion square expanded={activeItem === 'panel2'} onChange={handleChange('panel2')}>
          <CustomAccordionSummary
            expandIcon={<AddIcon sx={{ color: 'common.white', fontSize: 48 }} />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant="h5">How does Supabase differ from Firebase?</Typography>
          </CustomAccordionSummary>
          <AccordionDetails>
            <Typography variant="h5">
              Supabase and Firebase are two different approaches. While both offer some
              similar features, Supabase is an open source alternative that gives you
              more control over your infrastructure and data. With Supabase, you can do
              more with your Postgres database and use your SQL queries. Besides, you
              can also use its GraphQL API.
            </Typography>
          </AccordionDetails>
        </CustomAccordion>
        <CustomAccordion square expanded={activeItem === 'panel3'} onChange={handleChange('panel3')}>
          <CustomAccordionSummary
            expandIcon={<AddIcon sx={{ color: 'common.white', fontSize: 48 }} />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography variant="h5">What are the advantages of using Supabase over traditional cloud providers?</Typography>
          </CustomAccordionSummary>
          <AccordionDetails>
            <Typography variant="h5" mb={4}>
              Supabase offers several advantages over traditional cloud providers:
            </Typography>
            <ul>
              <li><Typography variant="h5">Open source: Supabase is developed under a permissive MIT license, allowing you to view the code, own it, and collaborate with others. This is essential for transparency, speed, and innovation.</Typography></li>
              <li><Typography variant="h5">Full Postgres support: Supabase is built on top of Postgres, which is known for its robustness, scalability, and maturity. This ensures that you have full control over your data while enjoying instant APIs, realtime, and authentication.</Typography></li>
              <li><Typography variant="h5">GraphQL APIs: Supabase provides a powerful GraphQL API that offers maximum flexibility for your frontend.</Typography></li>
              <li><Typography variant="h5">Realtime subscriptions: Supabase uses Postgres' powerful LISTEN/NOTIFY approach to deliver realtime updates to your clients. This reduces network latency, simplifies your code, and delivers a realtime experience out of the box.</Typography></li>
              <li><Typography variant="h5">Authentication: Supabase offers several authentication providers out of the box, like email, passwordless, Google, Facebook, Twitter, and GitHub. It uses JWT tokens for secure authentication and works with popular libraries.</Typography></li>
              <li><Typography variant="h5">Edge functions: Supabase allows you to run serverless functions at the edge, which reduces your latency and cost while delivering a better UX.</Typography></li>
            </ul>
          </AccordionDetails>
        </CustomAccordion>
        <CustomAccordion square expanded={activeItem === 'panel4'} onChange={handleChange('panel4')}>
          <CustomAccordionSummary
            expandIcon={<AddIcon sx={{ color: 'common.white', fontSize: 48 }} />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography variant="h5">How is Supabase secured?</Typography>
          </CustomAccordionSummary>
          <AccordionDetails>
            <Typography variant="h5">
              Supabase takes security seriously. It offers several security features to ensure the safety of your data, such as encryption at rest, two-factor authentication, and JWT tokens for authentication. Besides, it uses the best security practices and is continuously audited by third parties.
            </Typography>
          </AccordionDetails>
        </CustomAccordion>
        <CustomAccordion square expanded={activeItem === 'panel5'} onChange={handleChange('panel5')}>
          <CustomAccordionSummary
            expandIcon={<AddIcon sx={{ color: 'common.white', fontSize: 48 }} />}
            aria-controls="panel5-content"
            id="panel5-header"
          >
            <Typography variant="h5">What programming languages can I use with Supabase?</Typography>
          </CustomAccordionSummary>
          <AccordionDetails>
            <Typography variant="h5">
              Supabase provides SDKs, API libraries, and client libraries in several programming languages such as JavaScript, TypeScript, Python, Ruby, Go, and Rust. You can also use Supabase with your preferred framework such as React, Angular, or Vue.
            </Typography>
          </AccordionDetails>
        </CustomAccordion>
      </Stack>
      <Typography
        variant="h6"
        component="p"
        color="common.white"
        textAlign="center"
        sx={{ my: 3 }}
      >
        Ready to try Supabase? Sign up to get started.
      </Typography>
      <Grid container>
        <Grid item xs>
          <TextField
            variant="filled"
            label="Email address"
            fullWidth
            sx={{ bgcolor: 'common.white' }}
          />
        </Grid>
        <Grid item xs="auto">
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{ height: '100%', borderRadius: '2px' }}
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default FAQ
