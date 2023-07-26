<script>
	import { fade, fly } from 'svelte/transition';

	export let fError;
</script>

<ul class="list-inside list-disc ml-5">
	<li transition:fly={{ y: 20, duration: 600 }}>{fError.message}</li>
</ul>
