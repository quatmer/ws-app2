import React, { useState, useEffect } from 'react'
import { IonLabel, IonInput, IonItem, IonContent, IonSelect, IonSelectOption, IonList, IonListHeader, IonButton, IonCol } from '@ionic/react'
import { IProduct } from '@shared/models/product'
import { IProductDTO } from 'src/api/dto/product.dto'
import { useTypeSelector } from 'src/redux/helper/selector.helper'
import { IProductBrand } from '@shared/models/product-brand'
import { useServices } from 'src/api/context/ServiceContext'

type State = {
  product: IProductDTO
}

const NewProduct = () => {
  const [state, setState] = useState<State>({ product: { name: '', description: '', unit: '', price: 0, categories: [], brand: '' } })
  const { brands } = useTypeSelector(x => x.brandState)
  const { brandService } = useServices();


  useEffect(() => {
    if (brands.length == 0) {
      brandService.getList()
    }

  }, [])

  return (

    <form>

      <IonList>


        <IonItem>
          <IonLabel position='floating'>              Name        </IonLabel>
          <IonInput />
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>
            Description
        </IonLabel>
          <IonInput />
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>
            Unit
        </IonLabel>
          <IonInput />
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>
            Price
        </IonLabel>
          <IonInput />
        </IonItem>



        <IonItem>
          <IonLabel position='floating'>
            Brand
        </IonLabel>

          <IonSelect value={state.product.brand} placeholder="Select One" onIonChange={e => console.log(e.detail.value)}>
            {
              brands.map(item =>
                <IonSelectOption key={item._id} value={item._id}>{item.name}</IonSelectOption>
              )}
          </IonSelect>

        </IonItem>
        <IonCol size="12" class="content-center">
          <IonButton class='full-width'>SAVE</IonButton>
        </IonCol>
      </IonList>
    </form>

  )
}

export default NewProduct
