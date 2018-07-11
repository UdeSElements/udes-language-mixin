/**
 * @namespace UdeS
 */
window.UdeS = window.UdeS || {};

/**
 * Global language object with the properties that you may want
 * to override inside your index.html.
 *
 * Outside the first override, don't update the `UdeS.Language`
 * object as it may produce inconsistent results.
 *
 * @public
 * @memberOf UdeS
 */
UdeS.Language = UdeS.Language || {
  defaultLanguage: 'en',
  supportedLanguages: ['en'],
};

/**
 * UdeS language mixin.
 *
 * A simple mixin to be aware of the current language application.
 *
 * The `language` property is computed from supported languages and
 * from the browser languages.
 *
 * It implements the observer pattern. You should call the
 * `updateLanguage` function if you want to update the language
 * of all observers. When the language is changed, the lang attribute of html
 * element is update automatically.
 *
 * ```html
 * <html lang="en"></html>
 * ```
 *
 * If you want also to load some localized files, you should take
 * a look on `UdeS.LocalizeMixin` instead (not published yet).
 *
 * @polymer
 * @mixinFunction
 * @param {Class} superClass The super class.
 * @return {Class} Class.
 */
export const UdeSLanguageMixin = superClass => class extends superClass {
  /**
   * Return the properties.
   * @static
   * @return {Object} Properties.
   */
  static get properties() {
    return {
      /**
       * Default language.
       * @public
       */
      defaultLanguage: {
        readOnly: true,
        type: String,
      },

      /**
       * Current language.
       * @public
       */
      lang: {
        readOnly: true,
        type: String,
      },

      /**
       * Navigator language.
       * @public
       */
      navigatorLanguage: {
        readOnly: true,
        type: String,
      },

      /**
       * Navigator languages.
       * @public
       */
      navigatorLanguages: {
        readOnly: true,
        type: String,
      },

      /**
       * Supported languages.
       * @public
       */
      supportedLanguages: {
        readOnly: true,
        type: String,
      },
    };
  }

  /**
   * Add the element to the observer elements.
   * @protected
   */
  ready() {
    super.ready();

    // Make sure the observers property is created
    if (!UdeS.Language._observers) {
      UdeS.Language._observers = [];
    }

    UdeS.Language._observers.push(this);

    // Check if the global navigator languages are initialised
    const isInitialised = UdeS.Language.navigatorLanguage &&
      UdeS.Language.navigatorLanguages;
    if (!isInitialised) {
      this.__initGlobalLanguageVariables();
    }

    // Set the read-only properties with the global variables
    this.setProperties({
      defaultLanguage: UdeS.Language.defaultLanguage,
      lang: UdeS.Language.lang,
      navigatorLanguage: UdeS.Language.navigatorLanguage,
      navigatorLanguages: UdeS.Language.navigatorLanguages,
      supportedLanguages: UdeS.Language.supportedLanguages,
    }, true);
  }

  /**
   * Remove the element from the observer elements.
   * @protected
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    const index = UdeS.Language._observers.indexOf(this);
    if (index !== -1) {
      UdeS.Language._observers.splice(index, 1);
    }
  }

  /**
   * Update the language for all observer elements.
   * @param {String} language Language.
   * @public
   */
  updateLanguage(language) {
    // Update the global current language
    UdeS.Language.lang = language;

    // Update the appellant in the case it is not yet in observers
    this.setProperties({ lang: language }, true);

    // Update the lang attribute of html element with the ISO 639-1 abbreviation
    this._updateLangAttributeOfHtml(language);

    // Notify all observers
    if (UdeS.Language._observers) {
      UdeS.Language._observers.forEach((element) => {
        element.setProperties({ lang: language }, true);
      });
    }
  }

  /**
   * Update the lang attribute of html element with the ISO 639-1 abbreviation.
   * @param {String} language Language.
   * @protected
   */
  _updateLangAttributeOfHtml(language) {
    const html = document.getElementsByTagName('html')[0];
    html.setAttribute('lang', language.substring(0, 2));
  }

  /**
   * Initialise the global languages variables.
   * @private
   */
  __initGlobalLanguageVariables() {
    const defaultLanguage = UdeS.Language.defaultLanguage;
    const supportedLanguages = UdeS.Language.supportedLanguages;

    // Retrieve the navigator language
    // @see http://gu.illau.me/posts/the-problem-of-user-language-lists-in-javascript/
    // @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language
    const navigatorLanguage = navigator.language ||
      navigator.userLanguage ||
      navigator.browserLanguage ||
      navigator.systemLanguage ||
      defaultLanguage;

    // Retrieve the navigator languages
    // (with a fallback if the navigator.languages is not defined)
    // @see https://developer.mozilla.org/fr/docs/Web/API/NavigatorLanguage/languages
    let navigatorLanguages = [navigatorLanguage];
    if (navigator.languages && navigator.languages.length) {
      navigatorLanguages = navigator.languages;
    }

    // Compute the global variables
    const globalLanguages = this.__computeGlobalLanguageVariables(
      defaultLanguage, supportedLanguages,
      navigatorLanguage, navigatorLanguages
    );

    // Update the global variables
    UdeS.Language.lang = UdeS.Language.lang || globalLanguages.language;
    UdeS.Language.navigatorLanguage = globalLanguages.navigatorLanguage;
    UdeS.Language.navigatorLanguages = globalLanguages.navigatorLanguages;

    // Set or update the lang attribute of the html element
    this._updateLangAttributeOfHtml(UdeS.Language.lang);
  }

  /**
   * Compute the global languages variables.
   * @param {String} defaultLanguage Default language.
   * @param {Array<String>} supportedLanguages Supported languages.
   * @param {String} navigatorLanguage Navigator language.
   * @param {Array<String>} navigatorLanguages Navigator languages.
   * @return {{language: String, navigatorLanguage: String, navigatorLanguages: Array<String>}} Global languages vars.
   * @private
   */
  __computeGlobalLanguageVariables(defaultLanguage, supportedLanguages, navigatorLanguage, navigatorLanguages) {
    let language = defaultLanguage;

    // Array that will contains all base languages
    const baseLanguages = [];
    navigatorLanguages.forEach((navigatorLanguage) => {
      const index = navigatorLanguage.indexOf('-');
      if (index !== -1) {
        baseLanguages.push(navigatorLanguage.substring(0, index));
      }
    });

    // Add the base at the end of the navigator languages
    navigatorLanguages = [...navigatorLanguages, ...baseLanguages];

    // Make sure that the new navigator languages are unique
    navigatorLanguages = navigatorLanguages.filter(
      (item, pos, self) => self.indexOf(item) === pos
    );

    // Return the first available language supported
    for (let i = 0; i < navigatorLanguages.length; ++i) {
      if (supportedLanguages.indexOf(navigatorLanguages[i]) !== -1) {
        language = navigatorLanguages[i];
        break;
      }
    }

    return {
      language: language,
      navigatorLanguage: navigatorLanguage,
      navigatorLanguages: navigatorLanguages,
    };
  }
};
