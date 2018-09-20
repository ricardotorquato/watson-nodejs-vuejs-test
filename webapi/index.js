const app = require( 'express' )()
    , bodyParser = require( 'body-parser' )
    , config = require( './config.json' )
    , AssistantV1 = require('watson-developer-cloud/assistant/v1')
    , assistant = new AssistantV1(config.assistant);

app.use( bodyParser.json() );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/conversation', (req, res) => {
    const { text, context = {} } = req.body;

    const params = {
        input: { text },
        workspace_id: config.workspace,
        context,
    };

    assistant.message(params, (err, response) => {
        if (err) res.status(500).json(err);
        res.json(response);
    });
});

const port = config.port || 3000;

app.listen(port , () => console.log(`Running on port ${port}`));