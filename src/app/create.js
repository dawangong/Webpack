export default function create(ele = 'img', name = 'img', src) {
  const img = document.createElement(ele);
  img.src = src;
  img.className = name;
  document.body.appendChild(img);
}
