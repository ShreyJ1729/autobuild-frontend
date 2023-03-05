import React, { FC } from 'react'
import { Box, Paper, styled, Grid, Typography, colors, Avatar } from '@mui/material'

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: 40,
    textAlign: "center",
    border: '1px solid ' + theme.palette.primary.main,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    boxShadow: '0px 9.04932px 26.5717px rgba(215, 228, 249, 0.5);'
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    marginTop: -80,
    height: 80,
    width: 80,
    marginBottom: 30,
}))

const testimoniData = [
    {
        name: "Alex Trost",
        testimonial: "Supabase is amazing! I've been able to build my app quickly and efficiently thanks to the features provided, particularly the full Postgres database and authentication system which saved me a lot of time and hassle. Highly recommend it to anyone looking for a Firebase alternative",
        img: "https://i.pravatar.cc/150?img=12"
    },
    {
        name: "Rebecca Lee",
        testimonial: "Supabase has been a game changer for our startup. The instant APIs and real-time subscriptions have allowed us to provide our users with a seamless experience and the storage feature is incredibly useful for storing large files. The team behind Supabase are also incredibly helpful and responsive to any questions we have. Highly recommend it!",
        img: "https://i.pravatar.cc/150?img=25"
    },
    {
        name: "Jack Johnson",
        testimonial: "Supabase is the best thing to happen to developers. The edge functions have saved me so much time and the full Postgres database is a dream come true. The documentation is also really well written and easy to understand. Highly recommend it!!",
        img: "https://i.pravatar.cc/150?img=32"
    }
]


const Testimonies = () => {
    return (
        <Grid container spacing={{ xs: 8, md: 4 }} sx={{ alignItems: 'stretch' }}>
            {testimoniData.map((item, index) =>
                <Grid xs={12} lg={4} item key={index}>
                    <StyledPaper elevation={0}>
                        <StyledAvatar
                            src={item.img}
                        />
                        <Box>
                            <Typography fontWeight={"medium"} mb={2}>{item.name}</Typography>
                            <Typography variant='caption' color={colors.grey[500]}>{item.testimonial}</Typography>
                        </Box>
                    </StyledPaper>
                </Grid>
            )}
        </Grid>
    )
}

export default Testimonies
