import {useEffect, useState} from "react"
import { NoteType } from "../../types/note";
import {API} from 'aws-amplify'
import './notes.css'
export default function Notes(){
    const [notes, setNotes] = useState<Array<NoteType>>([])


    const getNotes = async () => {
         setNotes(await API.get("notes", "/notes", {}))
    }



    useEffect(()=>{
        getNotes()
    },[])



    const noteComponents = notes.map(item => {
        const deleteNote = async () => {
            await API.del('notes', `/notes/${item.noteId}`,{})
            getNotes();
        }

        return (
            <div className="note">
                <div>{item.createdAt}</div>
                <div>{item.content}</div>
                <button onClick={deleteNote}>delete</button>
            </div>
        )
    })


    return(
        <div className="noteArr">
            {noteComponents}
        </div>
    )
}