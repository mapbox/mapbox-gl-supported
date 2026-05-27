import config from 'eslint-config-mourner';

export default [
    ...config,
    {rules: {'no-unused-vars': ['error', {caughtErrors: 'none'}]}}
];
