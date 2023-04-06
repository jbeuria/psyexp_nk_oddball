import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
	  adapter: adapter({
		// default options are shown
		out: 'build',
		precompress: true,
		envPrefix: '',
		polyfill: true
	  })
	}
  };
