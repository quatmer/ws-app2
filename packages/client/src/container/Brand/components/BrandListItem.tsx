import React, { useState } from 'react'
import { IBrand } from '@shared/models/brand'
import { IonItem, IonButton, IonButtons, IonIcon } from '@ionic/react'
import { createOutline, trashOutline } from 'ionicons/icons'
import { useDispatch } from 'react-redux'
import { BrandActions } from 'src/redux/brand/action'
import BrandEdit from './BrandEdit'

type Props = { brand: IBrand }

const BrandListItem = (props: Props) => {
  // const [loading, setLoading] = useState(false);
  const [isEditMode, setEditMode] = useState(false)
  const dispatch = useDispatch();

  const deleteBrand = () => {
    // setLoading(true)
    dispatch(BrandActions.delete(props.brand._id))
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
        {/* {loading ? <IonSpinner /> : <Fragment></Fragment>} */}
        {props.brand.name}

        <IonButtons slot='end'>
          <IonButton fill='clear' onClick={() => editBrand()} >
            <IonIcon slot="icon-only" icon={createOutline} />
          </IonButton>
          <IonButton fill='clear' color='danger' onClick={() => deleteBrand()}>
            <IonIcon slot="icon-only" icon={trashOutline} />
          </IonButton>
        </IonButtons>
      </IonItem>
    </div>

  )
}

export default BrandListItem
