document.getElementById('LOGIN').addEventListener('click', function () {
  document.querySelector('.popUp').style.display = 'flex';
  document.querySelector('.overlay').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', function () {
  document.querySelector('.popUp').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
});

document.querySelector('.popUp').addEventListener('click', function () {
  document.querySelector('.popUp').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
});
