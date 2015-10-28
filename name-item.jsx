var React = require('react'),
    model = require('./model.js'),
    NamesList = require('./names-list.jsx');

class NameItem extends React.Component {
    constructor() {
        super()
        this.state = {editing: false}
    }

    componentDidUpdate() {
        if(this.state.editing) {
            this.refs.input.focus()

            //Move focus caret to end of input's value
            this.refs.input.value = this.refs.input.value
        }
    }

    render() {
        var content
        if (this.state.editing) {
            content = (
              <form onSubmit={this.handleSaveSubmit.bind(this)}>
                  <input type="text" ref="input" defaultValue={this.props.name} />
                  <button>save</button>
              </form>
            )
        } else {
            content = (
              <div>
                  <span>{this.props.name}   </span>
                  <button onClick={this.handleEditClick.bind(this)}>edit</button>
                  <button onClick={this.handleUpClick.bind(this)}>up</button>
                  <button onClick={this.handleDownClick.bind(this)}>down</button>
              </div>
            )
        }
        return (
            <li>
              {content}
            </li>
        )
    }

    handleEditClick() {
        this.setState({editing: true})
    }

    handleUpClick() {
        event.preventDefault()
        var idx = this.props.idx;

         model.
            call(['names', 'up'],
                idx).
            then(() => {
                this.props.update()
            })
    }

    handleDownClick() {
        event.preventDefault()
        var idx = this.props.idx;

         model.
            call(['names', 'down'],
                idx).
            then(() => {
                this.props.update()
            })
    }

    handleSaveSubmit(event) {
        event.preventDefault()
        var input = this.refs.input,
            idx = this.props.idx;
        model.setValue(['names',idx, 'name'], input.value)
            .then(() => {
                this.setState({editing: false})
                this.props.update()
            })
    }
}

module.exports = NameItem