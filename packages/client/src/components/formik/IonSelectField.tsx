import React, { useCallback, FC } from 'react';
import { useFormikContext, Field } from 'formik';
import { IonSelect } from '@ionic/react';

type Prop = { name: string; multiple?: boolean }

const IonFormikSelect: FC<Prop> = props => {
  const { setFieldTouched, setFieldValue, values } = useFormikContext<any>();

  // use custom handlers to use ionic's events
  const onBlur = useCallback(
    (e: CustomEvent<any>) => {
      const ionSelect = e.currentTarget;
      if (!ionSelect) {
        return;
      }
      setFieldTouched(props.name, true);
    },
    [setFieldTouched, props.name],
  );
  const onChange = useCallback(
    async (e: CustomEvent<any>) => {
      if (!e) return;

      setFieldValue(props.name, e.detail.value);
    },
    [setFieldValue, props.name],
  );

  return (
    <Field name={props.name}>
      {() => <IonSelect
        value={values[props.name]}
        name={props.name}
        onIonBlur={onBlur}
        onIonChange={onChange}
        multiple={!!props.multiple}
      >{props.children}</IonSelect>
      }
    </Field>
  );
};

export default IonFormikSelect;

