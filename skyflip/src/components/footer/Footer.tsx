import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {year} Nate Babyak. All rights reserved.</p>
    </footer>
  )
}