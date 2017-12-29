var Slack = require('slack-node');
var request = require('request');
var fs = require('fs');

apiToken = process.env.SLACK_API_TOKEN;
slack = new Slack(apiToken);

if (!apiToken) {
    console.error("slack web api token is not set");
    console.error("please `export SLACK_API_TOKEN`");
    process.exit(1);
}

slack.api("emoji.list", function (err, response) {
    for(key in response.emoji){
        console.log(key);
        url = response.emoji[key];
        if(url.match(/alias/)){
            continue;
        }
        request
        .get(url)
        .on('response', function (res) {
        })
        .pipe(fs.createWriteStream('image/'+key+'.png'));
    }
});
