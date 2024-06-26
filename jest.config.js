module.exports = {
    // Basic test environment setup
    testEnvironment: 'jsdom', // Or 'node' depending on your needs
  
    // Transform files with babel-jest
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
  
    // Customize module resolution to handle webpack aliases
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      // Add any other webpack aliases or module mappings
    },
  
    // Setup files for Jest
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional setup file
  
    // Configure Jest coverage report
    coverageReporters: ['text', 'lcov'],
  
    // Jest watch plugins
    watchPlugins: [
      // Add watch plugins as needed
    ],
  };
  