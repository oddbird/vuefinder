<template>
  <div class="box">
    <span class='css'>CSS</span>
    <span class='is'>is</span>
    <span class='awesome'>Awesome</span>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}

:root {
	align-content: center;
  color: hsl(150, 10%, 10%);
	background-color: hsl(180, 100%, 30%);
	background-image: url('/images/dynamic-css/calm-waters.jpg');
	background-size: cover;
	background-position: bottom right;
	display: grid;
	justify-content: center;
	font-size: calc(50px + 5vmin);
  font-family: 'bookmania', serif;
	font-kerning: normal;
	font-variant-ligatures: common-ligatures contextual discretionary-ligatures;
	font-variant-numeric: oldstyle-nums proportional-nums;
	font-feature-settings: "kern", "liga", "clig", "calt", "onum", "pnum", "dlig";
	min-height: 100vh;
	padding: 1rem;
}


.box {
	--box: 2.5em;
	border-radius: 0.125em;
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	grid-template-rows: repeat(2, minmax(0, 1fr));
  width: var(--box);
  height: var(--box);
	position: relative;

	&::after {
		background: linear-gradient(transparent, hsl(220, 100%, 60%));
		border: 2px solid hsl(220, 100%, 60%);
		border-radius: 0.125em;
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		mix-blend-mode: difference;
	}
}


span {
	color: white;
	display: block;
	mix-blend-mode: hard-light;
	text-shadow: 1px 1px 0 hsla(0, 100%, 10%, 0.5);
}


.css {
	font-size: 1.25em;
	font-feature-settings: 'ss16';
	grid-area: 1 / 1 / auto / -1;
	margin-right: 0.25em;
	text-indent: -0.3em;

	&::first-letter {
		font-feature-settings: 'ss10';
	}
}


.is {
	align-self: baseline;
	display: inline-block;
	font-style: italic;
	font-size: 0.5em;
	font-feature-settings: 'ss13';
	grid-area: 2 / 1;
	justify-self: start;
	padding: 0.5em;
}


.awesome {
	background-image: url('/images/dynamic-css/horizon-nature.jpg');
	background-size: cover;
	background-position: center center;
	-webkit-background-clip: text;
	color: transparent;
	font-feature-settings: 'swsh';
	font-weight: bold;
	grid-area: 2 / 2 / auto/ span 3;
	margin-left: -0.35em;
}
</style>
