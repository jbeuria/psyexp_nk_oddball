import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
	  adapter: adapter({
		// default options are shown
		out: 'docs',
		pages: 'docs',
		assets: 'docs',
		precompress: true,
		envPrefix: '',
		polyfill: true,
		fallback: 'index.html'
	  })
	}
  };
