import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { UdeSLanguageMixin } from '../udes-language-mixin.js';

/**
 * @polymer
 * @customElement
 * @demo
 * @extends {PolymerElement}
 * @appliesMixin UdeSLanguageMixin
 */
class UdeSLanguageMixinDemo extends UdeSLanguageMixin(PolymerElement) {
  /**
   * Return the HTML template element.
   * @static
   * @return {HTMLTemplateElement} HTML template element.
   */
  static get template() {
    return html`
      <style>
        .bold {
          font-weight: bold;
        }
      </style>

      <ul>
        <li>
          <span class="bold">defaultLanguage</span>: [[defaultLanguage]]
        </li>
        <li>
          <span class="bold">language</span>: [[language]]
        </li>
        <li>
          <span class="bold">navigatorLanguage</span>: [[navigatorLanguage]]
        </li>
        <li>
          <span class="bold">navigatorLanguages</span>: [[navigatorLanguages]]
        </li>
        <li>
          <span class="bold">supportedLanguages</span>: [[supportedLanguages]]
        </li>
      </ul>
  `;
  }

  /**
   * Return the HTML tag.
   * @static
   * @return {String} HTML tag.
   */
  static get is() {
    return 'udes-language-demo';
  }
}

window.customElements.define('udes-language-mixin-demo', UdeSLanguageMixinDemo);
