import React from 'react';
import ReactDOM from 'react-dom';

var count = 0;
class GrabBox extends React.Component {
	render() {
      count = count +1;
	    var styles = {
	      Shape : {
	        backgroundColor : this.props.bgcolor,
	        borderRadius : 
	          (this.props.shape === "circle" ? "100%" : 
	          (this.props.shape === "square" || this.props.shape === "rectangular" ? this.props.bradius : "0%")),

	        width : 
	          (this.props.shape === "circle" ? this.props.radius * 2:
	          (this.props.shape === "square" ? this.props.size:
	          (this.props.shape === "rectangular" ? this.props.width : "0" ))),

	        height : 
	          (this.props.shape === "circle" ? this.props.radius * 2:
	          (this.props.shape === "square" ? this.props.size:
	          (this.props.shape === "rectangular" ? this.props.height : "0" ))),
	      },
	    }


      return (
      <div className="resize-container">
      	{/* Here put data-x and data-y is because there will automatically have x and y attribute before drag it */}
      		<div data-x = "0" data-y = "0" 
              className={
                "resize-drag " + 
                (this.props.generator === "true" ? 'generator' : '') + 
                (this.props.putin === "true" ? 'putin' : '')} 
                style = {styles.Shape}>

      			<div className='size'></div>
      			<div className='pos'></div>
      		</div>
      	</div>);
	}
}

GrabBox.propTypes = {
    // Type of shape
    putin : React.PropTypes.string,
    generator : React.PropTypes.string,

    // Common Props
    bgcolor : React.PropTypes.string.isRequired,
    shape : React.PropTypes.string.isRequired,

    // Circle Props
    radius : React.PropTypes.string,

    // Square and Rectangular Props
    bradius : React.PropTypes.string,

    // Square Props
    size : React.PropTypes.string,

    // Rectangular Props
    width : React.PropTypes.string,
    height : React.PropTypes.string,
}

GrabBox.defaultProps = {
  putit : "false",
  generator : "false",
  bgcolor : "#2299EE",
  shape : "circle",
  radius : "100",
  bradius : "15%",
  size : "200px",
  width : "80px",
  height : "200px",
}

ReactDOM.render(
<GrabBox bgcolor = "#2299EE" shape = "circle" radius = "50" generator = "true"/>,
document.getElementById('layout0'));








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
    // When drag start, if it is a generator, insert the html tag and insert x,y properties based on generator x,y
    var target = event.target;

    // If it is a generator
    if(target.classList.contains('generator')){
      // Create Element and append it
      var element = document.createElement("div");
      // Use dynamic generate the id name
      var idName = 'layout' + count;  // this is just use count without - 1 
      element.id = idName;
      document.getElementById("wrapper").append(element);

      // render it
      ReactDOM.render(
        <GrabBox bgcolor = "#2200CE" shape = "circle" radius = "50" generator = "true"/>,
        document.getElementById(idName)
        );

      // Now make it to the parents x y
      // Get parents x y
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // Get the element that we just created
      var layoutElement = document.getElementById(idName);
      var createdElement = layoutElement.children[0].children[0];

      // translate the element
      createdElement.style.webkitTransform =
      createdElement.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      createdElement.setAttribute('data-x', x);
      createdElement.setAttribute('data-y', y);
      createdElement.getElementsByClassName('pos')[0].style.display = "inline-block";
      createdElement.getElementsByClassName('pos')[0].innerHTML = Math.round(x * 100)/100 +"," + Math.round(y * 100)/100;
    }
  }

  function dragMoveListener (event) {
    // If it is a generator, drag the element that we just create on dragStart, if not drag the current element
    var target = event.target;

    // If it is a generator
    if(target.classList.contains('generator')){
      // Get the element that just created
      var layoutElement = document.getElementById(getIdName());
      target = layoutElement.children[0].children[0];

      // Start to move it
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

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
    // If it is a normal element
    else {
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

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
  }

  function dragEndListener (event){
    // If it is a generator then remove the pos of the created element, if not remove the current position
    var target = event.target;
    if(target.classList.contains('generator'))
    {
      var layoutElement = document.getElementById(getIdName());
      // var target = layoutElement.children[0].children[0];
      layoutElement.getElementsByClassName('pos')[0].style.display = "none";  
      // target.getElementsByClassName('pos')[0].style.display = "none";  
    }
    else
    {
      target.getElementsByClassName('pos')[0].style.display = "none";  
    }


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
  function getIdName()
  {
    return 'layout' + (count - 1);  //this one is idName -1 
  }