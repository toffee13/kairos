var https = require('https');

exports.list = function(page){

    console.log(process.env);

    return [];
}

exports.get = function(id, callback) {
    //https://api.vimeo.com/me/videos/{video_id}
    var id = 188947289;

    var options = {
        hostname: 'api.vimeo.com',
        path: `/me/videos`,
        headers: {
            'Authorization': `Bearer ${process.env.VIMEO_TOKEN}`,
        }
    };

    console.log(`Path: ${JSON.stringify(options)}`);

    var req = https.get(options, (res) => {

        console.log(`STATUS: ${res.statusCode}`);
        console.log(`DATA: ${res.data}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

        var body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            var jsonBody = JSON.parse(body);
            console.log(`BODY: ${JSON.stringify(jsonBody)}`);

            console.log('No more data in response.');

            callback(jsonBody);
        });
    });

    req.on('error', (e) => {

        console.log(`problem with request: ${e.message}`);

        callback({});
    });

    req.end();


}