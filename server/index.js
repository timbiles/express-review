// express is server framework built on node, makes it easy to listen to http requests.
const express = require('express');

//bodyParser is a package that puts the request's body on the req.body object.
const bodyParser = require('body-parser');
// or
// const {json} = require('body-parser')

//app is equal to express invoked. The get/post/put/delete & listen methods can be accessed from app.
const app = express();

//memorize this. this is how to make bodyParser do its job.
app.use(bodyParser.json());
// if you destructured json from body-parser, it would look like this...
app.use(json())

//our fake DB (database)
let music = [
  {
    title: 'We Are the Champions',
    id: 0
  },
  {
    title: 'Bohemian RhapCity',
    id: 1
  },
  {
    title: 'Perfect Pillow',
    id: 2
  }
];

//we start at three because we already have 3 songs in the music array
let id = arr.length;

/**
 * How the Request / Response Cycle Works
 *
 * The Front-End is the side that makes requests. The Back-End is used to serve those requests, and give back responses.
 * Follow along with me here. This will kinda be a story.
 *
 * We want to generate a list of music on the react-side (front-end). So on the front-end, they'll make a REQUEST
 * using axios. They will put axios.get('/api/music') . This in turn will 'hit' the corresponding endpoint that we made in the backend,
 *     ex. app.get('/api/music', (req, res) => res.status(200).send(music));
 * Once they have hit the endpoint, we will send a response back containing the status code, and the actual resources.
 *
 * Front end makes a request, back-end will send back a response.
 */

// they make a .get request to /api/test, we respond with a message within an object.
// Why? It's better to send back a data structure (array, object).
app.get('/api/test', (req, res) => {
  console.log('res: ', res);
  console.log('req: ', req);

  res.status(200).send({ message: 'Niceeeeee' });
});

// they make a .get request to /api/music, we respond with the music array.
app.get('/api/music', (req, res) => {
  res.status(200).send(music);
});

// they make a .get request to /api/music/:id, we response with the song with corresponding id they passed in.
app.get('/api/music/:id', (req, res) => {
  //we can grab the id off of req.params (this assumes that they passed the id in the url)
  const id = req.params.id;
  //we attempt find the song in the array with the id that got passed in.
  let musicIndex = music.findIndex(song => song.id == id);

  //if the id doesn't exist,
  if (musicIndex === -1) {
    //we send back an error
    res.status(403).send({ error: 'No music found.' });
  } else {
    //otherwise, the song exists, and then we return it.
    res.status(200).send(music[musicIndex]);
  }
});

// they make a .post request to /api/music and pass an object containing new music with the request.
// This object that they pass with the request is called the body object.
// body-parser makes this object accessible on the request, more specifically 'req.body'
app.post('/api/music', (req, res) => {
  // the front end passed an object with a title property on it, so we can access it from req.body.
  const { title } = req.body;
  // const title = req.body.title;

  //we create a new song with the title, the id (that we will make for them), and then increment id.
  let newSong = {
    title,
    id
  };
  id++;

  //we add the song to the array and sent the whole array back as a response.
  music.push(newSong);
  res.status(200).send(music);
});

// figure out this delete endpoint.
app.delete('/api/music/:id', (req, res) => {
  const { id } = req.params;
  let musicIndex = music.findIndex(song => song.id == id);
  if (musicIndex === -1) {
    res.status(403).send({ error: 'No music found.' });
  } else {
    music.splice(musicIndex, 1);
    res.status(200).send(music);
  }
});

// typically set our port to 3001
const port = 3001;

//we tell express to actively listen to port 3001.
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});