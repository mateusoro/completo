const {addonBuilder, serveHTTP} = require('stremio-addon-sdk')
var Promise = require('promise');
const builder = new addonBuilder({
    id: 'stremiodublado',
    version: '1.0.0',
    name: 'Dublado',
    catalogs: [],
    // Properties that determine when Stremio picks this add-on
    // this means your add-on will be used for streams of the type movie
    resources: ['stream'],
    types: ['movie'],
    idPrefixes: ['tt']
})

// takes function(args), returns Promise
builder.defineStreamHandler(function (args) {
    if (args.type === 'movie' && args.id === 'tt3076658') {
        // serve one stream to big buck bunny
        // return addonSDK.Stream({ url: '...' })
        const stream = {url: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4'}
        return Promise.resolve({streams: [stream]})
    } else {
        // otherwise return no streams
        return Promise.resolve({streams: []})
    }
})

serveHTTP(builder.getInterface(), {port: 7000});
