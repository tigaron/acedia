import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  documents: ['./src/graphql/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
