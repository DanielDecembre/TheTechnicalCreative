"use client";

import Image from "next/image";
import "./page.css";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { ReactLenis } from "@studio-freight/react-lenis";

gsap.registerPlugin(ScrollTrigger);

type CardProps = {
  title: string;
  description: string;
  imageSrc: string;
  index: number;
};

const Card: React.FC<CardProps> = ({ title, description, imageSrc, index }) => {
  return (
    <div className="card" id={`card-${index + 1}`}>
      <div className="inner-card">
        <div className="card-image">
          <Image src={imageSrc} alt={title} width={200} height={200} />
        </div>
        <div className="card-content">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

const cardData: CardProps[] = [
  {
    title: "Technical Creative",
    description:
      "I'm a technical creative with a passion for building products that are both functional and aesthetically pleasing.",
    imageSrc: "/images/Images-2.jpg",
    index: 0,
  },
  {
    title: "Innovative Thinker",
    description:
      "I thrive on solving complex problems with innovative solutions that push the boundaries of technology.",
    imageSrc: "/images/jic.png",
    index: 1,
  },
  {
    title: "Design Enthusiast",
    description:
      "Merging design with functionality is what I do best, ensuring a seamless user experience.",
    imageSrc: "/images/FRANKblanc.PNG",
    index: 2,
  },
  {
    title: "Team Player",
    description:
      "Collaboration and knowledge sharing are key values I uphold in every project I work on.",
    imageSrc: "/images/Reni.png",
    index: 3,
  },
];

const Home: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
  
    const cardElements = gsap.utils.toArray<HTMLElement>(".card");
    if (cardElements.length === 0) return;
  
    ScrollTrigger.create({
      trigger: cardElements[0],
      start: "top 35%",
      endTrigger: cardElements[cardElements.length - 1],
      end: "bottom 30%",
      pin: ".intro",
      pinSpacing: false,
    });
  
    cardElements.forEach((card) => {
      const isLastCard = card === cardElements[cardElements.length - 1];
      const innerCard = card.querySelector(".inner-card");
      if (innerCard) {
        ScrollTrigger.create({
          trigger: card,
          start: "top 35%",
          endTrigger: ".outro",
          end: "top 65%",
          pin: true,
          pinSpacing: false,
        });
      }
    });
  }, { scope: container });

  return (
    <ReactLenis root>
      <div className="Main-Container" ref={container}>
        <section className="Hero">
          <Image src="/Reni.png" alt="Reni" width={100} height={100} />
        </section>
        <section className="intro">
          <h1> Hi, I'm Daniel The Technical Creative! </h1>
        </section>
        <section className="cards">
          {cardData.map((card) => (
            <Card key={card.index} {...card} />
          ))}
        </section>
        <section className="outro">
          <h1> Let's Connect! </h1>
        </section>
      </div>
    </ReactLenis>
  );
};

export default Home;
