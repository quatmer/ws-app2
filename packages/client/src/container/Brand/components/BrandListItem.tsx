import React, { useState } from 'react'
import { IBrand } from '@shared/models/brand'
import { IonItem, IonButton, IonButtons, IonIcon, IonSpinner } from '@ionic/react'
import { createOutline, trashOutline } from 'ionicons/icons'
import BrandEdit from './BrandEdit'
import { useServices } from 'src/api/context/ServiceContext'

type Props = { brand: IBrand }

const BrandListItem = (props: Props) => {
  const [isEditMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const { brandService } = useServices();

  const deleteBrand = () => {
    setLoading(true)
    brandService.delete(props.brand._id).then(() => { }).catch(() => { }).finally(() => {
      setLoading(false)
    })
  }

  const editBrand = () => {
    setEditMode(true);
  }

  const exitEditModeHandler = () => {
    setEditMode(false)
  }

  return (
    <div className='brand-list-item'>
      <BrandEdit brand={props.brand} exitEditMode={exitEditModeHandler} isEditMode={isEditMode} />
      <IonItem>
        {props.brand.name}

        {loading ? <IonSpinner slot='end' /> :
          <IonButtons slot='end'>
            <IonButton fill='clear' onClick={() => editBrand()} >
              <IonIcon slot="icon-only" icon={createOutline} />
            </IonButton>
            <IonButton fill='clear' color='danger' onClick={() => deleteBrand()}>
              <IonIcon slot="icon-only" icon={trashOutline} />
            </IonButton>
          </IonButtons>
        }
      </IonItem>
    </div>

  )
}

export default BrandListItem