import $ from 'jquery';
import './style.css';
import { send, initConnection } from './circle'

const $sizeEl = $('#size');
const $colorEl = $('#color');
const $containerEl = $('#container');
let idCirle = Date.now();

initConnection();

$('body').on('mousedown', `#${idCirle}`, onMouseDown);

function onMouseDown(e) {
  $('body').on('mousemove', `#${idCirle}`, onMouseMove);
  $('body').on('mouseup', `#${idCirle}`, onMouseUp);
}
function onMouseUp(e) {
  $('body').off('mousemove', `#${idCirle}`, onMouseMove);
  $('body').off('mouseup', `#${idCirle}`, onMouseUp);
}
function onMouseMove(e) {
  let left = e.pageX;
  let top = e.pageY;
  let id = $(e.target).attr('id');
  let color = $(e.target).css('background');
  let size = $(e.target).css('width');
  send({
    type: 'update',
    payload: { id: id, top, left, size, color },
  });
}

$containerEl.on('change', changeСircleParams);

function changeСircleParams(e) {
  let $circle = $(`#${idCirle}`);
  $circle.css('background', $colorEl.val());
  $circle.css('width', $sizeEl.val());
  $circle.css('height', $sizeEl.val());
}

export function onLoad({ payload }) {
  let $circle = $('<div></div>');
  $circle.addClass('circle-item');
  $circle.attr('id', payload.id);
  $circle.css('height', payload.size);
  $circle.css('width', payload.size);
  $circle.css('background', payload.color);
  $circle.css({ top: payload.top, left: payload.left });
  $('body').append($circle);
}

export function update({ payload }) {
  let $circle = $(`#${payload.id}`);
  $circle.css('left', payload.left - parseInt(payload.size) / 2);
  $circle.css('top', payload.top - parseInt(payload.size) / 2);
  $circle.css('background', payload.color);
  $circle.css('height', payload.size);
  $circle.css('width', payload.size);
}

export function getPayLoad() {
  let id = idCirle;
  let color = $('#color').val();
  let size = $('#size').val();
  let top = 200;
  let left = 200;
  return {
    id,
    top,
    left,
    size,
    color,
  };
}