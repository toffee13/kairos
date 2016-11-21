var https = require('https');
var _ = require('underscore');
var querystring = require('querystring');
var pagination = require('pagination');

const options = {
    hostname: 'api.vimeo.com',
    path: '/me/videos',
    headers: {
        'Authorization': `Bearer ${process.env.VIMEO_TOKEN}`,
    }
};

var videos = [];

//Get Vimeo videos
fetchVideos();

//Set 5 minute interval to get Vimeo videos
setInterval(function(){
    console.log("Fetch Video");
    fetchVideos();
}, 1000 * 60 * 5);

function fetchVideos(){
    var req = https.get(options, (res) => {
        console.info(`vimeo response result: ${res.statusCode}`);

        var body = '';
        res.on('data', (chunk) => {body += chunk});
        res.on('end', () => {
            videos = JSON.parse(body)["data"];
        });
    });

    req.on('error', (e) => {
        console.error(`VIMEO Request ERROR : ${e.message}`);
    });

    req.end();
}

/**
 * pagination object
 *
 * @param currentPage
 * @param perPage
 * @returns {{totalPage: number, startPage: number, currentPage: (*|number), perPage: (*|number), totalVideo: Number}}
 */
exports.getPagination = function(currentPage, perPage){
    currentPage = currentPage || 1;
    perPage = perPage || 12;

    return pagination.create('search', {
        prelink:'/',
        current: currentPage,
        rowsPerPage: perPage,
        totalResult: videos.length
    }).getPaginationData();
};

/**
 *  Get courses
 *
 * @param page
 * @param perPage
 * @returns {{page: (*|number), per_page: (*|number), total: Number, data: Array.<T>}}
 */
exports.list = function(page, perPage){
    page = page || 1;
    perPage = perPage || 12;

    var startCourse = (page - 1) * 12;

    return {
        page: page,
        per_page: perPage,
        total: videos.length,
        data: videos.slice( startCourse, startCourse + perPage)
    }

};

/**
 * Get Course Detail by given ID
 *
 * @param id
 * @returns {T}
 */
exports.get = function(id) {
    return videos.find((video) => {
        return video.uri.endsWith(id);
    });
};