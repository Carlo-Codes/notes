import { useState } from "react"

type props = {
    initialContent?:string
}

export default function NoteEditor(props:props){
    const [content, setContent] = useState<string|undefined>(props.initialContent);

    return(
        <div className="editorContainer">
            <form>
                
            </form>
        </div>
    )

}