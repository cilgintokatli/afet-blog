<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/utils/image';
	import type { Post } from '$lib/utils/sanity';

	export let post: Post;

	let currentVariant = 'bg-initial';
</script>

<!-- <div class="card">
    {#if post.mainImage}
      <img
        class="card__cover"
        src={urlFor(post.mainImage).width(500).height(300).url()}
        alt="Cover image for {post.title}"
      />
    {:else}
      <div class="card__cover--none" />
    {/if}
  
    <div class="card__container">
      <h3 class="card__title">
        <a class="card__link" href={`/post/${post.slug.current}`}>
          {post.title}
        </a>
      </h3>
      {#if post.excerpt}
        <p class="card__excerpt">{post.excerpt}</p>
      {/if}
      <p class="card__date">
        {formatDate(post._createdAt)}
      </p>
    </div>
  </div> -->

<a
	class="group {currentVariant} md:mx-0 mx-5 bg-white hover:bg-primary-600 rounded-xl transition ease-in-out overflow-hidden p-10 block motion-reduce:transition-none motion-reduce:hover:transform-none"
	href={`/blog/${post.slug.current}`}
>
	<header>
		<img
			src={urlFor(post.mainImage).width(500).height(300).fit('max').format('webp').url()}
			class="bg-black/50 w-full aspect-[12/9] object-cover shadow-md group-hover:shadow-none rounded-lg"
			alt={post.title}
		/>
	</header>
	<div class="py-4 space-y-4">
		{#if post.categories}
			{#each post.categories as category}
				<h4 class="h6 group-hover:text-white">{category.title}</h4>
			{/each}
		{/if}

		<h3 class="h3 group-hover:text-white font-bold" data-toc-ignore>
			{post.title}
		</h3>
		{#if post.excerpt}
			<article>
				<p class="group-hover:text-white">
					<!-- cspell:disable -->
					{post.excerpt}
					<!-- cspell:enable -->
				</p>
			</article>
		{:else}
			<article>
				<p class="group-hover:text-white font-light">
					<!-- cspell:disable -->
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet
					eligendi cumque consequatur tempore sint nisi sapiente. Iste beatae laboriosam iure molestias
					cum expedita architecto itaque quae rem.
					<!-- cspell:enable -->
				</p>
			</article>
		{/if}
	</div>
	<hr class="opacity-50" />
	<footer class="py-4 flex justify-start items-center space-x-4">
		{#if post.author}
			<figure
				class="avatar flex aspect-square text-surface-50 font-semibold justify-center items-center overflow-hidden isolate bg-surface-400-500-token w-8 rounded-full"
				data-testid="avatar"
			>
				<img
					class="avatar-image w-full h-full object-cover"
					src={urlFor(post.author.image).width(32).height(32).url()}
					alt=""
					style=""
					width="32"
					height="32"
				/>
			</figure>
		{/if}
		<div class="flex-auto flex justify-between items-center">
			{#if post.author}
				<div class="font-bold group-hover:text-white">{post.author.name}</div>
			{/if}
			<small class="group-hover:text-white">{formatDate(post._createdAt)}</small>
		</div>
	</footer>
</a>
