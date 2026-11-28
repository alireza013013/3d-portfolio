import { useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./index.css";

export interface Company {
  id: string;
  image: string;
  secondImage?: string;
  alt: string;
  date: string;
  position: string;
  desc: string;
  link: string;
  linkSecond?: string;
}

interface CompanyCardProps {
  company: Company;
  onEnterComplete: () => void;
}

const CompanyCard = ({ company, onEnterComplete }: CompanyCardProps) => {
  const cardRef = useRef<HTMLElement>(null);

  const cardStyle = {
    "--logo-count": company.secondImage ? 2 : 1,
  } as CSSProperties;

  useGSAP(
    () => {
      if (!cardRef.current) return;

      const items = cardRef.current.querySelectorAll<HTMLElement>(".item");

      if (!items.length) {
        onEnterComplete();
        return;
      }
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: -15 },
        {
          autoAlpha: 1,
          y: 0,
          delay: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          onComplete: onEnterComplete,
        },
      );
    },
    {
      scope: cardRef,
      dependencies: [],
      revertOnUpdate: true,
    },
  );

  return (
    <article ref={cardRef} className="company-card">
      <div className="logos item" style={cardStyle}>
        <a
          href={company.link}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${company.alt}`}
        >
          <img src={company.image} alt={company.alt} />
        </a>

        {company.secondImage && company.linkSecond && (
          <a
            href={company.linkSecond}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit second company profile"
          >
            <img src={company.secondImage} alt="Second company logo" />
          </a>
        )}
      </div>

      <p className="date item">{company.date}</p>
      <h2 className="position item">{company.position}</h2>
      <p className="description item">{company.desc}</p>
    </article>
  );
};

export default CompanyCard;
