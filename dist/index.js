'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ACCESSIBLE MODAL
 * Principles borrowed from this https://github.com/gdkraus/accessible-modal-dialog
 *
 */

var FOCUSABLE_ELEMENTS = 'a[href], area[href], input:not([disabled]):not([readonly]):not([type=hidden]), select:not([disabled]):not([readonly]):not([type=hidden]), textarea:not([disabled]):not([readonly]):not([type=hidden]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
var OVERLAY = document.getElementById('modal-overlay');
var PAGE = document.getElementById('global-wrapper');

var lastFocus;
var scrollPos;

var Modal = function () {
	function Modal(modal) {
		_classCallCheck(this, Modal);

		if (!modal) {
			return;
		}

		this.modal = modal;

		this.cancelBtn = this.modal.querySelectorAll('.js-modal-cancel-btn')[0];
		this.closeBtn = this.modal.querySelectorAll('.js-modal-close-btn')[0];
		this.enterBtn = this.modal.querySelectorAll('.js-modal-enter-btn')[0];
		// items which triger this modal need to have a data-attribute ('data-target-name') which matches this.
		this.triggerName = this.modal.getAttribute('data-modal-trigger');
		var triggerSelector = '[data-modal-target="' + this.triggerName + '"]';
		this.triggers = [].slice.call(document.querySelectorAll(triggerSelector));
		this.focusableElements = [].slice.call(this.modal.querySelectorAll(FOCUSABLE_ELEMENTS));
		this.firstItem = this.focusableElements[0];

		this.keys = {
			esc: 27,
			tab: 9,
			enter: 13
		};

		this._init();
	}

	_createClass(Modal, [{
		key: '_init',
		value: function _init() {
			var _this = this;

			// Add listener for all clicks on the targets for the modal
			this.triggers.forEach(function (el) {
				return el.addEventListener('click', function (event) {
					return _this._showModal(_this.modal, event);
				}, false);
			});

			this.closeBtn.addEventListener('click', function () {
				return _this._hideModal(_this.modal);
			}, false);

			if (this.cancelBtn !== undefined) {
				this.cancelBtn.addEventListener('click', function () {
					return _this._cancelBtnEnter(_this.modal, event);
				}, false);
			}

			if (this.enterBtn !== undefined) {
				this.enterBtn.addEventListener('click', function () {
					return _this._cancelButtonModal(_this.modal);
				}, false);
			}

			this.modal.addEventListener('keydown', function (event) {
				return _this._trapTabKey(_this.modal, event);
			}, false);

			this.modal.addEventListener('keydown', function (event) {
				return _this._trapEscapeKey(event);
			}, false);
		}
	}, {
		key: '_trapEscapeKey',
		value: function _trapEscapeKey(evt) {
			// if escape pressed
			if (evt.which == this.keys.esc) {
				// close the modal window
				this.closeBtn.click();
			}
		}
	}, {
		key: '_trapTabKey',
		value: function _trapTabKey(modal, evt) {
			// if tab or shift-tab pressed
			if (evt.which == this.keys.tab) {

				// get list of focusable items (as an array)
				var focusableItems = [].slice.call(modal.querySelectorAll(FOCUSABLE_ELEMENTS));

				// get currently focused item
				var focusedItem = document.activeElement;

				// get the number of focusable items
				var numberOfFocusableItems = focusableItems.length;

				// get the index of the currently focused item
				var focusedItemIndex = focusableItems.indexOf(focusedItem);

				if (evt.shiftKey) {
					//back tab
					// if focused on first item and user preses back-tab, go to the last focusable item
					if (focusedItemIndex == 0) {
						focusableItems[numberOfFocusableItems - 1].focus();
						evt.preventDefault();
					}
				} else {
					//forward tab
					// if focused on the last item and user preses tab, go to the first focusable item
					if (focusedItemIndex == numberOfFocusableItems - 1) {
						focusableItems[0].focus();
						evt.preventDefault();
					}
				}
			}
		}
	}, {
		key: '_setInitialFocus',
		value: function _setInitialFocus() {
			// set focus to first focusable item
			this.firstItem.focus();
		}
	}, {
		key: '_enterButtonModal',
		value: function _enterButtonModal() {
			// BEGIN logic for executing the Enter button action for the modal window
			/* OPTIONAL CODE TO HANDLE FORM SUBMITS ETC GOES HERE */
			// END logic for executing the Enter button action for the modal window
			this._hideModal();
		}
	}, {
		key: '_cancelBtnEnter',
		value: function _cancelBtnEnter(modal, evt) {
			if (evt.which === this.keys.enter || evt.type === 'click') {
				evt.preventDefault();
				this._hideModal(modal);
			}
		}
	}, {
		key: '_showModal',
		value: function _showModal(modal, evt) {

			scrollPos = window.pageYOffset || document.documentElement.scrollTop;

			if (evt.which === this.keys.enter || evt.type === 'click') {

				evt.preventDefault();

				// save scrollPos
				document.documentElement.classList.add('modal-is-open');
				PAGE.setAttribute('aria-hidden', 'true'); // mark the main page as hidden
				modal.setAttribute('aria-hidden', 'false'); // mark the modal window as visible
				OVERLAY.classList.add('is-active'); // insert an overlay to prevent clicking and make a visual change to indicate the main apge is not available
				modal.classList.add('is-active'); // make the modal window visible
				// save current focus
				lastFocus = document.activeElement;

				this._setInitialFocus();
			}
		}
	}, {
		key: '_hideModal',
		value: function _hideModal(modal) {
			OVERLAY.classList.remove('is-active'); // remove the overlay in order to make the main screen available again
			modal.classList.remove('is-active'); // hide the modal window
			modal.setAttribute('aria-hidden', 'true'); // mark the modal window as hidden
			PAGE.setAttribute('aria-hidden', 'false'); // mark the main page as visible
			document.documentElement.classList.remove('modal-is-open');
			// set focus back to element that had it before the modal was opened
			lastFocus.focus();
			document.documentElement.scrollTop = document.body.scrollTop = scrollPos;
		}
	}]);

	return Modal;
}();

exports.default = Modal;