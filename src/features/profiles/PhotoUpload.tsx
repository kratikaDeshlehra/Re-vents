import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageTransfrom from 'filepond-plugin-image-transform'
import { useState } from 'react';

registerPlugin(FilePondPluginImageCrop, FilePondPluginImagePreview, FilePondPluginImageTransfrom)
export default function PhotoUpload() {
  const [files, setFiles] = useState<any>([]);
  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={false}
      maxFiles={1}
      server="/api"
      name="files"
      credits={false}
      allowImageCrop={true}
      imageCropAspectRatio='1:1'
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    />
  )
}

