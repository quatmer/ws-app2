import React, { useState, useEffect } from 'react'
import { IBrand } from '@shared/models/brand'
import TightModal from 'src/components/TightModal'
import { IonButton, IonInput, IonCol, IonList, IonItem, IonSpinner, IonIcon, IonLabel } from '@ionic/react'
import GridLayout from 'src/layouts/GridLayout'
import { useTypeSelector } from 'src/redux/helper/selector.helper'
import { useDispatch } from 'react-redux'
import { BrandActions } from 'src/redux/brand/action'
import { AppActions } from 'src/redux/app/action'

type Props = {
  brand: IBrand,
  isEditMode: boolean,
  exitEditMode: () => void;
}

const BrandEdit = (props: Props) => {
  const [name, setName] = useState(props.brand.name)
  const { loading, error, messageId } = useTypeSelector(x => x.brandState);
  const dispatch = useDispatch();

  useEffect(() => {

    if (messageId !== props.brand._id)
      return;

    // console.log('Use Effect runned')
    // console.log('Loading:' + loading)
    // console.log('Error:' + error)
    if (!loading && error === null) {
      dispatch(AppActions.showNotification('Brand', 'Brand name successfully updated', 'information'))
      props.exitEditMode()
    }
    // eslint-disable-next-line
  }, [messageId])

  const updateBrand = () => {
    const brand = { ...props.brand }
    brand.name = name;
    // console.log('Brand.name:' + brand.name)
    // console.log('Props.brand.name:' + props.brand.name)
    dispatch(BrandActions.update(brand));
  }

  return (
    <TightModal
      title="Edit Brand"
      description={`Edit brand`}
      isOpen={props.isEditMode}
      onDidDismiss={props.exitEditMode}>

      <GridLayout>
        <IonCol size="12">
          <IonList>
            <IonItem>
              <IonInput autofocus value={name} onIonChange={e => { setName(e.detail.value || ''); dispatch(BrandActions.clearError()) }} onKeyUp={e => { if (e.key === 'Enter') updateBrand(); }} />
            </IonItem>
            <IonLabel className='error-label' color='danger'>{error}</IonLabel>
          </IonList>
        </IonCol>
        <IonCol size="12" class="content-center">
          <IonButton disabled={!name || loading} onClick={updateBrand} class="full-width">
            {loading ? (
              <IonSpinner name="dots" />
            ) : (
                <>
                  Update
                  <IonIcon slot="end" />
                </>
              )}
          </IonButton>
        </IonCol>
      </GridLayout>

    </TightModal>
  )
}

export default BrandEdit
