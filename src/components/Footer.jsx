import { Link } from "react-router-dom";
import {
  InstagramOutlined,
  FacebookOutlined,
  XOutlined,
} from "@ant-design/icons";
import FadeAnimation from "./Animations/FadeAnimation/FadeAnimation";
import useTheme from '@context/ThemeContext'

const Footer = () => {
  const { themeMode } = useTheme()

  return (
    
    <FadeAnimation>
      <footer className={`${themeMode === 'dark' ? 'bg-dark-footer text-dark-lightGrey' : 'bg-[rgba(45,45,63,255)] text-[#d5deef]'} font-grotesk grid md:justify-items-center lg:grid-cols-3`}>
        <div className="p-5 lg:col-span-1">

          <h2 className="text-xl mb-3 ml-3">Sobre nosotros</h2>
          <ul className=" list-disc ml-3">
            <li>¿Quiénes somos?</li>
            <li>Trabaja con nosotros</li>
            <li>Blog</li>
          </ul>
          <div className="flex justify-evenly mt-5  w-[9rem] gap-3">
            <Link
              to="/instagram"
              className="text-[#d5deef] border p-2 text-lg w-10 h-10 flex items-center justify-center rounded-full hover:instagram-bg hover:text-white transition-all duration-300 ease-in-out"
            >
              <InstagramOutlined />
            </Link>
            <Link
              to="/facebook"
              className="text-[#d5deef] border p-2 text-lg w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#0a66c2] hover:text-white transition-all duration-300 ease-in-out"
            >
              <FacebookOutlined />
            </Link>
            <Link
              to="/instagram"
              className="text-[#d5deef] border p-2 text-lg w-10 h-10 flex items-center justify-center rounded-full hover:bg-color-content hover:text-color-darkBg transition-all duration-300 ease-in-out"
            >
              <XOutlined />
            </Link>
          </div>
        </div>

        <div className="p-5 lg:col-span-1">
          <h2 className="text-xl mb-3 ml-3">Especies</h2>
          <ul className="ml-3">
            <li>
              <Link
                to="/posts/species/Perro"
                className={`${themeMode === 'dark' ? 'hover:text-dark-primary' : 'hover:text-[#ff7f0e]'} animated-underline`}
              >
                Perro
              </Link>
            </li>
            <li>
              <Link
                to="/posts/species/Gato"
                className={`${themeMode === 'dark' ? 'hover:text-dark-primary' : 'hover:text-[#ff7f0e]'} animated-underline`}
              >
                Gato
              </Link>
            </li>
            <li>
              <Link
                to="/posts/species/Otro"
                className={`${themeMode === 'dark' ? 'hover:text-dark-primary' : 'hover:text-[#ff7f0e]'} animated-underline`}
              >
                Otro
              </Link>
            </li>
          </ul>
        </div>

        <div className="p-5 lg:col-span-1 md:col-span-2">
          <h2 className="text-xl mb-3 ml-3">Legal</h2>
          <ul className="ml-3">
            <li>
              <Link
                to="/legal"
                className={`${themeMode === 'dark' ? 'hover:text-dark-primary' : 'hover:text-[#ff7f0e]'} animated-underline`}
              >
                Aviso legal
              </Link>
            </li>
            <li>
              <Link
                to="/privacity"
                className={`${themeMode === 'dark' ? 'hover:text-dark-primary' : 'hover:text-[#ff7f0e]'} animated-underline`}
              >
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link
                to="cookies"
                className={`${themeMode === 'dark' ? 'hover:text-dark-primary' : 'hover:text-[#ff7f0e]'} animated-underline`}
              >
                Política de cookies
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${themeMode === 'dark' ? 'bg-dark-footer2' : 'bg-[rgba(34,34,49,255)]'} h-20 flex justify-center items-center md:col-span-2 lg:col-span-3 w-full`}>
          <p className="ml-1 mr-1 text-center">
            © {new Date().getFullYear()} - Todos los derechos reservados{" "}
            <span className={`${themeMode === 'dark' ? 'text-dark-primary' : 'text-[#638ecb]'}`}>Wander Whiskers</span>
          </p>
        </div>
      </footer>
    </FadeAnimation>
  );
};

export default Footer;
