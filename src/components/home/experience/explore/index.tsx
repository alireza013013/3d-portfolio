import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./index.css";
import github from "../../../../assets/github.svg";
import linkedin from "../../../../assets/linkedin.svg";
import youtube from "../../../../assets/youtube.svg";
import karlancer from "../../../../assets/karlancer.png";
import ponisha from "../../../../assets/ponisha.svg";
import avatar from "../../../../assets/avatar.webp";

const Explore = () => {
  const cardRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardRef.current) return;

      const elements = cardRef.current.querySelectorAll(
        ".profile-card__avatar, .profile-card__greeting, .profile-card__name, .profile-card__title, .profile-card__links a",
      );

      gsap.from(elements, {
        y: -15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 1,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={cardRef}
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
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <img src={linkedin} alt="linkedin" className="social-image" />
        </a>
        <a
          href="https://www.youtube.com/@ALittleDeeper"
          target="_blank"
          rel="noreferrer"
          aria-label="Youtube"
        >
          <img src={youtube} alt="youtube" className="social-image" />
        </a>
        <a
          href="https://ponisha.ir/profile/alireza013013"
          target="_blank"
          rel="noreferrer"
          aria-label="Ponisha"
        >
          <img src={ponisha} alt="Ponisha" className="social-image" />
        </a>
        <a
          href="https://karlancer.com/profile/703078"
          target="_blank"
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
