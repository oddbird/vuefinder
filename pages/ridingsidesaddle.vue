<template>
<project-base
  :edit="false"
  :meta="meta"
  src="
Now also a play
by [Buntport Theater][bunt]
and [Teacup Gorilla][teacup] --
Read
**[10 Myths on the Proper Application of Beauty Products][10-myths]**

[bunt]: http://buntport.com
[teacup]: http://teacupgorilla.com
[10-myths]: /10-myths

<!-- slide -->

> The offspring of Hermes and Aphrodite was called Hermaphroditus,
> and he was a good looking but sissy young man.

- #myth
{.tags}

<!-- slide -->

> Restless, Hermaphroditus forsook his childhood home
> to roam strange lands out west.

- #myth
{.tags}

<!-- slide -->

> In the mountains Hermaphroditus stumbles upon a shining pool --
> clear to the bottom, and ringed with vegetation.
> Perfect for a midnight swim, he thinks,
> pulling his shirt over his head.

- #myth
{.tags}

<!-- slide -->

> The nymph Salmacis was not one to bend the bow,
> or join the hunt,
> or go paint-balling with the older girls.
> Day after day she would bathe alone in her favorite spring,
> or lay among the reeds and smoke a bowl.

- #myth
{.tags}

<!-- slide -->

> Salmacis watches Hermaphroditus dip toe, then ankle --
> clap palm to naked thigh, and dive far out into the pool.

- #myth
{.tags}

<!-- slide -->

> Salmacis yelps giddy, diving after Hermaphroditus --
> fondling him, and forcing kisses.
> He fights to escape,
> but she strains the more
> and prays they never come apart.
> Gasping for air, they find their bodies fused into one.

- #myth
{.tags}

<!-- slide -->

> Ovid's protagonist isn't Hermaphroditus or Salmacis,
> but this cursed spring that makes men soft.

That's no curse, says Mother Clap.

- #molly
- #myth
{.tags}

<!-- slide -->

> Vitruvius tells a different story,
> without boy or nymph or sex or surgery.
> A merchant opens shop near the mountain spring,
> and her business attracts barbarians from the mountains.
> One by one they come down and abandon their savage ways --
> softened by the delights of civilization.

Miss Molly laughs and calls us all barbarians.

- #molly
- #myth
{.tags}

<!-- slide -->

Herman likes sundresses that show off his well-toned arms.
Like a real man, he says.

- #herman
{.tags}

<!-- slide -->

Herman starts running --
always at night,
when there's less texture and the shapes become clear --
skirting the pools of light around gas stations.
In the foothills he finds a spring,
and dives in for a midnight swim.

- #herman
{.tags}

<!-- slide -->

Herman sits in her blue raincoat for the rest of the night,
hunched forward, looking at nothing at all.

- #herman
{.tags}

<!-- slide -->

Herman opens all the curtains,
turns out the lights,
and dances to a slow tune on the midnight radio from downtown.

- #herman
{.tags}
" />
</template>

<script>
  import ProjectBase from '~/components/project/ProjectBase.vue';

  export default {
    components: { ProjectBase },
    data() {
      return {
        meta: {
          title: 'Riding SideSaddle* *| a novel in fragments*',
          type: 'books',
          view: 'grid',
          title_slide: 'default',
          shuffle: true,
          author: {
            name: 'Miriam Suzanne',
            url: 'http://oddbird.net/authors/miriam/',
          },
          org: {
            name: 'Teacup Gorilla',
            url: 'http://teacupgorilla.com/',
          },
        }
      }
    },
  }
</script>
