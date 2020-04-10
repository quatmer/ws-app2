import React, { useState, useRef, useEffect } from 'react'
import { IonInput, IonButton, IonLabel } from '@ionic/react'
import { useDispatch } from 'react-redux'
import { BrandActions } from 'src/redux/brand/action'
import { useTypeSelector } from 'src/redux/helper/selector.helper'
import { v4 as uuidV4 } from 'uuid'
import { AppActions } from 'src/redux/app/action'

const NewBrand = () => {
  const [state, setState] = useState('')
  const { loading, error, messageId } = useTypeSelector(x => x.brandState);
  const dispatch = useDispatch();
  const refId = useRef(uuidV4())
  // const inputRef = useRef<HTMLIonInputElement | null>(null);

  const addBrand = () => {
    // console.log('add Brand => refId', refId.current)
    dispatch(BrandActions.create(refId.current, state))
    // const timer = 
    // setTimeout(() => dispatch(BrandActions.delayed()), 300);
    // clearTimeout(timer);
  }

  useEffect(() => {
    // console.log('useEffect => refId', refId.current)
    // console.log('useEffect => messageId', messageId)
    if (messageId !== refId.current)
      return;

    if (loading === false && error === null) {
      dispatch(AppActions.showNotification('Brand', 'New brand successfully created', 'information'))
      setState('');
      // console.log('focus olacak mu', inputRef.current)
      // inputRef.current!.setFocus()
    }
    // eslint-disable-next-line
  }, [messageId])

  // console.log('[NewBrand] init')

  return (
    <div className='new-brand'>
      <div className='title'>Create new brand</div>
      <div className='input-group'>
        <IonInput type='text' placeholder='' value={state} onIonChange={e => setState(e.detail.value || '')} onKeyUp={e => { if (e.key === 'Enter') addBrand(); }} />

        <IonButton fill='outline' onClick={addBrand} disabled={loading || state === ''}>Add</IonButton>
      </div>
      <IonLabel className='error-label' color='danger'>{error || ' '}</IonLabel>
    </div>
  )
}

export default NewBrand
