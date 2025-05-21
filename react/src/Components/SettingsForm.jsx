import { useState, useContext } from 'react';
import { ColorPicker } from 'primereact/colorpicker';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import { DesignContext } from '../DesignProvider';

const SettingsForm = () => {
  const { setSettings } = useContext(DesignContext);

  const [color, setColor] = useState('#6466f1');
  const [selectedFont, setSelectedFont] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

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

      console.log('תמונה הועלתה בהצלחה:', response.data);
      setSelectedImage(response.data.imageUrl);
    } catch (err) {
      console.error('שגיאה בהעלאה:', err);
    } finally {
      setUploading(false);
    }
  };

  // פונקציה לטיפול בהעלאת קובץ מהמחשב (לשרת)
  const handleFileUpload2 = async (event) => {
    const file = event.files[0];
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
      console.log('upload response:', response.data);
      // נניח שהשרת מחזיר url של התמונה שהועלתה
      setSelectedImage(response.data.imageUrl);
      setUploading(false);
    } catch (error) {
      console.error('שגיאה בהעלאת התמונה', error);
      setUploading(false);
    }
  };

  // שמירת ההגדרות ושינוי התצוגה מידית
  const handleSubmit = async () => {
    const themeColor = color.startsWith('#') ? color : `#${color}`;
    const fontFamily = selectedFont?.name ? `'${selectedFont.name}', sans-serif` : "'Heebo', 'Arial', sans-serif";
    const background = selectedImage ? `url(${selectedImage})` : "url('/img/3.jpg')";

    const registrationData = {
      themeColor: themeColor,
      font: fontFamily,
      background,
    };

    try {
      const response = await axios.post('http://localhost:8080/settings', registrationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('ההגדרות נשמרו בהצלחה', response.data);
      setSettings(registrationData);
    } catch (err) {
      console.error('ההגדרות לא נשמרו', err);
    }
  };

  return (
    <div className="settings-form">
      <div className="color-picker-section">
        <label htmlFor="cp-hex" className="font-bold block mb-2">בחר צבע:</label>
        <ColorPicker inputId="cp-hex" format="hex" value={color} onChange={(e) => setColor(e.value)} className="mb-3" />
        <span>{color}</span>
      </div>

      <div className="font-dropdown-section mt-4">
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

      <div className="background-selection mt-4">
        <h3 className="mb-3">בחר רקע:</h3>
        <div className="flex gap-3 mb-4">
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
              style={{ width: '150px' }}
            >
              <Image src={img.url} alt={img.name} width="150" />
            </div>
          ))}
        </div>

        <FileUpload
          name="image"
          accept="image/*"
          maxFileSize={7 * 1024 * 1024} // 7MB
          customUpload
          uploadHandler={handleFileUpload}
          chooseLabel="בחר קובץ"
          uploadLabel="העלה"
          cancelLabel="בטל"
        />

        {selectedImage && (
          <div className="mt-4">
            <h4>תמונה נבחרה:</h4>
            <Image src={selectedImage} alt="תמונה נבחרת" width="250" preview />
          </div>
        )}
      </div>

      <Button
        label="שמור הגדרות"
        icon="pi pi-save"
        className="w-full mt-6"
        onClick={handleSubmit}
        disabled={uploading}
      />
    </div>
  );
};

export default SettingsForm;
