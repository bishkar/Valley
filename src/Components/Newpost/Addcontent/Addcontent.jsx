import './Addcontent.css'

import EditorJS from '@editorjs/editorjs';

const AddContent = () => {
    const editor = new EditorJS({ 
        holder: 'editorjs', 
    })



    return (
        <div className="editor-container">
            <div className="editor">
                <div id="editorjs"></div>
            </div>
        </div>
    );
}

export default AddContent;