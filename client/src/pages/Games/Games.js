import "./Games.css";
import NavbarG from '../../components/Navbar/NavbarG.js';
import Arcade from "./Arcade/Arcade";

export default function Games() {
    return (
      <main>
        <header id="games-header">
            <NavbarG />
        </header>
        <section>
          <Arcade />
        </section>
      </main>
    );
}