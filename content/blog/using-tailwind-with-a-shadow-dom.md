---
title: 'Using Tailwind with a Shadow DOM'
author: 'Ben Chavez'
summary: 'Shadow DOM with Tailwind'
publishedAt: '2023-08-29'
---

## Tailwind within a Shadow DOM

While building the `Ctrl-F Plus` chrome extension, I ran into

- iframe
- shadow DOM
- very specific !important css

Let's start by looking at some vanilla JavaScript.

First, open up and page on your browser. You can take the following code and run it in the DevTools console:

```js
let htmlBody = document.querySelector('body');
let shadowHost = htmlBody.appendChild(document.createElement('div'));
shadowHost.id = 'shadowHost';

let shadowRoot = shadowHost.attachShadow({ mode: 'open' });

let shadowContent = document.createElement('p');
shadowContent.textContent = 'Hello from the shadow root!';
shadowRoot.appendChild(shadowContent);
```

If you scroll to the bottom of the page, you will see that the shadow DOM has been attached to the page.

##

Next, we can go ahead and add some plain css to our shadow host div by creating a style tag and appending it to our `shadowRoot`

```js
let htmlBody = document.querySelector('body');
let shadowHost = htmlBody.appendChild(document.createElement('div'));
shadowHost.id = 'shadowHost';

// Style shadowHost to appear at the top of the page
// shadowHost.style.position = 'fixed';
// shadowHost.style.top = '0';
// shadowHost.style.left = '0';
// shadowHost.style.zIndex = '1000';

let shadowRoot = shadowHost.attachShadow({ mode: 'open' });

let shadowContent = document.createElement('p');
shadowContent.textContent = 'Hello from the shadow root!';
shadowRoot.appendChild(shadowContent);

let shadowStyle = document.createElement('style');
shadowStyle.textContent = `
  p {
    height: 500px;
    width: 500px;
    background: red;
    color: blue;
    opacity: 50%
  }`;
shadowRoot.appendChild(shadowStyle);
```

Now, just to make things a bit easier, we are going to add some additionaly stlyes to our `shadowHost`. These styles are simply to position the element so that we don't have to keep scrolling to the bottom of the page:

```js
let htmlBody = document.querySelector('body');
let shadowHost = htmlBody.appendChild(document.createElement('div'));
shadowHost.id = 'shadowHost';

// Style shadowHost to appear at the top of the page
shadowHost.style.position = 'fixed';
shadowHost.style.top = '0';
shadowHost.style.left = '0';
shadowHost.style.zIndex = '1000';

let shadowRoot = shadowHost.attachShadow({ mode: 'open' });

let shadowContent = document.createElement('p');
shadowContent.textContent = 'Hello from the shadow root!';
shadowRoot.appendChild(shadowContent);

let shadowStyle = document.createElement('style');
shadowStyle.textContent = `
  p {
    height: 500px;
    width: 500px;
    background: red;
    color: blue;
    opacity: 50%
  }`;
shadowRoot.appendChild(shadowStyle);
```


```js
let htmlBody = document.querySelector('body');

let style = document.createElement('style');
style.textContent = `
  body {
    background: blue !important;
    color: green !important;
  }`;
htmlBody.appendChild(style);

document.body.style.background = 'green !important';
document.body.style.color = 'red !important';
```


Now let's go ahead and replace our plain css with tailwind. For this example, we are just going to use the Tailwind CDN, but if you are using this within your actual project, then you can use your compiled\*\*\* tailwind css file, typically located in the `dist` folder:

```js
let htmlBody = document.querySelector('body');
let shadowHost = htmlBody.appendChild(document.createElement('div'));
shadowHost.id = 'shadowHost';

// Style shadowHost to appear at the top of the page
shadowHost.style.position = 'fixed';
shadowHost.style.top = '0';
shadowHost.style.left = '0';
shadowHost.style.zIndex = '1000';

let shadowRoot = shadowHost.attachShadow({ mode: 'open' });

let tailwindLink = document.createElement('link');
tailwindLink.rel = 'stylesheet';
tailwindLink.href =
  'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css';
shadowRoot.appendChild(tailwindLink);

let shadowContent = document.createElement('p');
shadowContent.textContent = 'Hello from the shadow root!';
shadowContent.classList.add('bg-red-500');
shadowRoot.appendChild(shadowContent);

let shadowStyle = document.createElement('style');
shadowStyle.textContent = `
  p {
    height: 500px;
    width: 500px;
    background: red;
    color: blue;
    opacity: 50%
  }`;
shadowRoot.appendChild(shadowStyle);
```

## React

Now that we've covered the basics of using a shadowDOM with vanilla JavaScript, let's look at how we can set this same functionality up using React.

For this example, I've set up a new react application using Vite, but you should be able to replicate this process using the bundler of your choice. For more speicific instructions on how to get that setup,
(Install Tailwind CSS with Vite)[https://tailwindcss.com/docs/guides/vite]
