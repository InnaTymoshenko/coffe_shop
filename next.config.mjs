/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['images.pexels.com']
	},
	webpack: config => {
		config.cache = false
		return config
	}
}

export default nextConfig
