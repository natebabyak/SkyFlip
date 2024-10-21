import { ReactNode } from 'react';
import Footer from '../../components/footer/Footer.tsx';
import Header from '../../components/header/Header.tsx';

export default function Home(): ReactNode {
  return (
    <>
      <Header />
      <h1>SkyFlip</h1>
      <Footer />
    </>
  )
}