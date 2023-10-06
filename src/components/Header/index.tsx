import LogoImage from "../../assets/images/acai-logo.svg"
import "./header.scss"

const Header = () => {
  return (
    <header>
        <img src={LogoImage} alt="Logo" />
    </header>
  )
}

export default Header