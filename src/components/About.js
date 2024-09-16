import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const paragraphs = [
    "I'm a highly motivated Computer Science and Engineering student specializing in AI & ML at Malla Reddy Engineering College. With hands-on experience in data analysis, software development, and AI/ML projects, I'm passionate about improving efficiency and designing innovative solutions.",
    "My technical skills include programming in Python, Java, and web technologies, as well as expertise in AI & ML techniques such as Generative AI, NLP, and Data Analysis. I'm proficient with frameworks like .NET, Next.js, and React, and have experience with cloud platforms like Azure.",
    "I'm seeking opportunities to leverage my technical skills and creative problem-solving abilities in challenging roles that allow me to contribute to cutting-edge projects and drive impactful results.",
    "With a diverse skill set and adaptable work style, I'm equipped to excel in various work arrangements, including full-time positions, internships, remote work, part-time roles, freelance projects, contract assignments, and hourly consultations. My ability to quickly learn and adapt makes me an ideal candidate for dynamic and evolving work environments."
  ];

  return (
    <section name="about" className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white relative overflow-hidden py-16">
      <Helmet>
        <title>About Rajesh Kalidandi - AI & ML Specialist | Full Stack Developer</title>
        <meta name="description" content="Learn about Rajesh Kalidandi, a Computer Science and Engineering student specializing in AI & ML, with expertise in data analysis, software development, and innovative AI projects." />
        <meta name="keywords" content="Rajesh Kalidandi, About, AI, ML, Full Stack Developer, Computer Science, Engineering" />
      </Helmet>

      {/* Subtle background animation */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div className="max-w-screen-lg px-4 mx-auto flex flex-col justify-center w-full h-full relative z-10">
        <motion.div 
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={containerVariants}
          className="pb-8"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold inline border-b-4 border-cyan-500"
          >
            About Me
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
        >
          {paragraphs.map((paragraph, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              style={{ 
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.p 
                className="text-sm sm:text-base md:text-lg bg-gray-800 bg-opacity-50 p-3 sm:p-4 md:p-6 rounded-lg shadow-lg"
                style={{
                  transform: hoveredIndex === index ? 'translateZ(20px)' : 'none',
                  transition: 'transform 0.3s ease-out',
                }}
              >
                {paragraph}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <script type="application/ld+json">
        {`
          {
            "@context": "http://schema.org",
            "@type": "Person",
            "name": "Rajesh Kalidandi",
            "jobTitle": "AI & ML Specialist, Full Stack Developer",
            "description": "Computer Science and Engineering student specializing in AI & ML, with expertise in data analysis, software development, and innovative AI projects.",
            "url": "https://www.yourwebsite.com/about",
            "sameAs": [
              "https://www.linkedin.com/in/rajesh-kalidandi/",
              "https://github.com/RajeshKalidandi"
            ],
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": "Malla Reddy Engineering College"
            },
            "knowsAbout": ["AI", "Machine Learning", "Data Analysis", "Software Development", "Python", "Java", "Web Technologies", "Generative AI", "NLP", ".NET", "Next.js", "React", "Azure"]
          }
        `}
      </script>
    </section>
  );
};

export default About;