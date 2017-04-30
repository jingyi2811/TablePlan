import React from 'react';
import ReactDOM from 'react-dom';

class GrabBox extends React.Component {
	render() {

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
  			<div data-x = "0" data-y = "0" className={"resize-drag " + (this.props.putin === "true" ? 'putin' : '')} style = {styles.Shape}>
  				<div className='size'></div>
  				<div className='pos'></div>
  			</div>
  		</div>);
	}
}

GrabBox.propTypes = {
    // Type of shape
    putin : React.PropTypes.string,

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
  bgcolor : "#2299EE",
  shape : "circle",
  radius : "100",
  bradius : "15%",
  size : "200px",
  width : "80px",
  height : "200px",
}

ReactDOM.render(
<GrabBox bgcolor = "#2299EE" shape = "circle" radius = "50" />,
document.getElementById('layout'));
ReactDOM.render(
<GrabBox bgcolor = "#CC0000" shape = "circle" radius = "50" putin = "true"/>,
document.getElementById('layout2'));
ReactDOM.render(
<GrabBox bgcolor = "#CC99E0" shape = "circle" radius = "50" putin = "true"/>,
document.getElementById('layout3'));
ReactDOM.render(
<GrabBox bgcolor = "#FF880C" shape = "circle" radius = "50" putin = "true"/>,
document.getElementById('layout4'));