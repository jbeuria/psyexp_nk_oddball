import adapter from '@sveltejs/adapter-static';
const dev = process.argv.includes('dev');
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
	  }),
	  paths: {
		base: dev ? '' : '/psyexp_nk_oddball',
	  }
	}
  };
