interact('.resize-drag')
  .draggable({
    inertia : false,
    // call this function before dragmove event
    onstart : dragStartListener,
    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: dragEndListener
  })
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    preserveAspectRatio: true,
    onmove : resizeListener,
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);
    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  })
  .dropzone({
    // only accept elements matching this CSS selector
    accept: '.putin',
    // Require a 75% element overlap for a drop to be possible
    // Remember to make the shape be same, if not, it will not trigger since need 30% of element
    overlap: 0.02,

    // listen for drop related events:
    ondropactivate: dropActiveListener,
    ondragenter: dropEnterListener,
    ondragleave: dropLeaveListener,
    ondrop: dropListener,
    ondropdeactivate: dropDeactiveListener,
  });

  //// Resize Event Listener start here ///////////////////////////
  function resizeListener (event){
  	var target = event.target;
  	target.getElementsByClassName('size')[0].innerHTML = Math.round(event.rect.width) + ' x ' + Math.round(event.rect.height);
  }
  ////////////////////////////////////////////////////////
  ////// Drag Event Listener start here ///////////////////////////
  ////////////////////////////////////////////////////////
  function dragStartListener (event) {
  }

  function dragMoveListener (event) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    var width = parseFloat(target.style.width);
    var height = parseFloat(target.style.height);

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    target.getElementsByClassName('pos')[0].style.display = "inline-block";
    target.getElementsByClassName('pos')[0].innerHTML = Math.round(x * 100)/100 +"," + Math.round(y * 100)/100;
  }

  function dragEndListener (event){
  	var target = event.target;
  	target.getElementsByClassName('pos')[0].style.display = "none";  
    // checkIntersect(target);

    // x = 50;
    // y = 100;
    // target.style.transition = "all 0.4s ease-in";

    // target.style.webkitTransform =
    // target.style.transform =
    //   'translate(' + x + 'px, ' + y + 'px)';

    // target.setAttribute('data-x', x);
    // target.setAttribute('data-y', y);
    // target.getElementsByClassName('pos')[0].style.display = "inline-block";
    // target.getElementsByClassName('pos')[0].innerHTML = Math.round(x * 100)/100 +"," + Math.round(y * 100)/100;
    // setTimeout(function() { target.style.transition = ""; }, 400);
  }
  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;
  ////////////////////////////////////////////////////////
  ////// Drop Event Listener /////////////////////////////////
  ////////////////////////////////////////////////////////

  function dropActiveListener (event){
  }
  function dropEnterListener (event){
  }
  function dropLeaveListener (event){
  }
  function dropListener (event){
    var dragElement = event.relatedTarget,
      dropElement = event.target;

    var dropx = dropElement.getAttribute('data-x');
    var dropy = dropElement.getAttribute('data-y');

    dragElement.style.transition = "all 0.2s ease-in";

    dragElement.style.webkitTransform =
    dragElement.style.transform =
      'translate(' + dropx + 'px, ' + dropy + 'px)';

    dragElement.setAttribute('data-x', dropx);
    dragElement.setAttribute('data-y', dropy);
    dragElement.getElementsByClassName('pos')[0].style.display = "inline-block";
    dragElement.getElementsByClassName('pos')[0].innerHTML = Math.round(dropx * 100)/100 +"," + Math.round(dropy * 100)/100;
    setTimeout(function() { dragElement.style.transition = ""; }, 400);
  }
  function dropDeactiveListener (event){
  }

  ////////////////////////////////////////////////////////
  /////// Self-Define Function ///////////////////////////
  ////////////////////////////////////////////////////////
  // Return the distance between 2 point
  function distancePoint (x1,y1,x2,y2){
    var tempx = (x1-x2);
    var tempy = (y1-y2);
    return Math.sqrt((tempx * tempx) + (tempy * tempy));
  }

  // Return the center of a circle in array 
  // x and y is the position of the left-most point
  function getCircleCenter (x,y,width,height){
    var centerx = x + (width / 2);
    var centery = (y + height) / 2;
    return [centerx,centery];
  }