import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import boundaries from "eslint-plugin-boundaries"
import importPlugin from "eslint-plugin-import"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      boundaries,
      "import": importPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Hook 호출 순서 문제 방지 및 의존성 배열 문제 방지
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }], // 컴포넌트 파일은 컴포넌트만 export함
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "simple-import-sort/imports": "warn", // import 문을 정렬
      "simple-import-sort/exports": "warn", // export 문을 정렬
      "import/first": "error", // import 문은 파일 최상단에만 있어야 함
      "import/no-duplicates": "error", // 같은 파일을 여러 번 import하면 에러

      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*", "./*/../*"],
        },
      ],

      // boundaries: FSD 레이어 강제 - 상위에서 하위 요소를 import 하는 것만 가능
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "shared", allow: ["shared"] },
            { from: "entities", allow: ["shared", "entities"] },
            { from: "features", allow: ["shared", "entities", "features"] },
            { from: "widgets", allow: ["shared", "entities", "features", "widgets"] },
            { from: "pages", allow: ["shared", "entities", "features", "widgets", "pages"] },
          ],
        },
      ],
    },
    settings: {
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      // boundaries 플러그인 설정
      "boundaries": {
        defaultIgnore: ["**/*.test.ts", "**/*.test.tsx"],
        types: [
          { type: "shared", pattern: "src/shared/*" },
          { type: "entities", pattern: "src/entities/*" },
          { type: "features", pattern: "src/features/*" },
          { type: "widgets", pattern: "src/widgets/*" },
          { type: "pages", pattern: "src/pages/*" },
        ],
      },
    },
  },
)
