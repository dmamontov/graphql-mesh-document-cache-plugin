# Document Cache Plugin for GraphQL Mesh

Document Cache Plugin is a plugin for GraphQL Yoga that disables the default caching mechanism and implements its own LRU (Least Recently Used) cache for documents.

## Installation

Before you can use the Document Cache Plugin, you need to install it along with GraphQL Mesh if you haven't already done so. You can install these using npm or yarn.

```bash
npm install @dmamontov/graphql-mesh-document-cache-plugin
```

or

```bash
yarn add @dmamontov/graphql-mesh-document-cache-plugin
```

## Configuration

### Modifying tsconfig.json

To make TypeScript recognize the Document Cache Plugin, you need to add an alias in your tsconfig.json.

Add the following paths configuration under the compilerOptions in your tsconfig.json file:

```json
{
  "compilerOptions": {
    "paths": {
       "document-cache": ["node_modules/@dmamontov/graphql-mesh-document-cache-plugin"]
    }
  }
}
```

### Adding the Plugin to GraphQL Mesh

You need to include the Document Cache Plugin in your GraphQL Mesh configuration file (usually .meshrc.yaml). Below is an example configuration that demonstrates how to use this plugin:

```yaml
plugins:
  - documentCache:
      enabled: true
```

## Conclusion

Remember, always test your configurations in a development environment before applying them in production to ensure that everything works as expected.