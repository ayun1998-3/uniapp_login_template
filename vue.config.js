module.exports = {
	devServer: {
	    proxy: {
			// all the localhost:8080 endpoints are proxied at localhost:8081
			// all the http requests for starting with 'api' are redirected to same 
			// address at localhost:8080
			'^/api': {
				target: "http://localhost:8080",
				changeOrigin: true,
				// pathRewrite: {
				// 	"^/api" : "/"
				// }
			},

		}
	  }
}