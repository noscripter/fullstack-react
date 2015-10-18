var React = require('react'),
    ReactDOM = require('react-dom'),
    model = require('./model.js'),
    NamesList = require('./names-list.jsx');

class NameItem extends React.Component {
    constructor() {
        super()
        this.state = {editing: false}
    }

    handleSubmit(event) {
        event.preventDefault()
        var input = this.refs.input
        model.
            call(['names', 'edit'], [this.props.idx, input.value]).
            then(() => {
                this.setState({ editing: false})
                this.props.update()
            })
    }

    componentDidMount() {
      this.refs.name.style.width = 0
    }

    componentDidUpdate() {
      if(this.state.editing) {
        ReactDOM.findDOMNode(this.refs.input).focus()

        //Ensure focus moves to end of input's value
        this.refs.input.value = this.refs.input.value

        this.refs.input.style.width = (this.refs.input.value.length+3)*8+'px'
      }
    }

    render() {
      return (
        <li>
          {this.state.editing
            ?
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" ref="input" defaultValue={this.props.name} />
                <button>save</button>
              </form>
            :
              <div  ref="name" onClick={this.handleClick.bind(this)}>
                {this.props.name}
              </div>}
        </li>
      )
    }

    handleClick() {
        this.setState({ editing: true})
    }
}

module.exports = NameItem
