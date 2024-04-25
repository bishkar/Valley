import './Addcontent.css'

import EditorJS from '@editorjs/editorjs';
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import { createReactEditorJS } from 'react-editor-js'
import { useEffect } from 'react';
import { translate } from "../../../redux/posts.slice/translate.slice";
import h from '@editorjs/simple-image';
import { useState } from 'react';

const EDITOR_JS_TOOLS = {
    header: Header,
}

const AddContent = ({setPostData, translatedBlocks}) => {
    let [editor, setEditor] = useState(null);
    
    useEffect(() => {
        if (!editor) {
            editor = new EditorJS({
                holder: "editorjs",
                tools: {
                            header: {
                                class: Header,
                                inlineToolbar: ['link'],
                                config: {
                                    placeholder: 'Enter a header',
                                    levels: [2, 3, 4],
                                    defaultLevel: 3
                                },
                            },
                            embed: {
                                class: Embed,
                                inlineToolbar: true,
                                config: {
                                    services: {
                                        youtube: true,
                                        coub: true
                                    }
                                }
                            },
                            list: {
                                class: List,
                                inlineToolbar: true,
                            },
                            warning: Warning,
                            code: Code,
                            linkTool: LinkTool,
                            image: {
                                class: Image,
                                config: {
                                    endpoints: {
                                        byFile: 'http://127.0.0.1:8000/api/v1/articles/image/upload', // Your backend file uploader endpoint
                                        byUrl: 'http://127.0.0.1:8000/api/v1/articles/image/upload', // Your endpoint that provides uploading by Url
                                    },
                                    additionalRequestHeaders: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzNTQxMTgxLCJpYXQiOjE3MTM1Mzc1ODEsImp0aSI6ImQwYWY5NmMxMmZmYzQ4NjRiOWQ5YTdlYzA2MzRmMzE5IiwidXNlcl9pZCI6MSwiaXNfYWRtaW4iOnRydWV9.nr3pX6OnUP8An1KJNhfGDV2pqWQkuUxgpoovazhi8RQ"},
                                }
                            },
                            raw: Raw,
                            paragraph: {
                                class: Paragraph,
                                inlineToolbar: true,
                            },
                            table: {
                                class: Table,
                                inlineToolbar: true,
                            },
                            quote: {
                                class: Quote,
                                inlineToolbar: true,
                                config: {
                                    quotePlaceholder: 'Enter a quote',
                                    captionPlaceholder: 'Quote\'s author',
                                },
                            },
                            marker: Marker,
                            checklist: {
                                class: CheckList,
                                inlineToolbar: true,
                            },
                            delimiter: Delimiter,
                            inlineCode: {
                                class: InlineCode,
                                inlineToolbar: true,
                            },
                            simpleImage: SimpleImage,
                        },
                        data: {
                            blocks: [
                                {
                                    type: "header",
                                    data: {
                                        text: "English Content",
                                        level: 2
                                    }
                                },
                                {
                                    type: "paragraph",
                                    data: {
                                        text: "Paste your english content here"
                                    }
                                }
                            ]},
                            onChange: (api, newData) => {
                                editor.save().then((outputData) => {
                                    setPostData((prevData) => ({
                                        ...prevData,
                                        en_content: outputData,
                                    }));
                                  }).catch((error) => {
                                    console.log('Saving failed: ', error)
                                  });
                            }
                        });
                    setEditor(editor);
                    }
        }, []);

    const pasteTranslatedBlocks = (translatedBlocks) => {
        let blocks = translatedBlocks
        console.log("editor", editor);
        console.log("translatedBlocks", translatedBlocks);
        editor.blocks.render({blocks: blocks});
        console.log("pasted");
    }

    useEffect(() => {
        if (translatedBlocks.length > 0) {
            console.log("translatedBlocks", translatedBlocks)
            pasteTranslatedBlocks(translatedBlocks);
            translatedBlocks = [];
        }
    }, [pasteTranslatedBlocks]);

    return (
        <div className="addcontent">
            <div className="addcontent-container">
                <div id="editorjs"></div>
            </div>
        </div>
    );
}

export default AddContent;