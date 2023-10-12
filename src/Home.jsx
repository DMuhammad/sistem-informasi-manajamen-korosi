import * as React from 'react'
import { Badge, Box, Container, Divider, Grid, IconButton, List, Paper, Toolbar, Typography } from '@mui/material'
import StickyTable from './StickyTable'
import { ChevronLeft, Menu, Notifications } from '@mui/icons-material'
import { mainListItems, secondaryListItems } from './listItems'
import CustomDrawer from './CustomDrawer'
import CustomAppBar from './CustomAppBar'

export default function Home() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CustomAppBar position='absolute' open={open}>
                <Toolbar
                    sx={{ pr: '24px' }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Sistem Informasi Manajemen Korosi
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <Notifications />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </CustomAppBar>
            <CustomDrawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton
                        onClick={toggleDrawer}
                        sx={{
                            ...(!open && { display: 'none' }),
                        }}
                    >
                        <ChevronLeft />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {mainListItems}
                    {/* <Divider sx={{ my: 1 }} />
          {secondaryListItems} */}
                </List>
            </CustomDrawer>
            <Box component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.grey[100],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto'
                }}>
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    {/* <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Sistem Informasi Manajemen Korosi
          </Typography> */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '240'
                                }}
                            ></Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <StickyTable />
                            </Paper>
                        </Grid>
                        {/* <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              ></Paper>
            </Grid> */}
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}
