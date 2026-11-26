import "./index.css";
import github from "../../../../assets/github.svg";
import linkedin from "../../../../assets/linkedin.svg";
import youtube from "../../../../assets/youtube.svg";
import karlancer from "../../../../assets/karlancer.png";
import ponisha from "../../../../assets/ponisha.svg";
import avatar from "../../../../assets/avatar.webp";

const Explore = () => {
  return (
    <section
      className="profile-card"
      onClick={(event) => event.stopPropagation()}
    >
      <img className="profile-card__avatar" src={avatar} alt="Alireza" />
      <p className="profile-card__greeting">HELLO,</p>
      <h2 className="profile-card__name">I'm Alireza</h2>
      <p className="profile-card__title">Front-end Developer</p>
      <nav className="profile-card__links" aria-label="Social links">
        <a
          href="https://github.com/alireza013013"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <img src={github} alt="github" className="social-image" />
        </a>
        <a
          href="https://www.linkedin.com/in/alireza-abdollahi-8869911a8/"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <img src={linkedin} alt="linkedin" className="social-image" />
        </a>
        <a
          href="https://www.youtube.com/@ALittleDeeper"
          rel="noreferrer"
          aria-label="Youtube"
        >
          <img src={youtube} alt="youtube" className="social-image" />
        </a>
        <a
          href="https://ponisha.ir/profile/alireza013013"
          rel="noreferrer"
          aria-label="Ponisha"
        >
          <img src={ponisha} alt="Ponisha" className="social-image" />
        </a>
        <a
          href="https://karlancer.com/profile/703078"
          rel="noreferrer"
          aria-label="Karlancer"
        >
          <img src={karlancer} alt="Karlancer" className="social-image" />
        </a>
      </nav>
    </section>
  );
};

export default Explore;
