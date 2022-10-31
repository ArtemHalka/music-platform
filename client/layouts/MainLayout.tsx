import React from 'react';
import Navbar from "../components/Navbar";
import {Container} from "@mui/material";
import Player from "../components/Player";
import Head from "next/head";

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
                                                 title,
                                                 description,
                                                 keywords,
                                                 children
                                               }) => {
  return (
    <>
      <Head>
        <title>{title || 'Music Platform'}</title>
        <meta name='description' content={'Description of the music platform.' + description}/>
        <meta name='keywords' content={keywords || 'music, platform, artists'}/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
      </Head>
      <Navbar/>
      <Container style={{margin: '90px 0'}}>
        {children}
      </Container>
      <Player/>
    </>
  );
};

export default MainLayout;
