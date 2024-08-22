import React from "react";
import "./footer.css";

export default function Footer(): React.ReactNode {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Nate Babyak. All rights reserved.</p>
    </footer>
  );
}