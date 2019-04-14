<template>
  <div class="demo-root social">
    <a href="https://www.facebook.com/">
      Facebook
    </a>
    <a href="https://www.twitter.com/">
      Twitter
    </a>
    <a href="https://www.linkedin.com/">
      LinkedIn
    </a>
    <a href="https://plus.google.com/">
      Google+
    </a>
  </div>
</template>

<style lang="scss" scoped>
.demo-root {
  align-content: center;
  display: grid;
  gap: size('shim');
  grid-auto-columns: 1fr;
  padding: size('shim');
  text-shadow: none;
}

// establish social media colors
$social: (
  'facebook': #3b5999,
  'twitter': #55acee,
  'linkedin': #0077B5,
  'google': #dd4b39,
);

// loop, to style social media links
@each $name, $color in $social {
  // selector based on href name
  [href*='#{$name}'] {
    background: $color;
    color: contrast($color);
  }
}

a {
  border-radius: 6px;
  display: block;
  padding: size('half-shim');
  text-decoration: none;
}
</style>
