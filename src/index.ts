import { createLRUCache, type Plugin } from 'graphql-yoga';
import { Md5 } from 'ts-md5';
import { stringInterpolator } from '@graphql-mesh/string-interpolation';
import { type MeshPlugin, type MeshPluginOptions } from '@graphql-mesh/types';
import { type CacheDocumentPluginConfig } from './types';

export default function useCacheDocument(
    options: MeshPluginOptions<CacheDocumentPluginConfig>,
): MeshPlugin<any> {
    const enabled =
        typeof options.enabled === 'string'
            ? stringInterpolator.parse(options.enabled, { env: process.env }) === 'true'
            : options.enabled;

    const documentCache = createLRUCache();

    return {
        onParams({ params, setParams }) {
            if (!params.variables || !params.query) {
                return;
            }

            // Fix default cache
            setParams({
                query: params.query + '\n# variables=' + JSON.stringify(params.variables),
                variables: params.variables,
                extensions: params.extensions,
                operationName: params.operationName,
            });
        },
        onParse({ params, setParsedDocument }) {
            if (!enabled) {
                // @ts-expect-error
                return;
            }

            const strDocumentHash = Md5.hashStr(params.source.toString().replaceAll(/^#.*$/gm, ''));

            const document = documentCache.get(strDocumentHash);
            if (document) {
                setParsedDocument(document);

                // @ts-expect-error
                return;
            }

            return ({ result }) => {
                if (result != null && !(result instanceof Error)) {
                    documentCache.set(strDocumentHash, Object.assign({}, result));
                }
            };
        },
    } as Plugin;
}
