/* eslint-disable no-console */
'use strict';

const tweetsList = document.getElementById('lista-tweets');
const form = document.querySelector('#formulario');

function addTweet(e) {
  e.preventDefault();
  const tweet = document.getElementById('tweet').value;

  const deleteBtn = document.createElement('a');
  deleteBtn.classList = 'borrar-tweet';
  deleteBtn.innerText = 'X';

  const tweetLi = document.createElement('li');
  tweetLi.innerText = tweet;
  tweetLi.appendChild(deleteBtn);
  tweetsList.appendChild(tweetLi);

  addTweetLocalStorage(tweet);
}

function deleteTweet(e) {
  e.preventDefault();
  if (e.target.className === 'borrar-tweet') {
    e.target.parentElement.remove();
    deleteTweetLocalStorage(e.target.parentElement.innerText);
  }
}

function printLocalStorage() {
  let tweets;

  tweets = getTweetLocalStorage();

  tweets.forEach(function (tweet) {
    const deleteBtn = document.createElement('a');
    deleteBtn.classList = 'borrar-tweet';
    deleteBtn.innerText = 'X';

    const tweetLi = document.createElement('li');
    tweetLi.innerText = tweet;
    tweetLi.appendChild(deleteBtn);
    tweetsList.appendChild(tweetLi);
  });
}

function addTweetLocalStorage(tweet) {
  let tweets;
  tweets = getTweetLocalStorage();
  tweets.push(tweet);
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetLocalStorage() {
  let tweets;

  if (localStorage.getItem('tweets') === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}

function deleteTweetLocalStorage(tweet) {
  let tweets, deleteSingleTweet;
  deleteSingleTweet = tweet.substring(0, tweet.length - 1);
  tweets = getTweetLocalStorage();

  tweets.forEach(function (tweet, index) {
    if (deleteSingleTweet === tweet) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem('tweets', JSON.stringify(tweets));
}

form.addEventListener('submit', addTweet);
tweetsList.addEventListener('click', deleteTweet);
document.addEventListener('DOMContentLoaded', printLocalStorage);
