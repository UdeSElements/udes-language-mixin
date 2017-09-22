# UdeS.LanguageMixin
A simple mixin to be aware of the current language application.

The `language` property is computed from supported languages and
from the browser languages.

It implements the observer pattern. You should call the
`updateLanguage` function if you want to update the language
of all observers.

If you want also to load some localized files, you should take
a look on `UdeS.LocalizeMixin` instead.