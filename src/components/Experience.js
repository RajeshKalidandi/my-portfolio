import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const ExperienceElement = ({ experience, isWork }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
    >
      <VerticalTimelineElement
        className={isWork ? "vertical-timeline-element--work" : "vertical-timeline-element--education"}
        date={experience.date}
        iconStyle={{ background: isWork ? 'rgb(33, 150, 243)' : 'rgb(233, 30, 99)', color: '#fff' }}
        icon={isWork ? <FaBriefcase /> : <FaGraduationCap />}
        contentStyle={{ background: 'rgba(255, 255, 255, 0.05)', boxShadow: '0 3px 0 rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}
        contentArrowStyle={{ borderRight: '7px solid rgba(255, 255, 255, 0.05)' }}
      >
        <h3 className="vertical-timeline-element-title text-white text-xl font-bold">{experience.title}</h3>
        <h4 className="vertical-timeline-element-subtitle text-gray-300 mt-2">{experience.company || experience.institution}</h4>
        <ul className="mt-4 text-gray-400 list-disc list-inside">
          {experience.description.map((item, i) => (
            <li key={i} className="mb-2">{item}</li>
          ))}
        </ul>
      </VerticalTimelineElement>
    </motion.div>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    fetch('/linkedin-data.json')
      .then(response => response.json())
      .then(data => {
        setExperiences(data.experiences);
        setEducation(data.education);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching LinkedIn data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        ></motion.div>
      </div>
    );
  }

  return (
    <div name='experience' className='w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-gray-300 py-16'>
      <div className='max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <motion.div 
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
          }}
          className='pb-8'
        >
          <h2 className='text-4xl font-bold inline border-b-4 border-gray-500'>Experience</h2>
          <p className='py-6 text-xl'>My professional journey and educational background</p>
        </motion.div>

        <VerticalTimeline lineColor={'rgba(255, 255, 255, 0.1)'}>
          {experiences.map((exp, index) => (
            <ExperienceElement key={index} experience={exp} isWork={true} />
          ))}
          {education.map((edu, index) => (
            <ExperienceElement key={index} experience={edu} isWork={false} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Experience;
