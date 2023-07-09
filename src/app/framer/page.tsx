'use client';
import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
// import './styles.css';

function FadeInWhenVisible({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}

function Box() {
  return (
    <div
      style={{
        padding: 40,
        background: 'white',
        display: 'inline-block',
        borderRadius: 5,
      }}
    />
  );
}

export default function Framer() {
  return (
    <div className="App">
      <p style={{ color: 'white', padding: 10 }}>Scroll down</p>
      <FadeInWhenVisible>
        <Box />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <Box />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <Box />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <Box />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <Box />
      </FadeInWhenVisible>
      <Box />
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>{' '}
      <FadeInWhenVisible>
        <h1>test</h1>
      </FadeInWhenVisible>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
    </div>
  );
}
