const effectsData = {
  'chrome': {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },

  'sepia': {
    filter: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },

  'marvin': {
    filter: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
  },

  'phobos': {
    filter: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
  },

  'heat': {
    filter: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
  },
};

export { effectsData };
