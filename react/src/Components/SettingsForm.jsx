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
import axios from 'axios';
import { DesignContext } from '../DesignProvider';

const SettingsForm = () => {
  const { setSettings } = useContext(DesignContext);

  const [color, setColor] = useState('#6466f1');
  const [selectedFont, setSelectedFont] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleFileUpload = async ({ files }) => {
    const file = files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedImage(response.data.imageUrl);
      toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'תמונה הועלתה בהצלחה', life: 3000 });
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'העלאת תמונה נכשלה', life: 3000 });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    const themeColor = color.startsWith('#') ? color : `#${color}`;
    const fontFamily = selectedFont?.name ? `'${selectedFont.name}', sans-serif` : "'Heebo', 'Arial', sans-serif";
    const background = selectedImage ? `url(${selectedImage})` : "url('/img/3.jpg')";

    const registrationData = {
      themeColor,
      font: fontFamily,
      background,
    };

    try {
      const response = await axios.post('http://localhost:8080/settings', registrationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSettings(registrationData);
      toast.current.show({ severity: 'success', summary: 'נשמר', detail: 'ההגדרות נשמרו בהצלחה', life: 3000 });
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'שגיאה בשמירת ההגדרות', life: 3000 });
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
                onClick={() => setSelectedImage(img.url)}
                className={classNames(
                  'cursor-pointer border-2 rounded-md overflow-hidden transition-all',
                  {
                    'border-blue-500': selectedImage === img.url,
                    'border-gray-300': selectedImage !== img.url,
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
            uploadHandler={handleFileUpload}
            chooseLabel="בחר קובץ"
            uploadLabel="העלה"
            cancelLabel="בטל"
          />
        </div>

        {selectedImage && (
          <div className="mt-3">
            <h4 className="mb-2">תמונה נבחרת:</h4>
            <Image src={selectedImage} alt="תמונה נבחרת" width="250" preview />
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
