---
title: p5.js
date: 2020-04-28
author: Bjørn Fjukstad
---

In Bodø I help organize local the coding club.  Because of the covid-19
situation we are hosting the club on Discord, rather than in person at the
public library in Bodø.  This afternoon the participants were working fairly
idependent, so I had some time to sit down some more with
[p5.js](https://p5js.org).

`p5.js` is a great Javascript library for creating visual content in the web
browser, e.g. animations, games, art etc. In short a `p5.js` program consists of
two main parts:
a `setup` function which runs when the sketch starts up, and `draw` function
which runs over and over again forever.

```js

function setup(){

}

function draw(){

}

```


You write ordinary Javascript, and
the big strength is that you don't have to worry about how to manipulate pixels
on the sceren, you simply write `ellipse(x, y, r);` to draw an ellipse, or
`rect(x, y, h, w);` to draw a rectangle.

For example the sketch

```js
function setup(){
	createCanvas(500, 500);
}

function draw() {
	ellipse(mouseX, mouseY, 20);
}
```

produces the following output

![screenshot2](/images/screenshot2.png).

Notice that we get mouse input for free as well!

In addition to `p5js`, there are [many great `p5.js`
libraries](https://p5js.org/libraries/), for example libraries for detecting
collisions between objects, libraries for playing sound, connecting to bluetooth
etc.

There is even an online editor at [editor.p5js.org](https://editor.p5js.org/) if
you want to try it out.

In the short session this afternoon, I was able to write a simple implementation
of the traditional Pong game. Below is a small scerenshot of the game, and
you'll find [code in my github](https://github.com/fjukstad/p5js-pong).

![screenshot](/images/screenshot.png)

Maybe I'll do a [Twitch stream](https://twitch.com/bjornfjukstad) next week for
the Coding Club, and go through the solution in details, as well as how a
website actually work.



