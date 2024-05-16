import { useState } from "react";
import "./home.css";

import { API, Auth } from "aws-amplify";
import { NoteType } from "../types/note";
//import config from "./../config"

export default function Home() {
   const [notes, setNotes] = useState<Array<NoteType>>([])

   const getNotes = () => {
        console.log(import.meta.env.VITE_API_URL)
        return API.get("notes", "/notes", {})
    }

    const addRandomNote = async () => {
            return API.post("notes", "/notes", {
                body:{
                    content: "blah blah blah",
                    attachment: "blah blah blah",
                }
            })
    }

    const signIn = async () => {
        try {
            await Auth.signIn("carlo.scrocca+notes@mezze.io", "Passw0rd!")
        } catch (error) {
            console.error(error);
        }
    }

    const signOut = () => {
        try {
            Auth.signOut();
            setNotes([])
        } catch (error) {
            console.error(error)
        }
    }

    const getnotesBtnHandler = async () => {
        setNotes(await getNotes())
    }

    const randomNoteHandler = async () => {
        try {
            await addRandomNote()
            
        } catch (error) {
            console.error(error)
        }
    }

    const renderNotes = () => {
        const noteDivs = [] as JSX.Element[]
        for(let i = 0; i < notes.length; i++){
            noteDivs.push(<div key={notes[i].noteId}>{notes[i].content}</div>)
        }
        return noteDivs
    }






  return (
    <div className="Home">
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
        <button onClick={signIn}>sign in</button>
        <button onClick={getnotesBtnHandler}>getNotes</button>
        <button onClick={randomNoteHandler}> add notes</button>
        <button onClick={signOut}>sign out</button>
        <div>{renderNotes()}</div>
      </div>
    </div>
  );
}