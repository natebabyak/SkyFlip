import { ReactNode } from 'react';
import Footer from '../../components/footer/Footer.tsx';
import Header from '../../components/header/Header.tsx';

export default function Pets(): ReactNode {
  return (
    <>
      <Header />
      <h1>Pets</h1>
      <Footer />
    </>
  )
}