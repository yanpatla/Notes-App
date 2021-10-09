import React, { Component } from "react";
import swal from "sweetalert";

class Notes extends Component {
  constructor(props) {
    super(props);

    this.createNotes = this.createNotes.bind(this);
  }
  createNotes(note) {
    return (
      <div className="note-container" key={note.key}>
        <p>{note.date}</p>
        <p>{note.note}</p>
        <p>{note.title}</p>

        <button onClick={() => this.deleteNotes(note.key)}>Delete</button>
      </div>
    );
  }
  deleteNotes(key) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Note!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.deleteNotes(key);
        swal("  Your Note has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Note is safe!");
      }
    });
  }

  render() {
    const notes = this.props.notes;
    const noteList = notes.map(this.createNotes);
    return <div className="note">{noteList}</div>;
  }
}

export default Notes;
