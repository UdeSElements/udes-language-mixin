import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { UdeSLanguageMixin } from '../udes-language-mixin.js';

/**
   * @polymer
   * @customElement
   * @extends {PolymerElement}
   * @appliesMixin UdeSLanguageMixin
   */
class UdeSLanguageMixinTestElement extends UdeSLanguageMixin(PolymerElement) { }

customElements.define('udes-language-mixin-test-element', UdeSLanguageMixinTestElement);
