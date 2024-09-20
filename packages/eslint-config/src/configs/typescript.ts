import { GLOB_MARKDOWN, GLOB_TS, GLOB_TSX } from '@/constants'
import type { TypeScriptOptions } from '@/types/options'
import type { TypedTypeScript } from '@/types/specific'
import { interop, renameRules } from '@/utils'

export async function typescript(
  options: TypeScriptOptions = {}
): Promise<TypedTypeScript[]> {
  // parse options
  const {
    exts,
    overrides,
  } = options

  const overriding = overrides && Object.keys(overrides).length > 0;

  const [
    pluginTs,
    parserTs
  ] = await Promise.all([
    interop(import('@typescript-eslint/eslint-plugin')),
    interop(import('@typescript-eslint/parser'))
  ])

  const files = options.files ?? [
    GLOB_TS,
    GLOB_TSX,
    ...(exts ?? []).map(ext => `**/*.${ext}`)
  ]

  const filesTypeAware = options.filesTypeAware ?? [GLOB_TS, GLOB_TSX]
  const ignoresTypeAware = options.ignoresTypeAware ?? [
    `${GLOB_MARKDOWN}/**`,
  ]

  const tsconfigPath = options?.tsconfigPath
    ? options.tsconfigPath
    : undefined

  const isTa = options?.tsconfigPath ?? false

  function makeParser(
    ta: boolean,
    includes: string[],
    excludes?: string[],
  ): TypedTypeScript {
    return {
      name: `alphayou/typescript/${ta ? 'type-aware-parser' : 'parser'}`,
      files: includes,
      ...excludes ? { ignores: excludes } : {},
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          sourceType: 'module',
          extraFileExtensions: exts?.map(ext => `.${ext}`),
          ...ta
            ? {
              projectService: {
                allowDefaultProject: ['./*.js'],
                defaultProject: tsconfigPath,
              },
              tsconfigRootDir: process.cwd(),
            }
            : {},
        }
      }
    }
  }

  const typeAwareRules: TypedTypeScript['rules'] = {
    'dot-notation': 'off',
    'no-implied-eval': 'off',
    'ts/await-thenable': 'error',
    'ts/dot-notation': ['error', { allowKeywords: true }],
    'ts/no-floating-promises': 'error',
    'ts/no-for-in-array': 'error',
    'ts/no-implied-eval': 'error',
    'ts/no-misused-promises': 'error',
    'ts/no-unnecessary-type-assertion': 'error',
    'ts/no-unsafe-argument': 'error',
    'ts/no-unsafe-assignment': 'error',
    'ts/no-unsafe-call': 'error',
    'ts/no-unsafe-member-access': 'error',
    'ts/no-unsafe-return': 'error',
    'ts/promise-function-async': 'error',
    'ts/restrict-plus-operands': 'error',
    'ts/restrict-template-expressions': 'error',
    'ts/return-await': ['error', 'in-try-catch'],
    'ts/strict-boolean-expressions': ['error', { allowNullableBoolean: true, allowNullableObject: true }],
    'ts/switch-exhaustiveness-check': 'error',
    'ts/unbound-method': 'error',
  }

  return [
    {
      name: 'alphayou/typescript/setup',
      plugins: {
        ts: pluginTs,
      }
    },
    ...isTa
      ? [
        makeParser(false, files),
        makeParser(true, filesTypeAware, ignoresTypeAware)
      ]
      : [
        makeParser(false, files)
      ],
    {
      files,
      name: 'alphayou/typescript/rules',
      rules: {
        ...renameRules(
          pluginTs.configs['eslint-recommended'].overrides![0].rules!,
          { '@typescript-eslint': 'ts' },
        ),
        ...renameRules(
          pluginTs.configs.strict.rules!,
          { '@typescript-eslint': 'ts' },
        ),
        'no-dupe-class-members': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',

        'ts/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
        'ts/consistent-type-definitions': ['error', 'interface'],
        'ts/consistent-type-imports': ['error', {
          disallowTypeAnnotations: false,
          prefer: 'type-imports',
        }],

        'ts/method-signature-style': ['error', 'property'],
        'ts/no-dupe-class-members': 'error',
        'ts/no-dynamic-delete': 'off',
        'ts/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
        'ts/no-explicit-any': 'off',
        'ts/no-extraneous-class': 'off',
        'ts/no-import-type-side-effects': 'error',
        'ts/no-invalid-void-type': 'off',
        'ts/no-non-null-assertion': 'off',
        'ts/no-redeclare': ['error', { builtinGlobals: false }],
        'ts/no-require-imports': 'error',
        'ts/no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        }],
        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'ts/no-useless-constructor': 'off',
        'ts/no-wrapper-object-types': 'error',
        'ts/triple-slash-reference': 'off',
        'ts/unified-signatures': 'off',
      },
      ...overriding
        ? [
          {
            name: 'alphayou/typescript/overrides',
            rules: {
              ...overrides
            }
          }
        ]
        : [],
      ...isTa
        ? [
          {
            name: 'alphayou/typescript/type-aware',
            files: filesTypeAware,
            ignores: ignoresTypeAware,
            rules: {
              ...typeAwareRules
            }
          }
        ]
        : []
    }
  ]
}
