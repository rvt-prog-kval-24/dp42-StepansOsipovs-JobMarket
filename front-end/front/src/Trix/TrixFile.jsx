import React, {useEffect, useRef, useState} from 'react';
import { Editor } from "@tinymce/tinymce-react";
import 'tinymce/tinymce';
import 'tinymce/icons/default/icons';
import 'tinymce/themes/silver/theme';
import 'tinymce/models/dom/model';
import 'tinymce/skins/ui/oxide/skin.css';
import 'tinymce/plugins/lists/plugin';

const TrixFile = () => {
    const [value, setValue] = useState('');
    useEffect(() => {

        console.log(value)
    }, [value]);
    const handleGetContent = () => {
       console.log(value);
    };

    return (
        <div>
            <Editor
                value={value}
                onEditorChange={(newValue, editor) => setValue(newValue)}
                init={{
                    height: 500,
                    menubar: false,
                    branding: false,
                    plugins: 'lists',
                    toolbar: [
                        { name: 'history', items: ['undo', 'redo','bold', 'italic', 'underline'] },
                        { name: 'alignment', items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify','outdent', 'indent'] },
                        { name: 'lists', items: ['bullist', 'numlist'] },
                    ],

                }}
            />
            {/*<button onClick={handleGetContent}>Получить содержимое редактора</button>*/}
        </div>
    );
};

export default TrixFile;
