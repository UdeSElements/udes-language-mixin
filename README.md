# UdeS.LanguageMixin

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/UdeSElements/udes-language-mixin)
![Polymer 2 supported](https://img.shields.io/badge/Polymer%202-supported-blue.svg)
[![Build status](https://travis-ci.org/UdeSElements/udes-language-mixin.svg?branch=master)](https://travis-ci.org/UdeSElements/udes-language-mixin)

A simple mixin to be aware of the current language application.

The `language` property is computed from supported languages and from the 
browser languages.

It implements the observer pattern. You should call the `updateLanguage` 
function if you want to update the language of all observers. When the language 
is changed, the lang attribute of html element is update automatically.

```html
<html lang="en"></html>
```

The mixin also provide some read-only properties to your component:
- `defaultLanguage`: Default language defined globally.
- `language`: Current language.
- `navigatorLanguage`: Navigator language (see window.navigator.language).
- `navigatorLanguages`: Navigator languages (see window.navigator.languages).
- `supportedLanguages`: Supported languages defined globally.

## Demo
<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="demo/udes-language-demo.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<udes-language-demo></udes-language-demo>
```

## Usage
As the primary language at our organisation, `Université de Sherbrooke`, is 
French, you may want to change the `defaultLanguage` and the 
`supportedLanguages` properties.

To do so, add the following code inside your `index.html` BEFORE you import any
HTML component using this mixin.

```javascript
UdeS.Language = {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'fr'],
  };
```

## Localized files with Sherby.LocalizeMixin
If you want also to load some localized files, you should take a look on 
[`Sherby.LocalizeMixin`](https://www.webcomponents.org/element/SherbyElements/sherby-localize) instead.
