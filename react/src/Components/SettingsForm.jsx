import { useState, useContext, useRef } from 'react';
import { ColorPicker } from 'primereact/colorpicker';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { DesignContext } from '../DesignProvider';
import { uploadImage, saveSettings } from '../Services/settingsService';

const SettingsForm = () => {
  const { setSettings } = useContext(DesignContext);

  const [color, setColor] = useState('#6466f1');
  const [selectedFont, setSelectedFont] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // URL to save
  const [previewUrl, setPreviewUrl] = useState(null); // URL to preview
  const [selectedFile, setSelectedFile] = useState(null); // file to upload
  const [uploading, setUploading] = useState(false);
  const toast = useRef(null);

  const token = localStorage.getItem('token');

  const fonts = [
    { name: 'Heebo', code: 'HE' },
    { name: 'Arial', code: 'AR' },
    { name: 'Rubik', code: 'RU' },
    { name: 'Open Sans', code: 'OS' },
  ];

  const predefinedImages = [
    { name: 'תמונה 1', url: '/img/1.png' },
    { name: 'תמונה 2', url: '/img/2.jpg' },
    { name: 'תמונה 3', url: '/img/3.jpg' },
    { name: 'תמונה 4', url: '/img/4.jpg' },
  ];

  const handleSelectFile = ({ files }) => {
    const file = files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    setUploading(true);

    try {
      let imageUrl = selectedImage;

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile, token);
        setSelectedImage(imageUrl);
      }

      const themeColor = color.startsWith('#') ? color : `#${color}`;
      const fontFamily = selectedFont?.name ? `'${selectedFont.name}', sans-serif` : "'Heebo', 'Arial', sans-serif";
      const background = imageUrl ? `url(${imageUrl})` : "url('/img/3.jpg')";

      const registrationData = {
        themeColor,
        font: fontFamily,
        background,
      };

      await saveSettings(registrationData, token);
      setSettings(registrationData);
      toast.current.show({ severity: 'success', summary: 'נשמר', detail: 'ההגדרות נשמרו בהצלחה', life: 3000 });
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'שגיאה בשמירת ההגדרות', life: 3000 });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <Toast ref={toast} position="top-center" />
      <Card title="הגדרות עיצוב" className="shadow-3 border-round-lg p-4">
        <div className="mb-5">
          <label htmlFor="cp-hex" className="font-bold block mb-2">בחר צבע ראשי:</label>
          <ColorPicker inputId="cp-hex" format="hex" value={color} onChange={(e) => setColor(e.value)} className="mb-2" />
          <div className="mt-1 text-sm text-gray-600">צבע נבחר: <span style={{ direction: 'ltr' }}>{color}</span></div>
        </div>

        <Divider />

        <div className="mb-5">
          <label className="font-bold block mb-2">בחר פונט:</label>
          <Dropdown
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.value)}
            options={fonts}
            optionLabel="name"
            placeholder="בחר פונט"
            className="w-full md:w-14rem"
          />
        </div>

        <Divider />

        <div className="mb-5">
          <label className="font-bold block mb-3">בחר רקע:</label>
          <div className="flex flex-wrap gap-3 mb-3">
            {predefinedImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedImage(img.url);
                  setPreviewUrl(img.url);
                  setSelectedFile(null); // reset file
                }}
                className={classNames(
                  'cursor-pointer border-2 rounded-md overflow-hidden transition-all',
                  {
                    'border-blue-500': previewUrl === img.url,
                    'border-gray-300': previewUrl !== img.url,
                  }
                )}
                style={{ width: '120px' }}
              >
                <Image src={img.url} alt={img.name} width="120" />
              </div>
            ))}
          </div>

          <FileUpload
            name="image"
            accept="image/*"
            maxFileSize={7 * 1024 * 1024}
            customUpload
            uploadHandler={handleSelectFile}
            chooseLabel="בחר קובץ"
            uploadLabel="העלה"
            cancelLabel="בטל"
          />
        </div>

        {previewUrl && (
          <div className="mt-3">
            <h4 className="mb-2">תמונה נבחרת:</h4>
            <Image src={previewUrl} alt="תמונה נבחרת" width="250" preview />
          </div>
        )}

        <Button
          label="שמור הגדרות"
          icon="pi pi-save"
          className="w-full mt-5"
          onClick={handleSubmit}
          disabled={uploading}
        />
      </Card>
    </div>
  );
};

export default SettingsForm;