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
      <div className="card-content">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="card-image">
          <Image src={imageSrc} alt={title} width={300} height={300} />
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
        <section className="intro">
          <div className="the"> The </div>
          <h1 className="intro-title"> Technical Creative. </h1>
          <div className="about-me"> 
            <div className="header"> About Me. </div>
            <div className="about-me-content">
              <div className="about-me-content-left">
                <Image src="/images/images-2.png" alt="me" width={300} height={350} />
              </div>
              <div className="about-me-content-right">
                <p>I’m Daniel, a self-taught software engineer, entrepreneur, and aspiring industrial automation specialist. With over two years of experience in frontend and full-stack development, I’ve built and scaled digital products using Next.js, GSAP, and AI-driven automation. I’ve worked with AI startups, developed SaaS platforms, and optimized business processes through technology.</p>
                <p>Beyond engineering, I have an entrepreneurial background, managing Auntie Mimi’s Limeade and securing high-end product partnerships for my startup. I’m also working toward securing a direct PhD in AI, Finance, or Physics at Georgia Tech, using my AI projects as a foundation.</p>
              </div>
            </div>
          </div>
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
