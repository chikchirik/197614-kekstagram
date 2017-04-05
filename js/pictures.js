'use strict';

var NUMBER_PHOTO = 26;
var LIKES_MAX = 200;
var LIKES_MIN = 15;
var COMMENTS_MAX = 2;
var COMMENTS_MIN = 1;

var galleryOverlay = document.querySelector('.gallery-overlay');
var uploadOverlay = document.querySelector('.upload-overlay');
var pictureTemplate = document.querySelector('#picture-template').content;
var containerPictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var photos = [];

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];

var randElement = function (maxValue, minValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
};

var randElementPhoto = function (mass) {
  return mass[Math.floor(Math.random() * mass.length)];
};

var createPhoto = function (name) {
  this.url = 'photos/' + name + '.jpg';
  this.likes = randElement(LIKES_MAX, LIKES_MIN);
  this.comments = [];
  this.commentsCount = randElement(COMMENTS_MAX, COMMENTS_MIN);

  this.addComments = function (commentsMass) {
    for (var i = 0; i < this.commentsCount; i++) {
      this.comments.push(commentsMass[Math.floor(Math.random() * (commentsMass.length - 1))]);
    }
  };

  this.addInMass = function (picturesMass) {
    picturesMass.push(this);
  };
};

var createPhotoMass = function (name, commentsMass, picturesMass) {
  var arrayElement = new createPhoto(name);
  arrayElement.addComments(commentsMass);
  arrayElement.addInMass(picturesMass);
};

var fillContent = function (container, imageSelector, commentsSelector, likesSelector, element) {
  container.querySelector(imageSelector).setAttribute('src', element.url);
  container.querySelector(commentsSelector).textContent = element.comments.length;
  container.querySelector(likesSelector).textContent = element.likes;
};

var createPost = function (element, template) {
  var post = template.cloneNode(true);

  fillContent(post, 'img', '.picture-comments', '.picture-likes', element);
  return post;
};

var createPosts = function (photosMass, template, container) {
  photosMass.forEach(function (item) {
    fragment.appendChild(createPost(item, template));
  });
  container.appendChild(fragment);
};

var createOverlay = function (element) {
  galleryOverlay.classList.remove('invisible');

  fillContent(galleryOverlay, 'img', '.comments-count', '.likes-count', element);
};

for (var i = 1; i < NUMBER_PHOTO; i++) {
  createPhotoMass(i, COMMENTS, photos);
}

uploadOverlay.classList.add('invisible');

createPosts(photos, pictureTemplate, containerPictures);
// createOverlay(photos[6]);
