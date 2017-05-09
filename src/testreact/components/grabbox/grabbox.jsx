import React from 'react';
import ReactDOM from 'react-dom';

var layoutCount = 0;
var tableCount = 0;
class GrabBox extends React.Component 
{
	render()
	{
		if(this.props.generator == "true")
		{
			// do not add the tablecount here
		}
		else
		{
			layoutCount = layoutCount +1;
		}

		var styles = 
		{
			Shape : 
			{
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

				opacity : this.props.opacity,
				zIndex : this.props.z,
			},
		}
		return (
			<div className="resize-container">
				{/* Here put data-x and data-y is because there will automatically have x and y attribute before drag it */}
				<div data-x = "0" data-y = "0"
					className=
					{
						"resize-drag" + 
						(this.props.generator === "true" ? ' generator' : '') + 
						(this.props.draggable === "true" ? ' draggable' : '') + 
						(this.props.resizable === "true" ? ' resizeon' : '') + 
						(this.props.table === "true" ? ' table' : '') +
						(this.props.receive === "true" ? ' receive' : '') + 
						(this.props.putin === "true" ? ' putin' : '')
					} 
					style = {styles.Shape}>
					<div className='size'></div>
					<div className='pos'></div>
				</div>
			</div>
		);
	}
	componentDidMount()
	{
		// When the component that we going to create is a table, create dropzone around it
		// For Circle table only
		if(this.props.table == "true")
		{	
			// Create element
			// Append it
			// Move to correct position
			for (var i = 1; i <= 4; i++) 
			{
				// Create Element and append it
				var element = document.createElement("div");
				// Use dynamic generate the id name
				var idName = 'layout' + layoutCount;// this is just use layoutCount without - 1 
				element.id = idName;
				var table = document.getElementById(getTableId());
				table.append(element);

				// render it
				ReactDOM.render(
				<GrabBox bgcolor = "black" shape = "circle" radius = "30" draggable = "false" opacity = "0.2" z="-999" receive = "true" />,
				element
				);

				// Calculate element x and y and move it to correct position
				// Equation : CreatedX = x + sin(degree / numOfElement * index) * distance
				var createdElement = element.getElementsByClassName('resize-container')[0].getElementsByClassName('resize-drag')[0];
				var tableRadius =  parseInt(this.props.radius);
				var createdElementRadius = parseInt(createdElement.style.height) / 2;
				var distance =  tableRadius + createdElementRadius + 25; // 25 is to increase the distance
				var degree = (360 / 4) * i;
				var radian = degreeToRadian(degree);
				// sin and cos function accept radian
				var addx = Math.sin(radian) * distance;
				var addy = Math.cos(radian) * distance;

				// move it to correct position
				var tableElement = table.getElementsByClassName('resize-container')[0].getElementsByClassName('resize-drag')[0];
				var x = parseInt(tableElement.getAttribute("data-x"));
				var y = parseInt(tableElement.getAttribute("data-y"));
				moveToLocation(createdElement,x + addx,y + addy);
			}
		}
	}
}

GrabBox.propTypes = 
{
	// Type of shape
	resizable : React.PropTypes.string,
	undraggable : React.PropTypes.string,
	table : React.PropTypes.string,
	putin : React.PropTypes.string,
	receive : React.PropTypes.string,
	generator : React.PropTypes.string,

	// Common Props
	bgcolor : React.PropTypes.string.isRequired,
	shape : React.PropTypes.string.isRequired,
	opacity : React.PropTypes.string,

	// Circle Props
	radius : React.PropTypes.string,

	// Square and Rectangular Props
	bradius : React.PropTypes.string,

	// Square Props
	size : React.PropTypes.string,

	// Rectangular Props
	width : React.PropTypes.string,
	height : React.PropTypes.string,

	z :React.PropTypes.string,

}

GrabBox.defaultProps = 
{
	putit : "false",
	table : "false",
	receive : "false",
	draggable : "true",
	resizable : "false",
	generator : "false",
	bgcolor : "#2299EE",
	shape : "circle",
	opacity : "1",
	radius : "100",
	bradius : "15%",
	size : "20px",
	width : "80px",
	height : "200px",
	z : "1"
}

ReactDOM.render(
<GrabBox bgcolor = "#2299EE" shape = "circle" radius = "40" generator = "true"/>,
document.getElementById('generator'));

ReactDOM.render(
<GrabBox bgcolor = "#CC9910"  putin = "true"  shape = "circle" radius = "30"/>,
document.getElementById("guest1"));


interact('.resize-drag')
.draggable(
{
	inertia : false,
	// call this function before dragmove event
	onstart : dragStartListener,
	// call this function on every dragmove event
	onmove: dragMoveListener,
	// call this function on every dragend event
	onend: dragEndListener
})
.resizable(
{
	edges: { left: true, right: true, bottom: true, top: true },
	preserveAspectRatio: true,
})
////////////////////////////////////////////////////////
//// Resize Event Listener start here //////////////////
////////////////////////////////////////////////////////
.on('resizemove', function (event) {
	target = event.target;
	if(target.classList.contains('resizeon'))
	{
		var target = event.target,
		x = (parseFloat(target.getAttribute('data-x')) || 0),
		y = (parseFloat(target.getAttribute('data-y')) || 0);
		// update the element's style
		target.style.width = event.rect.width + 'px';
		target.style.height = event.rect.height + 'px';

		// translate when resizing from top or left edges
		x += event.deltaRect.left;
		y += event.deltaRect.top;

		moveToLocation(target,x,y);
	}
})
.dropzone(
{
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
////////////////////////////////////////////////////////
////// Drag Event Listener start here ///////////////////////////
////////////////////////////////////////////////////////
function dragStartListener (event) 
{
	// When drag start, if it is a generator, insert the html tag and insert x,y properties based on generator x,y
	var target = event.target;
	// If it is a generator
	if(target.classList.contains('generator'))
	{	
		// Create Element and append it
		var element = document.createElement("div");
		// Use dynamic generate the id name
		
		var idName = "table" + tableCount; // this is just use tablecount without - 1 
		element.id = idName;
		target.parentElement.parentElement.append(element);

		// Get same colour with generator
		var backcolor = target.style.backgroundColor;
		// render it
		tableCount = tableCount +1;
		ReactDOM.render(
		<GrabBox bgcolor = {backcolor} table = "true" shape = "circle" radius = "40" />,
		document.getElementById(idName)
		);

		// Now make it to the parents x y
		// Get parents x y
		var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
		var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		// Get the element that we just created
		var layoutElement = document.getElementById(idName);
		var createdElement = layoutElement.getElementsByClassName('resize-container')[0].getElementsByClassName('resize-drag')[0];

		moveToLocation(createdElement,x,y)
		// Make drag opacity effect
		createdElement.style.opacity = "0.9";
		createdElement.getElementsByClassName('pos')[0].style.display = "inline-block";
		createdElement.getElementsByClassName('pos')[0].innerHTML = Math.round(x * 100)/100 +"," + Math.round(y * 100)/100;
	}
}

function dragMoveListener (event) 
{
	// If it is a generator, drag the element that we just create on dragStart, if not drag the current element
	var target = event.target;

	// If it is a generator
	if(target.classList.contains('generator'))
	{
		// Get the element that just created
		var layoutElement = document.getElementById(getTableId());
		target = layoutElement.children[0].children[0];

		// Start to move it
		var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
		var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		moveToLocation(target,x,y);
		target.getElementsByClassName('pos')[0].style.display = "inline-block";
		target.getElementsByClassName('pos')[0].innerHTML = Math.round(x * 100)/100 +"," + Math.round(y * 100)/100;
	}
	// If it is a normal element
	else if(target.classList.contains('draggable'))
	{
		// keep the dragged position in the data-x/data-y attributes
		var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
		var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		moveToLocation(target,x,y);
		target.getElementsByClassName('pos')[0].style.display = "inline-block";
		target.getElementsByClassName('pos')[0].innerHTML = Math.round(x * 100)/100 +"," + Math.round(y * 100)/100;
	}
	
	// If it is table, move it's layout together
	if(target.classList.contains('table'))
	{
		var child = target.parentElement.parentElement.children;
		for (var i = 1; i < child.length; i++) {
			var obj = child[i].getElementsByClassName('resize-container')[0].getElementsByClassName('resize-drag')[0];
			var x = (parseFloat(obj.getAttribute('data-x')) || 0) + event.dx;
			var y = (parseFloat(obj.getAttribute('data-y')) || 0) + event.dy;

			moveToLocation(obj,x,y);
		}
	}
}

function dragEndListener (event)
{
	// If it is a generator then remove the pos of the created element, if not remove the current position
	var target = event.target;
	if(target.classList.contains('generator'))
	{
		var layoutElement = document.getElementById(getTableId());
		layoutElement.getElementsByClassName('pos')[0].style.display = "none";
		layoutElement.getElementsByClassName('resize-drag')[0].style.opacity = "1";
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
function dropListener (event)
{
	var dragElement = event.relatedTarget;
	var dropElement = event.target;
	if(dropElement.classList.contains('receive'))
	{
		var dropx = dropElement.getAttribute('data-x');
		var dropy = dropElement.getAttribute('data-y');
	
		dragElement.style.transition = "all 0.2s ease-in";
		moveToLocation(dragElement,dropx,dropy);
		console.log(dropx);
		console.log(dropy);

		dragElement.getElementsByClassName('pos')[0].style.display = "inline-block";
		dragElement.getElementsByClassName('pos')[0].innerHTML = Math.round(dropx * 100)/100 +"," + Math.round(dropy * 100)/100;
		setTimeout(function() { dragElement.style.transition = ""; }, 400);
	}
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
function getCircleCenter (x,y,width,height)
{
	var centerx = x + (width / 2);
	var centery = (y + height) / 2;
	return [centerx,centery];
}
function getTableId()
{
	return 'table' + (tableCount - 1);//this one is idName -1 because,usually we get the tablecount only we +1 (render)
}
function getLayoutId()
{
	return 'layout' + (layoutCount - 1);//this one is idName -1 
}
function moveToLocation(obj,x,y)
{ 
	obj.style.webkitTransform =
	obj.style.transform =
		'translate(' + x + 'px, ' + y + 'px)';

	obj.setAttribute('data-x', x);
	obj.setAttribute('data-y', y);
}
function radianToDegree(degree)
{
	return (degree * 180 / Math.PI);
}
function degreeToRadian(radian)
{
	return (radian * Math.PI / 180);
}
function isLayout(value)
{
	return (value.includes('layout'));
}