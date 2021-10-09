import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Notes from "./Notes";
import moment from "moment";
import swal from "sweetalert";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.addNote = this.addNote.bind(this);
    this.deleteNotes = this.deleteNotes.bind(this);
  }
  addNote(e) {
    e.preventDefault();
    if (this._inputNote.value !== "") {
      let newNote = {
        key: uuidv4(),
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
        title: this._inputTitle.value,
        note: this._inputNote.value,
      };
      this.setState((prevState) => {
        return {
          notes: prevState.notes.concat(newNote),
 
        };
      });
    } else {
      swal("Error!", "Please, Write a Note Before to Send!", "error");
    }

    this._inputNote.value = "";
    this._inputTitle.value = "";

    console.log(this.state.notes);
  }
  deleteNotes(key) {
    console.log(key);
    const deleteById = this.state.notes.filter((element) => {
      return element.key !== key;
    });
    this.setState({
      notes: deleteById,
    });
  }
  render() {
    return (
      <div className="formContainer">
        <div className="header">
          <form onSubmit={this.addNote}>
            <input
              type="text"
              placeholder="Enter Tile"
              ref={(a) => (this._inputTitle = a)}
            />
            <textarea
              cols="30"
              rows="10"
              ref={(a) => (this._inputNote = a)}
              placeholder="Enter Note"
            ></textarea>
            <button type="submit">Send</button>
          </form>

          <Notes   notes={this.state.notes} deleteNotes={this.deleteNotes} />
        </div>
      </div>
    );
  }
}

export default Form;
