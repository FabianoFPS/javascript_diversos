import memeMaker from '@erickwendel/meme-maker';

const options = {
  image: './img/spider.jpeg',         // Required
  outfile: './img/spider-meme.png',  // Required
  topText: 'TOP',            // Required
  bottomText: 'BOTTOM'
}

memeMaker(options).then(_ => {
  console.log('Image saved: ' + options.outfile)
}).catch(error => console.log(error));