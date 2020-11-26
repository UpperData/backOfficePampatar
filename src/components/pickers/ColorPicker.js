import React from 'react'
import { ChromePicker } from 'react-color'

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
      <div>
        <button className="btn btn-success" type="button" onClick={ this.handleClick }>
            Seleccionar color
        </button>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
          <ChromePicker color={this.props.value} onChange={(color)  => this.props.onChange(color.hex)} />
        </div> : null }
      </div>
    )
  }
}

export default ColorPicker