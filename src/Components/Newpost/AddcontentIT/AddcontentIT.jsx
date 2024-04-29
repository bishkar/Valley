import "../Addcontent/Addcontent.css";

import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import { createReactEditorJS } from "react-editor-js";
import { useEffect } from "react";
import { useState } from "react";

const EDITOR_JS_TOOLS = {
  header: Header,
};

const AddContentIT = ({ setPostData, blocks }) => {
  let [editorit, setEditor] = useState(null);

  useEffect(() => {
    if (!editorit) {
      editorit = new EditorJS({
        holder: "editorjss",
        tools: {
          header: {
            class: Header,
            inlineToolbar: ["link"],
            config: {
              placeholder: "Enter a header",
              levels: [2, 3, 4],
              defaultLevel: 3,
            },
          },
          embed: {
            class: Embed,
            inlineToolbar: true,
            config: {
              services: {
                youtube: true,
                coub: true,
              },
            },
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
                byFile: "http://127.0.0.1:8000/api/v1/articles/image/upload", // Your backend file uploader endpoint
                byUrl: "http://127.0.0.1:8000/api/v1/articles/image/upload", // Your endpoint that provides uploading by Url
              },
              additionalRequestHeaders: {Authorization: "Bearer " + localStorage.getItem("accessToken")},
            },
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
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
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
                text: "Italian content",
                level: 2,
              },
            },
            {
              type: "paragraph",
              data: {
                text: "Paste your italian content here",
              },
            },
          ],
        },
        onChange: (api, newData) => {
          editorit
            .save()
            .then((outputData) => {
              setPostData((prevData) => ({
                ...prevData,
                it_content: outputData,
              }));
            })
            .catch((error) => {
              alert("Saving failed: ", error);
            });
        },
      });
      setEditor(editorit);
    }
  }, []);

  let [rendered, setRendered] = useState(false);
  useEffect(() => {
    if (blocks && !rendered) {
      editorit.render({ blocks: blocks.blocks });
      setRendered(true);
    }
  })

  return (
    <div className="addcontent">
      <div className="addcontent-container">
        <div id="editorjss"></div>
      </div>
    </div>
  );
};

export default AddContentIT;
