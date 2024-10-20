import { ReactNode } from "react";
import "./footer.css";

export default function Footer(): ReactNode {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Nate Babyak. All rights reserved.</p>
    </footer>
  );
}