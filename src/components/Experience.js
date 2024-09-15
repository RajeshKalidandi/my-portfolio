import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-center text-white">Loading experiences...</div>;
  }

  return (
    <div name='experience' className='w-full min-h-screen bg-gray-900 text-gray-300'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <motion.div 
          className='pb-8'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className='text-4xl font-bold inline border-b-4 border-pink-600'>Experience</p>
          <p className='py-6'>My professional experience and education</p>
        </motion.div>

        <VerticalTimeline>
          {experiences.map((exp, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              date={exp.date}
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<FaBriefcase />}
            >
              <h3 className="vertical-timeline-element-title text-gray-800">{exp.title}</h3>
              <h4 className="vertical-timeline-element-subtitle text-gray-600">{exp.company}</h4>
              <ul className="mt-2 text-gray-700">
                {exp.description.map((item, i) => (
                  <li key={i} className="mb-1">{item}</li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}

          {education.map((edu, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--education"
              date={edu.date}
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FaGraduationCap />}
            >
              <h3 className="vertical-timeline-element-title text-gray-800">{edu.title}</h3>
              <h4 className="vertical-timeline-element-subtitle text-gray-600">{edu.institution}</h4>
              <ul className="mt-2 text-gray-700">
                {edu.description.map((item, i) => (
                  <li key={i} className="mb-1">{item}</li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Experience;
