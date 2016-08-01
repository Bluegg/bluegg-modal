# Bluegg Modal

[A simple modal](http://codepen.io/matthewbeta/pen/yJPgWX)

## Usage

HTML Markup

```html

<!-- YOUR PAGE... -->

<!-- BUTTON TO OPEN MODAL -->
<button type="button" data-modal-target="modal-name">Open modal</button>

<!-- THE MODAL -->
<div class="modal js-modal" aria-hidden="true" aria-labelledby="modal-title" aria-describedby="modal-description" role="dialog" data-modal-trigger="modal-name">
	<div class="modal__inner">
		<h1 id="modal-title">Modal Title</h1>
		<p id="modal-description">Wahoo! Modals!</p>
		<button class="js-modal-close-btn">Close</button>
	</div>
</div>

<!-- OVERLAY USED WHEN MODALS ARE ACTIVE -->
<div id="modal-overlay" class="modal__overlay" tabindex="-1"></div>

</body>
```

NPM install
```shell
# install
npm install bluegg-modal
```

JS
```js
// import
var Modal = require('bluegg-modal');

// find modals
var modals = document.querySelectorAll('.js-modal');

// init on each modal˜˜
[].forEach.call(modals, function(item, i) {
	new Modal(modals[i]);
});
```

## Thanks
I borrowed the principles/spirit/accessibility work from Principles from this https://github.com/gdkraus/accessible-modal-dialog
