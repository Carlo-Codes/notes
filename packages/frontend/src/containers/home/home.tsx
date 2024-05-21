import "./home.css";

import { API, Auth } from "aws-amplify";
//import config from "./../config"

export default function Home() {


    const addRandomNote = async () => {
            return API.post("notes", "/notes", {
                body:{
                    content: "blah blah blah",
                    attachment: "blah blah blah",
                }
            })
    }

    const signOut = () => {
        try {
            Auth.signOut();
        } catch (error) {
            console.error(error)
        }
    }


    const randomNoteHandler = async () => {
        try {
            await addRandomNote()
            
        } catch (error) {
            console.error(error)
        }
    }


  return (
    <div className="Home">
      <div className="lander">
        <h1>SST ReactRouter Notes</h1>
        <button onClick={randomNoteHandler}> add notes</button>
        <button onClick={signOut}>sign out</button>
      </div>
    </div>
  );
}