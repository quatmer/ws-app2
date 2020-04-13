import React, { useState } from 'react'
import { IonInput, IonButton, IonLabel, IonSpinner } from '@ionic/react'
import { useServices } from 'src/api/context/ServiceContext'

const NewBrand = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { brandService } = useServices();

  const createBrand = () => {
    setLoading(true)
    brandService.create(name).then(() => {
      setName('')
    }).catch((errorMessage) => {
      setError(errorMessage)
    }).finally(() => {
      setLoading(false)
    })
    // const timer = 
    // setTimeout(() => dispatch(BrandActions.delayed()), 300);
    // clearTimeout(timer);
  }

  return (
    <div className='new-brand'>
      <div className='title'>Create new brand</div>
      <div className='input-group'>
        <IonInput type='text' placeholder='' value={name} onIonChange={e => { setName(e.detail.value || ''); setError('') }} onKeyUp={e => { if (e.key === 'Enter') createBrand(); }} />

        <IonButton fill='outline' onClick={createBrand} disabled={loading}>
          {loading ? <IonSpinner /> : 'Add'}
        </IonButton>
      </div>
      <IonLabel className='error-label' color='danger'>{error || ' '}</IonLabel>
    </div>
  )
}

export default NewBrand