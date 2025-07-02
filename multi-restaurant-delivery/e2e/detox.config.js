module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/detox/jest.config.js',
  apps: {
    ios: { type: 'ios.app', binaryPath: 'ios/build/Debug.app' }
  },
  devices: { simulator: { type: 'ios.simulator', device: { type: 'iPhone 14' } } },
  configurations: { 'ios.simulator': { device: 'simulator', app: 'ios' } }
};
