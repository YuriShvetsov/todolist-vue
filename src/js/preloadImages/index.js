import images from './images.json';

(function() {

  const imageNames = images.names;
  const path = '../../assets/images/';
  const template = document.createElement('template');

  function loadImg(path) {
    let img = new Image();

    img.src = path;
    template.append(img);
  }

  imageNames.forEach(name => loadImg(path + name));
  document.body.append(template);

}());

