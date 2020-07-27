
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    $: false,
    weui: false,
    _hmt: false,
    API_URL: false,
    Handlebars: false
  },
  // add your custom rules here
  'rules': {
    'semi': [
      'error', 'always'
    ]
  }
}

