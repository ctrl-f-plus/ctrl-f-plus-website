Remove:

- npm install @headlessui/react

/_ eslint-disable @next/next/no-img-element _/
'use client';

// bg-white
// #ff4694;
// #776fff
// text-gray-900
// text-gray-700
// text-gray-600
// hover:bg-gray-50
// bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]
// indigo - 200;
// indigo - 300;
// indigo - 500;
// indigo - 600;
// gray - 900 / 10;

#C7D2FE
#A5B4FC
#6366F1
#7C3AED

Gray #EEEFEF
Green #FCFDFC
red #FE2100
leprocon #0C462A
orange #FEEFE3
green #0F281D

0D1318

- Add this package: https://github.com/francoismassart/eslint-plugin-tailwindcss#rules
```bash
  npm i -D eslint-plugin-tailwindcss
  npm i -D @typescript-eslint/parser
```

```json
// .eslintrc.json

{
  "extends": ["next/core-web-vitals", "plugin:tailwindcss/recommended"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js"],
      "parser": "@typescript-eslint/parser"
    }
  ]
}
```
