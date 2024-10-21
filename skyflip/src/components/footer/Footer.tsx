import { ReactNode } from 'react';
import './footer.css';

export default function Footer(): ReactNode {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {year} Nate Babyak. All rights reserved.</p>
    </footer>
  );
}