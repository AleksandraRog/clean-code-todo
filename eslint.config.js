import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import unicorn from 'eslint-plugin-unicorn';
import sonarjs from 'eslint-plugin-sonarjs';

export default [
  js.configs.recommended,
  {
    plugins: {
      unicorn,
      sonarjs,
    },
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      // 1. СТИЛЬ И НАИМЕНОВАНИЯ
      // Требует именовать переменные и функции только в camelCase (например, myVariable)
      camelcase: ['error', {properties: 'never'}],
      // Запрещает объявление нескольких переменных через запятую. Каждая переменная должна быть на своей строке
      'one-var': ['error', 'never'],
      // Запрет на невнятные или слишком короткие имена (кроме индексов циклов i, j, координат x, y)
      'id-length': ['warn', {min: 2, exceptions: ['i', 'j', 'x', 'y', '_']}],

      // 2. ПОИСК КРИТИЧЕСКИХ ОШИБОК И ЗАЩИТА ОТ ОПЕЧАТОК
      // Запрещает нестрогое сравнение '==' и '!='. Требует строгое '===' и '!=='
      eqeqeq: ['error', 'always'],
      // Запрещает использовать 'await' внутри циклов for/while
      'no-await-in-loop': 'error',
      // Запрещает использовать 'return' внутри конструктора Promise
      'no-promise-executor-return': 'error',
      // Ловит опечатки, когда вы случайно использовали обычные кавычки вместо косых для шаблонной строки
      'no-template-curly-in-string': 'error',
      // Запрещает сравнивать переменную саму с собой (if (x === x))
      'no-self-compare': 'error',
      // Находит циклы, которые гарантированно завершатся на первой же итерации
      'no-unreachable-loop': 'error',
      // Запрещает "хакерские" сокращения для приведения типов (требует явного Number() или Boolean())
      'no-implicit-coercion': 'error',
      // Полностью запрещает выполнение небезопасного динамического текста в виде кода через функцию eval()
      'no-eval': 'error',
      // Запрещает принудительно возвращать кастомные значения из конструктора класса через return
      'no-constructor-return': 'error',
      // Ловит опечатки в конструкции switch-case, когда одно и то же условие проверяется дважды
      'no-duplicate-case': 'error',

      // 3. АРХИТЕКТУРА И ЧИСТЫЙ КОД (Встроенные правила ESLint)
      // Ограничивает цикломатическую сложность (количество ветвлений) внутри одной функции. Максимум 10 путей
      complexity: ['error', 10],
      // Ограничивает максимальную глубину вложенности блоков {} друг в друга. Максимум 3 уровня (по чек-листу)
      'max-depth': ['error', 3],
      // Ограничивает максимальный размер одной функции до 40 строк кода (не считая комментариев и пустых строк)
      'max-lines-per-function': ['warn', {max: 40, skipBlankLines: true, skipComments: true}],
      // Находит «мертвый» код, который написан сразу после инструкций return, throw или break
      'no-unreachable': 'error',
      // Выдает ошибку, если переменная была создана, но ни разу не использовалась (игнорирует аргументы с префиксом _)
      'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      // Запрещает писать бессмысленные условия, которые всегда истинны или ложны (например, if (true))
      'no-constant-condition': 'error',
      // Скобки и блоки: тело из нескольких инструкций ОБЯЗАТЕЛЬНО заключается в блоки {}
      curly: ['error', 'multi-line'],
      // Try-catch не пустые (ошибки должны обрабатываться)
      'no-empty': ['error', {allowEmptyCatch: false}],

      // 4. ОБЯЗАТЕЛЬНЫЕ ПО ЗАДАНИЮ И ЧЕК-ЛИСТУ
      'no-var': 'error', // Запрещает var (требует let/const)
      'prefer-const': 'error', // Требует const, если переменная не меняется
      'no-console': 'warn', // Разрешает console.log, но с желтым предупреждением

      // 5. АВТОМАТИЗАЦИЯ БЕЗОПАСНОЙ РАБОТЫ С ДАННЫМИ (Исправленный синтаксис)
      // Контролирует консистентность и безопасность написания опциональных цепочек ?.
      'unicorn/consistent-optional-chaining': 'error',
      // Защищает от фатальных падений, если ?. используется там, где он вызовет TypeError дальше по цепочке
      'no-unsafe-optional-chaining': 'error',
      // Требует ?? вместо тернарных проверок на null/undefined
      'unicorn/prefer-logical-operator-over-ternary': 'error',
      // Запрещает запутанные тернарные операторы (помогает не терять 0 и false)
      'no-unneeded-ternary': 'error',

      // 6. ИНТЕЛЛЕКТУАЛЬНЫЕ ПРАВИЛА SONARJS (Проверяются руками)
      // Early return: находит места, где можно сразу вернуть значение и уменьшить вложенность
      'sonarjs/prefer-immediate-return': 'error',
      // Запрет дублирования логики (Принцип DRY / Код не поддерживается независимо в разных ветках if)
      'sonarjs/no-duplicated-branches': 'error',
    },
  },
  // Отключает правила форматирования ESLint, которые конфликтуют с вашим Prettier
  eslintConfigPrettier,
];
