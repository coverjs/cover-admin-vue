import linter from '@antfu/eslint-config';

const commonRules = {
  // 圈复杂度最大为 15
  'complexity': [2, { max: 15 }],
  // 要求使用 === 而不是 ==
  'eqeqeq': [2, 'always'],
  // 要求使用驼峰命名法
  'camelcase': 2,
  // 允许一个变量声明多个变量
  'one-var': [2, 'never'],
  // 文件最大行数为 300
  'max-lines': [2, { max: 300 }],
  // 函数参数最多为 3 个
  'max-params': [2, { max: 3 }],
  // 禁止使用 console
  'no-console': 2,
  // 禁止使用 debugger
  'no-debugger': 2,
  // 禁止使用 undefined
  'no-undefined': 2,
  // 禁止使用 var
  'no-var': 2,
  // 禁止行尾空格
  'style/no-trailing-spaces': 2,
  // 逻辑空行最多为 1 行
  'style/no-multiple-empty-lines': [2, { max: 1, maxEOF: 1, maxBOF: 0 }],
  // 要求使用单引号
  'style/quotes': [2, 'single'],
  // 要求语句末尾使用分号
  'style/semi': [2, 'always'],
  // 禁止不必要的括号
  'style/no-extra-parens': 2,
  // 逗号规则，允许行尾逗号
  'style/comma-dangle': [2, 'only-multiline'],
  // 箭头函数参数括号，仅在必要时使用
  'style/arrow-parens': [2, 'as-needed'],
  // 禁止使用 tab 缩进
  'style/no-tabs': 2,
  // 缩进规则，使用2个空格缩进
  'style/indent': [2, 2],
  // 强制使用 unix 换行符
  'style/linebreak-style': [2, 'unix'],
  // 允许无限禁用规则，设置为 0 表示关闭此规则
  'eslint-comments/no-unlimited-disable': 0,
};

const vueRules = {
  // Vue 属性连字符规则，始终使用连字符
  'vue/attribute-hyphenation': [2, 'always'],
  // Vue 每行最多属性数规则，单行最多 3 个
  'vue/max-attributes-per-line': [2, {
    singleline: 3,
  }],
  // Vue template 模版中组件规则，使用 kebab-case
  'vue/component-name-in-template-casing': [2, 'kebab-case'],
  // Vue 禁止在 await 后面使用 expose 和 生命周期
  'vue/no-expose-after-await': 2,
  'vue/no-lifecycle-after-await': 2,
  // 限制 sfc 语言规则
  'vue/block-lang': [2, {
    script: {
      lang: ['ts', 'tsx'],
    },
    style: {
      lang: 'scss',
    },
  }],
  // 块顺序规则
  'vue/block-order': [2, { order: ['script', 'template', 'style'] }],
  // 组件风格规则，使用 script-setup
  'vue/component-api-style': [2, ['script-setup']],
  // 组件emits声明规则
  'vue/define-emits-declaration': [2, 'type-based'],
  // 组件props声明规则
  'vue/define-props-declaration': [2, 'type-based'],
  // 样式属性规则，必须使用 scoped
  'vue/enforce-style-attribute': [2, { allow: ['scoped'] }],
  // 校验使用 defineOptions
  'vue/valid-define-options': 2,
  // 禁止 template 中使用 this
  'vue/this-in-template': [2, 'never'],
};

export default linter({
  typescript: true,
  vue: true,
  yaml: false,
  ignores: [
    '**/dist/**',
    'scripts/verifyCommit.js',
    'public',
    'tsconfig.*.json',
    'tsconfig.json',
  ],
  rules: { ...commonRules, ...vueRules }
});
