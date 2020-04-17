import React, { useRef, useState, useEffect } from 'react'
import { IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react'
import { IProduct } from '../../../../../shared/models/product';
import * as firebase from 'firebase/app';
import 'firebase/storage';


type Props = {
  product?: IProduct;
  onCloseForm: () => void;
};


const ProductImageAddEdit = (props: Props) => {

  const refUploadInput = useRef<HTMLInputElement | null>();
  // const [img, setImg] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    const storage = firebase.storage().ref(`/product-images/${props.product?._id}.jpg`);
    storage.getDownloadURL().then(url => setImgUrl(url))
  }, [])



  const uploadImage = (img: string) => {
    if (!!img) {
      const storage = firebase.storage().ref(`/product-images/${props.product?._id}.jpg`);
      storage
        .putString(img, 'data_url', { contentType: 'image/jpg' })
        .then(res => {
          console.log({ res });
          res.ref.getDownloadURL().then(url => setImgUrl(url));
        })
        .catch(err => console.log({ err }));
    }
  }

  const deleteImage = () => {
    const storage = firebase.storage().ref(`/product-images/${props.product?._id}.jpg`);
    storage.delete().then(value => {
      console.log('image deleted:', value)
      setImgUrl('')
    })
  }


  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });


  return (

    <IonGrid>
      <IonRow>
        <IonCol>
          <input
            ref={r => (refUploadInput.current = r)}
            type="file"
            accept="image/*"
            hidden
            onChange={event => {
              if (!!event.target.files) {
                toBase64(event.target.files[0]).then(base64 => { uploadImage(base64 as string) });
              }
            }}
          />

          <IonButton color="success" onClick={() => refUploadInput.current?.click()}>Choose Image</IonButton>
          <IonButton color="danger" onClick={deleteImage}>Delete Image</IonButton>

        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <img src={imgUrl} />
        </IonCol>
      </IonRow>
    </IonGrid>

  )
}

export default ProductImageAddEdit
