import React from 'react'
import {Editor} from "@tinymce/tinymce-react"
import { Controller } from 'react-hook-form'

const RTE = ({name,label,control,defaultValue=""}) => {
  return (
    <div className='w-full'>
        {label && <label className='text-sm font-semibold text-gray-700'>{label}</label>}
        <Controller
            name={name||"content"}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange } }) => (
                <Editor
                    initialValue={value}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'rem oveformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={onChange}
                />
            )}
        />
    </div>
  )
}

export default RTE